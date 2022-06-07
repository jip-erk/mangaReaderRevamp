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
exports.guyaClass = void 0;
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var fuse_js_1 = __importDefault(require("fuse.js"));
var index_1 = require("./index");
var types_1 = require("./types");
var manga_page_1 = require("../routers/manga-page");
var updateManga_1 = __importDefault(require("../util/updateManga"));
var guyaClass = /** @class */ (function (_super) {
    __extends(guyaClass, _super);
    function guyaClass() {
        var _this = _super.call(this) || this;
        _this.provider = "Guya";
        _this.canSearch = true;
        _this.nsfw = false;
        return _this;
    }
    guyaClass.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var pageUrl, pageReq, pageJson, ids, fuse, searchResultData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageUrl = "https://guya.moe/api/get_all_series/";
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(pageUrl)];
                    case 1:
                        pageReq = _a.sent();
                        return [4 /*yield*/, pageReq.json()];
                    case 2:
                        pageJson = _a.sent();
                        ids = [];
                        if (query.length) {
                            fuse = new fuse_js_1["default"](Object.keys(pageJson), {
                                threshold: 0.3,
                                distance: 200
                            });
                            ids = fuse
                                .search(query)
                                .map(function (_a) {
                                var item = _a.item;
                                return pageJson[item].slug;
                            });
                        }
                        else {
                            // Get IDs from nodes
                            ids = Object.values(pageJson).map(function (_a) {
                                var slug = _a.slug;
                                return slug;
                            });
                        }
                        return [4 /*yield*/, Promise.all(ids.map(function (id) { return (0, updateManga_1["default"])("guya", id); }))];
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
    guyaClass.prototype.scrape = function (slug, chapterId) {
        if (chapterId === void 0) { chapterId = null; }
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
                            console.error(chalk_1["default"].red("[GUYA]") +
                                " A request for '".concat(slug, "' at '").concat(chapterId, "' took too long and has timed out"));
                        }
                        // Return result
                        return [2 /*return*/, raceResult];
                }
            });
        });
    };
    guyaClass.prototype.doScrape = function (slug, chapterId) {
        var _a, _b;
        if (chapterId === void 0) { chapterId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var pageReq, pageJson, title, description, isOngoing, posterUrl, genres, alternateTitles, chapterData, seriesPreferredSort, chapterImages, _c, groups, folder_1, chapterPreferredSort, preferredSort_1, bestGroup_1, pages, chapters, providerId, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://guya.moe/api/series/".concat(slug, "/"))];
                    case 1:
                        pageReq = _d.sent();
                        return [4 /*yield*/, pageReq.json()];
                    case 2:
                        pageJson = _d.sent();
                        title = pageJson.title;
                        description = (_a = pageJson.description) !== null && _a !== void 0 ? _a : '';
                        isOngoing = pageJson.next_release_page;
                        posterUrl = "https://guya.moe".concat(pageJson.cover);
                        genres = [];
                        alternateTitles = [];
                        chapterData = pageJson.chapters, seriesPreferredSort = pageJson.preferred_sort;
                        chapterImages = [];
                        if (chapterId && typeof chapterId === "string") {
                            _c = chapterData[chapterId], groups = _c.groups, folder_1 = _c.folder, chapterPreferredSort = _c.preferred_sort;
                            preferredSort_1 = chapterPreferredSort !== null && chapterPreferredSort !== void 0 ? chapterPreferredSort : seriesPreferredSort;
                            bestGroup_1 = (_b = Object.keys(groups).sort(function (a, b) { return preferredSort_1.indexOf(a) - preferredSort_1.indexOf(b); })[0]) !== null && _b !== void 0 ? _b : Object.keys(groups)[0];
                            pages = groups[bestGroup_1];
                            chapterImages = pages.map(function (page) { return "https://guya.moe/media/manga/".concat(slug, "/chapters/").concat(folder_1, "/").concat(bestGroup_1, "/").concat(page); });
                        }
                        chapters = Object.entries(chapterData)
                            .map(function (_a) {
                            var chapter = _a[0], data = _a[1];
                            var volume = data.volume, releaseDates = data.release_date;
                            var releaseDate = Object.values(releaseDates).sort(function (a, b) { return a - b; })[0];
                            var season = Number(volume);
                            var chapterId = Number(chapter);
                            return {
                                chapter: chapterId,
                                season: season,
                                label: "Chapter ".concat(chapter),
                                date: new Date(releaseDate * 1000),
                                hrefString: chapter,
                                combined: season * 1e5 + chapterId
                            };
                        })
                            .sort(function (a, b) { return a.combined - b.combined; });
                        providerId = (0, manga_page_1.getProviderId)(this.provider);
                        return [2 /*return*/, {
                                constant: {
                                    title: title,
                                    slug: slug,
                                    posterUrl: posterUrl,
                                    alternateTitles: alternateTitles,
                                    descriptionParagraphs: [description],
                                    genres: genres,
                                    nsfw: false
                                },
                                data: {
                                    chapters: chapters,
                                    chapterImages: chapterImages,
                                    status: isOngoing ? "ongoing" : "ended"
                                },
                                success: true,
                                provider: (0, manga_page_1.isProviderId)(providerId) ? providerId : null
                            }];
                    case 3:
                        e_1 = _d.sent();
                        return [2 /*return*/, {
                                success: false,
                                status: 0,
                                err: e_1
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return guyaClass;
}(types_1.Scraper));
exports.guyaClass = guyaClass;
// Generate guya object and export it
var guya = new guyaClass();
exports["default"] = guya;
