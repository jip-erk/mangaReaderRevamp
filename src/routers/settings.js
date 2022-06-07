"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.months = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../db"));
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var getReading_1 = __importDefault(require("../util/getReading"));
var getIconSrc_1 = __importStar(require("../util/getIconSrc"));
var path_1 = __importDefault(require("path"));
var lists_1 = require("./lists");
var homePath = path_1["default"].join(os_1["default"].homedir(), ".adolla");
var backupsPath = path_1["default"].join(homePath, "backups", "");
var router = express_1["default"].Router();
var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
exports.months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
router.get("/settings/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reading, currentIcon, icons, backupFiles, backups;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, getReading_1["default"])()];
            case 1:
                reading = _a.sent();
                currentIcon = (0, getIconSrc_1["default"])();
                icons = fs_1["default"]
                    .readdirSync("./public/icons/")
                    .filter(function (n) { return !n.includes("DS_Store"); })
                    .map(function (fileName) {
                    var src = "/icons/".concat(fileName);
                    return {
                        file: fileName,
                        src: src,
                        name: getIconName(fileName),
                        isSelected: src === currentIcon
                    };
                });
                backupFiles = fs_1["default"].readdirSync(backupsPath);
                backups = backupFiles
                    .map(function (fileName) {
                    var _a;
                    // Make label
                    var d = new Date(Number(fileName.slice(0, -5)));
                    var day = days[d.getDay()];
                    var month = d.getDate().toString().padStart(2, "0");
                    var monthName = exports.months[d.getMonth()];
                    var year = d.getFullYear();
                    var hours = d.getHours().toString().padStart(2, "0");
                    var minutes = d.getMinutes().toString().padStart(2, "0");
                    var time = "".concat(hours, ":").concat(minutes);
                    var label = "".concat(day, ", ").concat(month, " ").concat(monthName, " ").concat(year, ", ").concat(time);
                    // Get list count
                    var backup = JSON.parse(fs_1["default"].readFileSync(path_1["default"].join(backupsPath, fileName), "utf-8"));
                    var listCount = (backup.lists || []).length;
                    var listEntryCount = (backup.lists || []).reduce(function (acc, list) {
                        return acc + list.entries.length;
                    }, 0);
                    // Get "reading" count
                    var allReading = Object.values(backup.reading)
                        .map(function (v) { return Object.values(v); })
                        .flat();
                    var readingCount = allReading.length;
                    var totalChapterCount = 0;
                    for (var _i = 0, allReading_1 = allReading; _i < allReading_1.length; _i++) {
                        var series = allReading_1[_i];
                        for (var key in series) {
                            if (key === "last")
                                continue;
                            totalChapterCount += ((_a = series[key]) === null || _a === void 0 ? void 0 : _a.percentage) / 100 || 0;
                        }
                    }
                    totalChapterCount = Math.round(totalChapterCount);
                    // Return full object
                    return {
                        fileName: fileName,
                        label: label,
                        date: d,
                        listCount: listCount,
                        listEntryCount: listEntryCount,
                        readingCount: readingCount,
                        totalChapterCount: totalChapterCount,
                        size: JSON.stringify(backup).length
                    };
                })
                    .sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
                res.render("settings", {
                    isSettings: true,
                    icons: icons,
                    reading: reading,
                    backups: backups,
                    showNsfw: db_1["default"].get("settings.show-nsfw") === "yes",
                    storeNsfw: db_1["default"].get("settings.store-nsfw") === "yes",
                    showCompleted: db_1["default"].get("settings.show-completed") !== "no",
                    showUnreads: db_1["default"].get("settings.show-unread-chapter-count") === "yes"
                });
                return [2 /*return*/];
        }
    });
}); });
router.get("/settings/restore-backup/:filename", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, backup, reading, lists, hide_read, r, _i, _a, provider, _b, _c, slug, hide, _d, _e, provider, _f, _g, slug;
    var _h, _j;
    return __generator(this, function (_k) {
        try {
            filename = req.params.filename;
            backup = JSON.parse(fs_1["default"].readFileSync(path_1["default"].join(backupsPath, filename), "utf-8"));
            reading = (_h = backup.reading) !== null && _h !== void 0 ? _h : {};
            lists = (_j = backup.lists) !== null && _j !== void 0 ? _j : [];
            hide_read = backup.hide_read || {};
            r = db_1["default"].get("reading_new") || {};
            if (reading.mangasee) {
                for (_i = 0, _a = Object.keys(reading); _i < _a.length; _i++) {
                    provider = _a[_i];
                    if (!r[provider])
                        r[provider] = {};
                    for (_b = 0, _c = Object.keys(reading[provider]); _b < _c.length; _b++) {
                        slug = _c[_b];
                        r[provider][slug] = __assign(__assign({}, r[provider][slug]), reading[provider][slug]);
                    }
                }
            }
            else {
                r.mangasee = __assign(__assign({}, (r.mangasee || {})), reading);
            }
            db_1["default"].set("reading_new", r);
            hide = db_1["default"].get("hide_read") || {};
            for (_d = 0, _e = Object.keys(hide_read); _d < _e.length; _d++) {
                provider = _e[_d];
                if (!hide[provider])
                    hide[provider] = {};
                for (_f = 0, _g = Object.keys(hide_read[provider]); _f < _g.length; _f++) {
                    slug = _g[_f];
                    hide[provider][slug] = hide_read[provider][slug];
                }
            }
            db_1["default"].set("hide_read", hide);
            // Set lists
            db_1["default"].set("lists", lists.map(lists_1.removeData));
            res.json({
                status: 200
            });
        }
        catch (err) {
            res.json({
                status: 500,
                err: err
            });
        }
        return [2 /*return*/];
    });
}); });
router.post("/settings/set-icon/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newName;
    return __generator(this, function (_a) {
        newName = req.body.name;
        if (getIconSrc_1.iconNamesReversed[newName]) {
            db_1["default"].set("settings.icon", newName);
            res.json({
                status: 200
            });
        }
        else {
            res.status(404);
            res.json({
                status: 404,
                error: "No icon with that name was found"
            });
        }
        return [2 /*return*/];
    });
}); });
router.post("/settings/set-app-settings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, key;
    var _b;
    return __generator(this, function (_c) {
        // Set all settings
        for (_i = 0, _a = Object.keys(req.body); _i < _a.length; _i++) {
            key = _a[_i];
            db_1["default"].set("settings.".concat(key), (_b = req.body[key]) !== null && _b !== void 0 ? _b : false);
        }
        res.json({
            status: 200
        });
        return [2 /*return*/];
    });
}); });
// Intercept manifest.json
router.get("/manifest.json", function (req, res) {
    var icons = fs_1["default"]
        .readdirSync("public/icons")
        .filter(function (name) { return !name.includes("DS_Store"); })
        .map(function (fileName) {
        return {
            size: "200x200",
            src: "/icons/".concat(fileName)
        };
    });
    res.json({
        name: "".concat(process.env.dev ? "DEV " : "", "Adolla"),
        short_name: "".concat(process.env.dev ? "DEV " : "", "Adolla"),
        lang: "EN",
        start_url: "/",
        display: "standalone",
        theme_color: "#4babce",
        background_color: "#ffffff",
        icons: __spreadArray([
            {
                sizes: "200x200",
                src: "/icon.png"
            }
        ], icons, true)
    });
});
function getIconName(fileName) {
    var _a;
    // Get array with each "section" of file name
    var str = fileName.split(/-|\./).slice(0, -1).join("-");
    return (_a = getIconSrc_1.iconNames[str]) !== null && _a !== void 0 ? _a : "Unknown";
}
exports["default"] = router;
