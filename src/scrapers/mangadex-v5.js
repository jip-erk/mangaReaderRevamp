"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.mangadexClass = void 0;
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var index_1 = require("./index");
var types_1 = require("./types");
var manga_page_1 = require("../routers/manga-page");
var updateManga_1 = __importDefault(require("../util/updateManga"));
var db_1 = __importDefault(require("../db"));
var mangadexClass = /** @class */ (function (_super) {
    __extends(mangadexClass, _super);
    function mangadexClass() {
        var _this = _super.call(this) || this;
        _this.provider = "Mangadex5";
        _this.searchDisplay = "Mangadex";
        _this.canSearch = true;
        _this.nsfw = false;
        return _this;
    }
    mangadexClass.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resultCount, pageUrl, pageReq, data, ids, searchResultData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultCount = __assign(__assign({}, options), { resultCount: 5 }).resultCount;
                        if (query === "") {
                            // Get popular page
                            pageUrl = "https://api.mangadex.org/manga?limit=".concat(resultCount);
                        }
                        else {
                            pageUrl = "https://api.mangadex.org/manga?title=".concat(encodeURIComponent(query), "&limit=").concat(resultCount);
                        }
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(pageUrl)];
                    case 1:
                        pageReq = _a.sent();
                        return [4 /*yield*/, pageReq.json()];
                    case 2:
                        data = _a.sent();
                        ids = data.data
                            .map(function (result) {
                            return result.id;
                        })
                            .slice(0, resultCount);
                        return [4 /*yield*/, Promise.all(ids.map(function (id) { return (0, updateManga_1["default"])("mangadex5", id); }))];
                    case 3:
                        searchResultData = _a.sent();
                        return [2 /*return*/, searchResultData];
                }
            });
        });
    };
    /**
     * The scrape function
     */
    mangadexClass.prototype.scrape = function (slug, chapterId) {
        return __awaiter(this, void 0, void 0, function () {
            var maxTimeout, scraping, raceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxTimeout = new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve((0, index_1.error)(0, "This request took too long"));
                            }, 25e3);
                        });
                        scraping = this.doScrape(slug, chapterId);
                        return [4 /*yield*/, Promise.race([maxTimeout, scraping])];
                    case 1:
                        raceResult = _a.sent();
                        // Check if it's the timeout instead of the scraped result
                        if (raceResult.success === false &&
                            raceResult.err === "This request took too long") {
                            console.error(chalk_1["default"].red("[Mangadex]") +
                                " A request for '".concat(slug, "' at '").concat(chapterId, "' took too long and has timed out"));
                        }
                        // Return result
                        return [2 /*return*/, raceResult];
                }
            });
        });
    };
    mangadexClass.prototype.doScrape = function (slug, chapterId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var originalData, data, title, posterUrl, posterData, genres, alternateTitles, status, offset, total, allChapters, chapterData, mdChapters, largestVolume_1, _i, allChapters_1, chapter, allReadMdChapters_1, chaptersWithDupes, chapterCombineds_1, chapters, chapterImages, chapter, atHome_1, baseUrl_1, descriptionParagraphs, nsfw, providerId, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, (0, index_1.getDataFromURL)("https://api.mangadex.org/manga/".concat(slug, "?includes[]=cover_art"))];
                    case 1:
                        originalData = _b.sent();
                        data = originalData.data;
                        title = data.attributes.title.en || Object.values(data.attributes.title)[0];
                        posterUrl = "https://i.imgur.com/6TrIues.jpg";
                        posterData = originalData.data.relationships.find(function (relation) { return relation.type === "cover_art"; });
                        if (posterData) {
                            if (posterData.attributes) {
                                posterUrl = "/proxy-image/?url=https://uploads.mangadex.org/covers/".concat(slug, "/").concat(posterData.attributes.fileName, ".512.jpg");
                            }
                            else if (posterData.id) {
                                posterUrl = "/mangadex-cover/".concat(slug, "/").concat(posterData.id);
                            }
                        }
                        genres = data.attributes.tags.map(function (tag) { return tag.attributes.name.en; });
                        alternateTitles = data.attributes.altTitles.map(function (t) { return t.en; });
                        status = data.attributes.status.toLowerCase();
                        offset = 0;
                        total = Infinity;
                        allChapters = [];
                        _b.label = 2;
                    case 2:
                        if (!(offset < total)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, index_1.getDataFromURL)("https://api.mangadex.org/manga/".concat(slug, "/feed?offset=").concat(offset, "&limit=500&translatedLanguage[]=en"))];
                    case 3:
                        chapterData = _b.sent();
                        mdChapters = ((_a = chapterData.data) !== null && _a !== void 0 ? _a : []).filter(Boolean);
                        total = chapterData.total;
                        offset = chapterData.offset + chapterData.limit;
                        allChapters = __spreadArray(__spreadArray([], allChapters, true), mdChapters, true);
                        return [3 /*break*/, 2];
                    case 4:
                        largestVolume_1 = 0;
                        for (_i = 0, allChapters_1 = allChapters; _i < allChapters_1.length; _i++) {
                            chapter = allChapters_1[_i];
                            if (Number(chapter.attributes.volume) > largestVolume_1)
                                largestVolume_1 = Number(chapter.attributes.volume);
                        }
                        allReadMdChapters_1 = Object.keys(db_1["default"].get("reading_new.mangadex5.".concat(slug)) || {});
                        chaptersWithDupes = allChapters
                            .map(function (ch, i) {
                            var _a;
                            var a = ch.attributes;
                            var label = a.volume || a.chapter
                                ? "".concat(a.volume ? "Vol ".concat(a.volume, ", ") : "", "chapter ").concat((_a = a.chapter) !== null && _a !== void 0 ? _a : "unknown")
                                : a.title;
                            return {
                                label: label.slice(0, 1).toUpperCase() + label.slice(1),
                                chapter: a.chapter,
                                season: a.volume || 0,
                                date: a.publishAt,
                                hrefString: ch.id,
                                combined: isNaN(Number(a.chapter))
                                    ? i
                                    : Number(a.volume || largestVolume_1) * 1000 +
                                        Number(a.chapter || "")
                            };
                        })
                            .sort(function (a, b) {
                            return allReadMdChapters_1.indexOf(b.hrefString) -
                                allReadMdChapters_1.indexOf(a.hrefString);
                        });
                        chapterCombineds_1 = [];
                        chapters = chaptersWithDupes
                            .filter(function (chapter) {
                            if (!chapterCombineds_1.includes(chapter.combined)) {
                                chapterCombineds_1.push(chapter.combined);
                                return true;
                            }
                            return false;
                        })
                            .sort(function (a, b) { return a.combined - b.combined; });
                        chapterImages = [];
                        if (!(chapterId != "-1")) return [3 /*break*/, 7];
                        chapter = allChapters.find(function (c) { return c.id === chapterId; });
                        if (!chapter) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, index_1.getDataFromURL)("https://api.mangadex.org/at-home/server/".concat(chapter.id))];
                    case 5:
                        atHome_1 = _b.sent();
                        baseUrl_1 = atHome_1.baseUrl;
                        chapterImages = atHome_1.chapter.data.map(function (fileName) { return "".concat(baseUrl_1, "/data/").concat(atHome_1.chapter.hash, "/").concat(fileName); });
                        return [3 /*break*/, 7];
                    case 6:
                        console.error(chalk_1["default"].red("[Mangadex]") +
                            " A MangaDex chapter was requested but chapter was not found");
                        _b.label = 7;
                    case 7:
                        descriptionParagraphs = data.attributes.description.en
                            .split("[")[0]
                            .replace(/\r/g, "")
                            .split("\n")
                            .filter(Boolean);
                        nsfw = false;
                        providerId = (0, manga_page_1.getProviderId)(this.provider);
                        return [2 /*return*/, {
                                constant: {
                                    title: title,
                                    slug: slug,
                                    posterUrl: posterUrl,
                                    alternateTitles: alternateTitles,
                                    descriptionParagraphs: descriptionParagraphs,
                                    genres: genres,
                                    nsfw: nsfw
                                },
                                data: {
                                    chapters: chapters,
                                    chapterImages: chapterImages,
                                    status: status
                                },
                                success: true,
                                provider: (0, manga_page_1.isProviderId)(providerId) ? providerId : null
                            }];
                    case 8:
                        err_1 = _b.sent();
                        // OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!
                        console.error(err_1.stack);
                        console.error(chalk_1["default"].red("[Mangadex]") + " Failed to fetch: ".concat(slug, ", ").concat(chapterId));
                        return [2 /*return*/, (0, index_1.error)(-1, err_1)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return mangadexClass;
}(types_1.Scraper));
exports.mangadexClass = mangadexClass;
// Generate mangadex object and export it
var mangadex5 = new mangadexClass();
exports["default"] = mangadex5;
