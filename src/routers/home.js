"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var getMangaProgress_1 = __importStar(require("../util/getMangaProgress"));
var getReading_1 = __importDefault(require("../util/getReading"));
var db_1 = __importDefault(require("../db"));
var lists_1 = require("../util/lists");
var doSearch_1 = require("../util/doSearch");
var secretConfig_1 = __importDefault(require("../util/secretConfig"));
var getAnnouncements_1 = require("../util/getAnnouncements");
var migrateMangadex_1 = require("../util/migrateMangadex");
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _a, popular, reading, lists, announcements;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "http://".concat(req.headers.host, "/");
                db_1["default"].set("other.host", url);
                // Ensure MangaDex migration and do so if not done yet
                return [4 /*yield*/, (0, migrateMangadex_1.doMangadexMigration)()];
            case 1:
                // Ensure MangaDex migration and do so if not done yet
                _b.sent();
                return [4 /*yield*/, getData()];
            case 2:
                _a = _b.sent(), popular = _a.popular, reading = _a.reading, lists = _a.lists;
                return [4 /*yield*/, (0, getAnnouncements_1.getAnnouncements)()];
            case 3:
                announcements = _b.sent();
                res.render("home", {
                    popular: popular,
                    reading: reading,
                    lists: lists,
                    announcements: announcements,
                    isHome: true
                });
                return [2 /*return*/];
        }
    });
}); });
router.post("/dismiss-announcement", function (req, res) {
    var dismissedAnnouncements = db_1["default"].get("other.announcements-dismissed") || [];
    var id = req.body.id;
    if (!dismissedAnnouncements.includes(id))
        dismissedAnnouncements.push(id);
    db_1["default"].set("other.announcements-dismissed", dismissedAnnouncements);
    res.json({
        status: 200
    });
});
router.get("/json", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res.header("Access-Control-Allow-Origin", "*");
                return [4 /*yield*/, getData()];
            case 1:
                data = _a.sent();
                res.json({ data: data });
                return [2 /*return*/];
        }
    });
}); });
function getData() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var lists, reading, maxReading, popular;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, lists_1.getLists)(true)];
                case 1:
                    lists = _c.sent();
                    return [4 /*yield*/, (0, getReading_1["default"])()];
                case 2:
                    reading = _c.sent();
                    if (!(db_1["default"].get("settings.show-completed") === "no")) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.all(reading.map(function (series) { return __awaiter(_this, void 0, void 0, function () {
                            var lastChapter_1, l;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!series.success) return [3 /*break*/, 2];
                                        series.isInProgress = true;
                                        return [4 /*yield*/, (0, getMangaProgress_1["default"])(series.provider, series.constant.slug)];
                                    case 1:
                                        lastChapter_1 = _a.sent();
                                        l = series.data.chapters.find(function (c) {
                                            var _a, _b;
                                            return ((_a = c === null || c === void 0 ? void 0 : c.progress) === null || _a === void 0 ? void 0 : _a.chapterId) === lastChapter_1.chapterId &&
                                                ((_b = c.progress) === null || _b === void 0 ? void 0 : _b.percentage) > 90;
                                        });
                                        if (l && !series.data.chapters[series.data.chapters.indexOf(l) + 1])
                                            series.isInProgress = false;
                                        _a.label = 2;
                                    case 2: return [2 /*return*/, series];
                                }
                            });
                        }); }))];
                case 3:
                    reading = (_c.sent()).filter(function (v) {
                        return v.success && v.isInProgress;
                    });
                    _c.label = 4;
                case 4:
                    maxReading = Number((_b = (_a = process.env.MAXREADINGTOSHOWPOPULAR) !== null && _a !== void 0 ? _a : secretConfig_1["default"].max_reading_to_show_popular) !== null && _b !== void 0 ? _b : 10);
                    popular = [];
                    if (!(reading.length < maxReading)) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, doSearch_1.doSearch)("mangasee", "", {
                            resultCount: 20
                        })];
                case 5:
                    popular = _c.sent(); // Empty search sorts by popular
                    _c.label = 6;
                case 6:
                    if (!Array.isArray(popular)) return [3 /*break*/, 8];
                    return [4 /*yield*/, Promise.all(popular.map(getMangaProgress_1.setMangaProgress))];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/, { lists: lists, reading: reading, popular: popular }];
            }
        });
    });
}
exports["default"] = router;
