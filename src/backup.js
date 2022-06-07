"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var db_1 = __importDefault(require("./db"));
var homePath = "./data/";
var backupsPath = path_1["default"].join(homePath, "backups", "");
var Backup = /** @class */ (function () {
    function Backup() {
    }
    Backup.prototype.start = function () {
        this.checkTime();
    };
    Backup.prototype.createBackup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reading, hide_read, lists, now, backupJson;
            return __generator(this, function (_a) {
                console.info(chalk_1["default"].yellowBright("[BACKUP]") +
                    " Making backup at ".concat(new Date().toLocaleString("it")));
                reading = db_1["default"].get("reading_new");
                hide_read = db_1["default"].get("hide_read");
                lists = db_1["default"].get("lists");
                now = Date.now();
                // Remove stuff
                lists.forEach(function (l) {
                    for (var _i = 0, _a = l.entries; _i < _a.length; _i++) {
                        var entry = _a[_i];
                        delete entry.data;
                    }
                });
                backupJson = {
                    backupAt: now,
                    reading: reading,
                    lists: lists,
                    hide_read: hide_read
                };
                if (!fs_1["default"].existsSync(backupsPath))
                    fs_1["default"].mkdirSync(backupsPath);
                fs_1["default"].writeFileSync(path_1["default"].join(backupsPath, "".concat(now, ".json")), JSON.stringify(backupJson));
                console.info(chalk_1["default"].green("[BACKUP]") +
                    " Saved backup at ".concat(new Date().toLocaleString("it")));
                return [2 /*return*/];
            });
        });
    };
    Backup.prototype.checkTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var offset, lastBackupTime, backupTime, difference, timeoutValue, allFiles, _i, allFiles_1, filename, d, diff;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        offset = 1e3 * 60 * 60 * 12;
                        return [4 /*yield*/, this.getLastBackupTime()];
                    case 1:
                        lastBackupTime = _a.sent();
                        backupTime = lastBackupTime !== null && lastBackupTime !== void 0 ? lastBackupTime : Date.now();
                        difference = Date.now() - backupTime;
                        console.info(chalk_1["default"].yellowBright("[BACKUP]") +
                            " Running backup check: diff ".concat(difference, ", last ").concat(lastBackupTime, ", choosing last ").concat(backupTime));
                        if (difference > offset) {
                            this.createBackup();
                            setTimeout(function () {
                                _this.checkTime();
                            }, offset);
                        }
                        else {
                            timeoutValue = offset - difference;
                            setTimeout(function () {
                                _this.checkTime();
                            }, timeoutValue);
                        }
                        allFiles = fs_1["default"]
                            .readdirSync(backupsPath)
                            .map(function (fileName) { return Number(fileName.slice(0, -5)); });
                        for (_i = 0, allFiles_1 = allFiles; _i < allFiles_1.length; _i++) {
                            filename = allFiles_1[_i];
                            d = new Date(filename);
                            diff = Date.now() - d.getTime();
                            // If more than 10 days ago...
                            if (diff > 1e3 * 60 * 60 * 24 * 10) {
                                // We also don't want to remove any backups from sundays.
                                // That way we have some older backups
                                if (!(d.getHours() < 12 && d.getDay() === 0)) {
                                    console.info(chalk_1["default"].red("[BACKUP]") +
                                        " Removing old backup from ".concat(d.toLocaleString("en-us", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })));
                                    fs_1["default"].unlinkSync(path_1["default"].join(homePath, "backups", "".concat(filename, ".json")));
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Backup.prototype.getLastBackupTime = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var files, last;
            return __generator(this, function (_b) {
                if (!fs_1["default"].existsSync(backupsPath))
                    fs_1["default"].mkdirSync(backupsPath);
                files = fs_1["default"]
                    .readdirSync(backupsPath)
                    .map(function (fileName) { return Number(fileName.slice(0, -5)); });
                last = (_a = files.sort(function (a, b) { return b - a; })[0]) !== null && _a !== void 0 ? _a : 0;
                return [2 /*return*/, last];
            });
        });
    };
    return Backup;
}());
var backup = new Backup();
exports["default"] = backup;
