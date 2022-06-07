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
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var config_json_1 = __importDefault(require("../config.json"));
var updateManga_1 = __importDefault(require("./updateManga"));
var scrapers = __importStar(require("../scrapers"));
var db_1 = __importDefault(require("../db"));
var getReading_1 = __importDefault(require("./getReading"));
var bot_1 = __importDefault(require("./bot"));
var cache_1 = __importDefault(require("../util/cache"));
var secretConfig_1 = __importDefault(require("../util/secretConfig"));
var manga_page_1 = require("../routers/manga-page");
var getAnnouncements_1 = require("./getAnnouncements");
var clean = function (str) {
    return str.toString().replace(/\./g, "_");
};
var Updater = /** @class */ (function () {
    function Updater() {
    }
    Updater.prototype.start = function () {
        var _this = this;
        this.updateCache();
        setInterval(function () {
            _this.updateCache();
        }, config_json_1["default"].cache.duration);
    };
    Updater.prototype.updateCache = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var popular, reading, _i, _d, provider, _e, _f, slug, diff;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        /**
                         * UPDATE "POPULAR" CACHE
                         */
                        console.info(chalk_1["default"].yellowBright("[CACHE]") +
                            " Updating popular cache at ".concat(new Date().toLocaleString()));
                        return [4 /*yield*/, scrapers.Mangasee.search("")];
                    case 1:
                        popular = _g.sent();
                        return [4 /*yield*/, Promise.all(popular
                                .map(function (obj) { return (obj.success ? obj : null); })
                                .filter(Boolean)
                                .map(function (obj) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: 
                                        // Update manga and store new value in cache
                                        return [4 /*yield*/, (0, updateManga_1["default"])((_a = obj.provider) !== null && _a !== void 0 ? _a : "mangasee", obj.constant.slug, true)];
                                        case 1:
                                            // Update manga and store new value in cache
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _g.sent();
                        console.info(chalk_1["default"].green("[CACHE]") + " Updated cache for popular manga");
                        return [4 /*yield*/, (0, getReading_1["default"])()];
                    case 3:
                        reading = _g.sent();
                        return [4 /*yield*/, Promise.all(reading
                                .map(function (obj) { return (obj.success ? obj : null); })
                                .filter(Boolean)
                                .map(function (obj) { return __awaiter(_this, void 0, void 0, function () {
                                var data, chapters, dbString, readingLast, readingDbString, reading_1, _i, chapters_1, currentChapter, nextChapter, chapterReleaseDate, dbString_1, hasNotified, host, msg, url, urlMsg, msgFull, doSet, bot, webhookNotif;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, (0, updateManga_1["default"])(obj.provider, obj.constant.slug, true)];
                                        case 1:
                                            data = _c.sent();
                                            if (!data.success) return [3 /*break*/, 7];
                                            chapters = data.data.chapters;
                                            // Add "combined" value for sorting
                                            chapters.forEach(function (ch) {
                                                if (!ch.combined)
                                                    ch.combined = ch.season * 1e3 + ch.chapter;
                                            });
                                            // Sort chapters on location
                                            chapters = chapters.sort(function (a, b) { return a.combined - b.combined; });
                                            dbString = "reading_new.".concat((0, manga_page_1.getProviderId)(data.provider), ".").concat(data.constant.slug, ".last");
                                            readingLast = db_1["default"].get(dbString);
                                            if (!readingLast)
                                                return [2 /*return*/, null];
                                            readingDbString = "reading_new.".concat((0, manga_page_1.getProviderId)(data.provider), ".").concat(data.constant.slug);
                                            reading_1 = db_1["default"].get(readingDbString);
                                            _i = 0, chapters_1 = chapters;
                                            _c.label = 2;
                                        case 2:
                                            if (!(_i < chapters_1.length)) return [3 /*break*/, 7];
                                            currentChapter = chapters_1[_i];
                                            nextChapter = chapters[chapters.indexOf(currentChapter) + 1];
                                            if (!(nextChapter && reading_1[currentChapter.hrefString])) return [3 /*break*/, 6];
                                            chapterReleaseDate = new Date(nextChapter.date).getTime();
                                            if (!(chapterReleaseDate >
                                                reading_1[clean(currentChapter.hrefString)].at &&
                                                !reading_1[clean(nextChapter.hrefString)])) return [3 /*break*/, 6];
                                            dbString_1 = "notified.".concat(data.constant.slug, ".").concat(clean(nextChapter.season), "-").concat(clean(nextChapter.chapter));
                                            hasNotified = db_1["default"].get(dbString_1);
                                            if (!hasNotified) return [3 /*break*/, 3];
                                            return [3 /*break*/, 6];
                                        case 3:
                                            host = db_1["default"].get("other.host");
                                            msg = "New chapter for **".concat(data.constant.title, "**!");
                                            url = "".concat(host.replace("localhost", "127.0.0.1")).concat(data.provider, "/").concat(data.constant.slug, "/").concat(nextChapter.season, "-").concat(nextChapter.chapter);
                                            urlMsg = host ? "Check it out at ".concat(url, "/") : "";
                                            msgFull = "".concat(msg, "\n").concat(urlMsg);
                                            doSet = false;
                                            bot = bot_1["default"].get();
                                            if (bot) {
                                                /* Send notification, and do some stuff to make sure it doesn't send it every 30 minutes
                                                console.info(
                                                    chalk.green("[NOTIFS]") +
                                                        ` New chapter found for ${data.constant.title}, notifying user with Telegram bot`
                                                );
                                                */
                                                bot_1["default"].send(msgFull);
                                                doSet = true;
                                            }
                                            else {
                                                // Send notification, and do some stuff to make sure it doesn't send it every 30 minutes
                                                /*
                                                console.info(
                                                    chalk.red("[NOTIFS]") +
                                                        ` New chapter found for ${data.constant.title} but Telegram Bot is not configured`
                                                );
                                                */
                                            }
                                            if (!((_a = process.env.DISCORDWEBHOOK) !== null && _a !== void 0 ? _a : secretConfig_1["default"].discord_webhook)) return [3 /*break*/, 5];
                                            return [4 /*yield*/, (0, node_fetch_extra_1["default"])((_b = process.env.DISCORDWEBHOOK) !== null && _b !== void 0 ? _b : secretConfig_1["default"].discord_webhook, {
                                                    method: "POST",
                                                    headers: {
                                                        "content-type": "application/json"
                                                    },
                                                    body: JSON.stringify({
                                                        avatar_url: "https://raw.githubusercontent.com/AdollaApp/Adolla/master/public/icons/white-on-blue.png",
                                                        username: "Adolla",
                                                        embeds: [
                                                            {
                                                                title: "".concat(msg, " (").concat(nextChapter.label, ")"),
                                                                description: "Click title to open the chapter",
                                                                url: url,
                                                                color: 4959182,
                                                                author: {
                                                                    name: "Adolla",
                                                                    url: "https://jipfr.nl/adolla",
                                                                    icon_url: "https://raw.githubusercontent.com/AdollaApp/Adolla/master/public/icons/white-on-blue.png"
                                                                }
                                                            },
                                                        ]
                                                    })
                                                })];
                                        case 4:
                                            webhookNotif = _c.sent();
                                            doSet = true;
                                            return [3 /*break*/, 5];
                                        case 5:
                                            if (doSet)
                                                db_1["default"].set(dbString_1, true);
                                            _c.label = 6;
                                        case 6:
                                            _i++;
                                            return [3 /*break*/, 2];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 4:
                        _g.sent();
                        /**
                         * Remove old items from cache
                         */
                        // Get data
                        /*
                                console.info(
                                    chalk.yellowBright("[CLEANUP]") +
                                        " Checking each cache entry for old data"
                                );
                        */
                        // Check each entry and
                        for (_i = 0, _d = Object.keys(cache_1["default"]); _i < _d.length; _i++) {
                            provider = _d[_i];
                            for (_e = 0, _f = Object.keys(cache_1["default"][provider]); _e < _f.length; _e++) {
                                slug = _f[_e];
                                diff = Date.now() - ((_c = (_b = (_a = cache_1["default"][provider]) === null || _a === void 0 ? void 0 : _a[slug]) === null || _b === void 0 ? void 0 : _b.savedAt) !== null && _c !== void 0 ? _c : 9e9);
                                // Check if cache is old. How old should be fairly obvious
                                if (diff > 1e3 * 60 * 60 * 24) {
                                    cache_1["default"][provider][slug] = undefined;
                                    delete cache_1["default"][provider][slug];
                                    console.info(chalk_1["default"].green("[CLEANUP]") +
                                        " Deleting cache for ".concat(slug, " since it's ").concat(Math.floor(diff / (60 * 1e3)), " minutes old"));
                                }
                            }
                        }
                        // Write to db
                        console.info(chalk_1["default"].green("[CLEANUP]") + " Done cleaning up");
                        (0, getAnnouncements_1.getAnnouncements)();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Updater;
}());
var updatePopularCache = new Updater();
exports["default"] = updatePopularCache;
