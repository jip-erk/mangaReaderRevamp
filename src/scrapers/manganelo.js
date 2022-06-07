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
exports.manganeloClass = void 0;
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var jsdom_1 = require("jsdom");
var index_1 = require("./index");
var types_1 = require("./types");
var manga_page_1 = require("../routers/manga-page");
var updateManga_1 = __importDefault(require("../util/updateManga"));
var manganeloClass = /** @class */ (function (_super) {
    __extends(manganeloClass, _super);
    function manganeloClass() {
        var _this = _super.call(this) || this;
        _this.provider = "Manganelo";
        _this.searchDisplay = "Manganato";
        _this.canSearch = true;
        _this.nsfw = false;
        return _this;
    }
    manganeloClass.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resultCount, pageUrl, pageReq, pageHtml, dom, document, anchors, ids, searchResultData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultCount = __assign({ resultCount: 5 }, options).resultCount;
                        if (query === "") {
                            // Get popular page
                            pageUrl = "https://manganato.com/genre-all?type=topview";
                        }
                        else {
                            pageUrl = "https://manganato.com/search/story/".concat(encodeURIComponent(query
                                .replace(/[^a-zA-Z]/g, " ")
                                .trim()
                                .replace(/ /g, "_")));
                        }
                        console.log(pageUrl);
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(pageUrl)];
                    case 1:
                        pageReq = _a.sent();
                        return [4 /*yield*/, pageReq.text()];
                    case 2:
                        pageHtml = _a.sent();
                        dom = new jsdom_1.JSDOM(pageHtml);
                        document = dom.window.document;
                        anchors = __spreadArray(__spreadArray([], document.querySelectorAll(".genres-item-info .a-h:first-child"), true), document.querySelectorAll(".item-title"), true);
                        ids = anchors
                            .map(function (anchor) { return anchor.href.split("/").pop(); })
                            .slice(0, resultCount);
                        return [4 /*yield*/, Promise.all(ids.map(function (id) { return (0, updateManga_1["default"])("manganelo", id); }))];
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
    manganeloClass.prototype.scrape = function (slug, chapterId) {
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
                            console.error(chalk_1["default"].red("[MANGANELO]") +
                                " A request for '".concat(slug, "' at '").concat(chapterId, "' took too long and has timed out"));
                        }
                        // Return result
                        return [2 /*return*/, raceResult];
                }
            });
        });
    };
    manganeloClass.prototype.doScrape = function (slug, chapterId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var pageReq, pageHtml, dom, document, title, posterUrl, genreWrapper, genreLinks, genres, altTitleWrapper, alternateTitles, statusWrapper, status, chapters, chapterImages, url, chapterPageReq, chapterPageHtml, dom_1, chapterDocument, images, descriptionParagraphs, providerId, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        // Get HTML
                        slug = slug.startsWith("manga-") ? slug : "manga-".concat(slug);
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://readmanganato.com/".concat(slug))];
                    case 1:
                        pageReq = _b.sent();
                        return [4 /*yield*/, pageReq.text()];
                    case 2:
                        pageHtml = _b.sent();
                        dom = new jsdom_1.JSDOM(pageHtml);
                        document = dom.window.document;
                        title = document.querySelector("h1").textContent;
                        posterUrl = ((_a = document.querySelector(".info-image img")) !== null && _a !== void 0 ? _a : {}).src || "";
                        if (posterUrl.startsWith("/"))
                            posterUrl = "https://manganato.com/" + posterUrl;
                        if (!posterUrl)
                            posterUrl = "https://jipfr.nl/jip.jpg";
                        genreWrapper = __spreadArray([], document.querySelectorAll(".variations-tableInfo tr"), true).find(function (tr) { return tr.textContent.includes("Genres"); });
                        genreLinks = __spreadArray([], genreWrapper.querySelectorAll(".a-h"), true);
                        genres = genreLinks.map(function (v) { return v.textContent; });
                        altTitleWrapper = document.querySelector(".info-alternative")
                            .parentNode.parentNode;
                        alternateTitles = altTitleWrapper
                            .querySelector("h2")
                            .textContent.split(";")
                            .map(function (v) { return v.trim(); });
                        statusWrapper = document.querySelector(".info-status").parentNode
                            .parentNode;
                        status = statusWrapper
                            .querySelectorAll("td")[1]
                            .textContent.toLowerCase();
                        chapters = __spreadArray([], document.querySelectorAll(".row-content-chapter li"), true).reverse() // Their default sorting is large > small — we want the opposite of that
                            .map(function (row) {
                            // Find all values
                            var label = row.querySelector("a").textContent.split(":")[0];
                            var slug = row
                                .querySelector("a")
                                .href.split("/")
                                .pop()
                                .replace(/-/g, "_");
                            var chapter = Number(slug.split("_").pop());
                            var date = new Date(row.querySelector(".chapter-time").textContent);
                            // Make sure date is valid, otherwise set it to now
                            // Thanks for nothing Manganelo
                            if (!date.getTime())
                                date = new Date();
                            // Return product of chapter
                            return {
                                label: label,
                                // Since the creation of the Manganelo scraper, MN has replaced hyphens with underscores. We're replacing that here to keep the reading data intact
                                hrefString: slug,
                                season: 1,
                                chapter: chapter,
                                date: date,
                                combined: chapter
                            };
                        });
                        chapterImages = [];
                        if (!(chapterId != "-1")) return [3 /*break*/, 5];
                        url = "https://readmanganato.com/".concat(slug, "/").concat(chapterId.replace(/_/g, "-" // See generation of chapter hrefString above
                        ));
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(url)];
                    case 3:
                        chapterPageReq = _b.sent();
                        return [4 /*yield*/, chapterPageReq.text()];
                    case 4:
                        chapterPageHtml = _b.sent();
                        dom_1 = new jsdom_1.JSDOM(chapterPageHtml);
                        chapterDocument = dom_1.window.document;
                        images = __spreadArray([], chapterDocument.querySelectorAll(".container-chapter-reader img"), true);
                        chapterImages = images.map(function (v) { return v.getAttribute("src"); });
                        _b.label = 5;
                    case 5:
                        descriptionParagraphs = document
                            .querySelector("#panel-story-info-description")
                            .textContent.split(" :")
                            .slice(1)
                            .join(" :")
                            .split(/\n|<br>/g);
                        providerId = (0, manga_page_1.getProviderId)(this.provider);
                        return [2 /*return*/, {
                                constant: {
                                    title: title,
                                    slug: slug.replace(/manga-/g, ""),
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
                    case 6:
                        err_1 = _b.sent();
                        console.error(chalk_1["default"].red("[MANGANELO]") +
                            " A request for '".concat(slug, "' at '").concat(chapterId, "' has errored"));
                        return [2 /*return*/, (0, index_1.error)(-1, err_1)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return manganeloClass;
}(types_1.Scraper));
exports.manganeloClass = manganeloClass;
// Generate manganelo object and export it
var manganelo = new manganeloClass();
exports["default"] = manganelo;
