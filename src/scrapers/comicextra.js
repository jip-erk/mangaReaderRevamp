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
exports.comicextraClass = void 0;
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var jsdom_1 = require("jsdom");
var index_1 = require("./index");
var types_1 = require("./types");
var manga_page_1 = require("../routers/manga-page");
var updateManga_1 = __importDefault(require("../util/updateManga"));
var comicextraClass = /** @class */ (function (_super) {
    __extends(comicextraClass, _super);
    function comicextraClass() {
        var _this = _super.call(this) || this;
        _this.provider = "ComicExtra";
        _this.canSearch = true;
        _this.nsfw = false;
        return _this;
    }
    comicextraClass.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resultCount, pageUrl, pageReq, pageHtml, dom, document, anchors, ids, searchResultData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultCount = 10;
                        if (query === "") {
                            // Get popular page
                            pageUrl = "https://www.comicextra.com/popular-comic";
                            resultCount = 5;
                        }
                        else {
                            pageUrl = "https://www.comicextra.com/comic-search?key=".concat(encodeURIComponent(query));
                        }
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(pageUrl)];
                    case 1:
                        pageReq = _a.sent();
                        return [4 /*yield*/, pageReq.text()];
                    case 2:
                        pageHtml = _a.sent();
                        dom = new jsdom_1.JSDOM(pageHtml);
                        document = dom.window.document;
                        anchors = __spreadArray([], document.querySelectorAll(".cartoon-box"), true).map(function (box) {
                            return box.querySelector("a");
                        });
                        ids = anchors
                            .map(function (anchor) { return ((anchor === null || anchor === void 0 ? void 0 : anchor.href) || "").split("/comic/").pop(); })
                            .filter(Boolean)
                            .slice(0, resultCount);
                        return [4 /*yield*/, Promise.all(ids.map(function (id) { return (0, updateManga_1["default"])("comicextra", id); }))];
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
    comicextraClass.prototype.scrape = function (slug, chapterId) {
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
                            console.error(chalk_1["default"].red("[COMICEXTRA]") +
                                " A request for '".concat(slug, "' at '").concat(chapterId, "' took too long and has timed out"));
                        }
                        // Return result
                        return [2 /*return*/, raceResult];
                }
            });
        });
    };
    comicextraClass.prototype.doScrape = function (slug, chapterId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var pageReq, pageHtml, dom, document, title, posterUrl, genres, alternateTitles, status, nav, chapterLinks, seriesUrlNodes_1, getSeriesNode_1, _i, chapterLinks_1, url, allChapterDocuments, chapterNodes_1, knownChapters_1, chaptersWithDupes, chapters, chapterImages, url, chapterPageReq, chapterPageHtml, dom_1, chapterDocument, images, descriptionParagraphs, providerId, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://www.comicextra.com/comic/".concat(slug))];
                    case 1:
                        pageReq = _b.sent();
                        return [4 /*yield*/, pageReq.text()];
                    case 2:
                        pageHtml = _b.sent();
                        dom = new jsdom_1.JSDOM(pageHtml);
                        document = dom.window.document;
                        title = document.querySelector(".title-1").textContent;
                        posterUrl = document.querySelector(".movie-l-img img").src;
                        if (posterUrl.startsWith("/"))
                            posterUrl = "https://www.comicextra.com" + posterUrl;
                        genres = __spreadArray([], document.querySelectorAll(".movie-dd")[4].querySelectorAll("a"), true).map(function (v) { return v.textContent; });
                        alternateTitles = [];
                        status = (((_a = document.querySelector(".movie-dd.status")) === null || _a === void 0 ? void 0 : _a.textContent) || "").toLowerCase();
                        nav = document.querySelector(".general-nav");
                        chapterLinks = nav
                            ? Array.from(new Set(__spreadArray([], nav.querySelectorAll("a"), true).map(function (a) { return a.href; })))
                            : [];
                        seriesUrlNodes_1 = {};
                        getSeriesNode_1 = function (url) { return __awaiter(_this, void 0, void 0, function () {
                            var pageHtml, dom, document, _i, _a, a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        // Check cache
                                        if (seriesUrlNodes_1[url])
                                            return [2 /*return*/, seriesUrlNodes_1[url]];
                                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(url)];
                                    case 1: return [4 /*yield*/, (_b.sent()).text()];
                                    case 2:
                                        pageHtml = _b.sent();
                                        dom = new jsdom_1.JSDOM(pageHtml);
                                        document = dom.window.document;
                                        // Store in cache
                                        seriesUrlNodes_1[url] = document;
                                        _i = 0, _a = document.querySelectorAll(".general-nav a");
                                        _b.label = 3;
                                    case 3:
                                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                                        a = _a[_i];
                                        return [4 /*yield*/, getSeriesNode_1(a.href)];
                                    case 4:
                                        _b.sent();
                                        _b.label = 5;
                                    case 5:
                                        _i++;
                                        return [3 /*break*/, 3];
                                    case 6: return [2 /*return*/, document];
                                }
                            });
                        }); };
                        _i = 0, chapterLinks_1 = chapterLinks;
                        _b.label = 3;
                    case 3:
                        if (!(_i < chapterLinks_1.length)) return [3 /*break*/, 6];
                        url = chapterLinks_1[_i];
                        return [4 /*yield*/, getSeriesNode_1(url)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, Promise.all(__spreadArray([
                            document
                        ], Object.values(seriesUrlNodes_1), true))];
                    case 7:
                        allChapterDocuments = _b.sent();
                        chapterNodes_1 = __spreadArray([], allChapterDocuments.map(function (d) {
                            return d.querySelectorAll(".episode-list tr");
                        }), true).map(function (nodelist) { return __spreadArray([], nodelist, true); })
                            .flat();
                        knownChapters_1 = [];
                        chaptersWithDupes = chapterNodes_1
                            .reverse() // Their default sorting is large > small — we want the opposite of that
                            .map(function (row, i) {
                            // Find all values
                            var label = row.querySelector("a").textContent;
                            var slug = row.querySelector("a").href.split("/").pop();
                            var date = new Date(row.querySelectorAll("td")[1].textContent);
                            var chapterOptA = Number(slug.split("#").pop());
                            var chapterOptB = Number(slug.split("-").pop());
                            var chapter = 0;
                            if (!isNaN(chapterOptA)) {
                                chapter = chapterOptA;
                            }
                            else if (!isNaN(chapterOptB)) {
                                chapter = chapterOptB;
                            }
                            else {
                                chapter = -chapterNodes_1.length + i;
                            }
                            // Return product of chapter
                            return {
                                label: label,
                                hrefString: slug,
                                season: 1,
                                chapter: chapter,
                                date: date,
                                combined: chapter
                            };
                        })
                            .sort(function (a, b) { return a.combined - b.combined; });
                        chapters = chaptersWithDupes.filter(function (c) {
                            if (knownChapters_1.includes(c.combined)) {
                                return false;
                            }
                            else {
                                knownChapters_1.push(c.combined);
                                return true;
                            }
                        });
                        chapterImages = [];
                        if (!(chapterId != "-1")) return [3 /*break*/, 10];
                        url = "https://www.comicextra.com/".concat(slug, "/").concat(chapterId, "/full");
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(url)];
                    case 8:
                        chapterPageReq = _b.sent();
                        return [4 /*yield*/, chapterPageReq.text()];
                    case 9:
                        chapterPageHtml = _b.sent();
                        dom_1 = new jsdom_1.JSDOM(chapterPageHtml);
                        chapterDocument = dom_1.window.document;
                        images = __spreadArray([], chapterDocument.querySelectorAll(".chapter_img"), true);
                        chapterImages = images.map(function (v) { return v.src; });
                        _b.label = 10;
                    case 10:
                        descriptionParagraphs = document
                            .querySelector("#film-content");
                        providerId = (0, manga_page_1.getProviderId)(this.provider);
                        return [2 /*return*/, {
                                constant: {
                                    title: title,
                                    slug: slug,
                                    posterUrl: posterUrl,
                                    alternateTitles: alternateTitles,
                                    descriptionParagraphs: descriptionParagraphs,
                                    genres: genres,
                                    nsfw: false
                                },
                                data: {
                                    chapters: chapters,
                                    chapterImages: chapterImages,
                                    status: status
                                },
                                success: true,
                                provider: (0, manga_page_1.isProviderId)(providerId) ? providerId : null
                            }];
                    case 11:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [2 /*return*/, {
                                success: false,
                                status: 0,
                                err: e_1
                            }];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return comicextraClass;
}(types_1.Scraper));
exports.comicextraClass = comicextraClass;
// Generate comicextra object and export it
var comicextra = new comicextraClass();
exports["default"] = comicextra;
