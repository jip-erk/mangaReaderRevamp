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
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var chalk_1 = __importDefault(require("chalk"));
var updateManga_1 = __importDefault(require("../util/updateManga"));
var html_entities_1 = require("html-entities");
var types_1 = require("./types");
var manga_page_1 = require("../routers/manga-page");
var index_1 = require("./index");
var Entities = new html_entities_1.XmlEntities();
var RCOClass = /** @class */ (function (_super) {
    __extends(RCOClass, _super);
    function RCOClass() {
        var _this = _super.call(this) || this;
        _this.provider = "RCO";
        _this.canSearch = true;
        _this.nsfw = false;
        _this.genres;
        return _this;
    }
    RCOClass.prototype.scrape = function (slug, chapterId) {
        if (chapterId === void 0) { chapterId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var maxTimeout, scraping, raceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxTimeout = new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve((0, index_1.error)(0, "This request took too long"));
                            }, 10e3);
                        });
                        scraping = this.doScrape(slug, chapterId);
                        return [4 /*yield*/, Promise.race([maxTimeout, scraping])];
                    case 1:
                        raceResult = _a.sent();
                        // Check if it's the timeout instead of the scraped result
                        if (raceResult.success === false &&
                            raceResult.err === "This request took too long") {
                            console.error(chalk_1["default"].red("[RCO]") +
                                " A request for '".concat(slug, "' at '").concat(chapterId, "' took too long and has timed out"));
                        }
                        // Return result
                        return [2 /*return*/, raceResult];
                }
            });
        });
    };
    RCOClass.prototype.doScrape = function (slug, chapterId) {
        if (chapterId === void 0) { chapterId = -1; }
        return __awaiter(this, void 0, void 0, function () {
            var mainReq, html, title_1, posterUrl, descriptionParagraphs, chaptersHTML_1, chapters, chapterImages, imgReq, chapterHTML, js, imgSources, status, provider, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://readcomiconline.li/Comic/".concat(slug), {
                                family: 6,
                                headers: {
                                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36"
                                }
                            })];
                    case 1:
                        mainReq = _a.sent();
                        return [4 /*yield*/, mainReq.text()];
                    case 2:
                        html = _a.sent();
                        html = html.replace(/\r\n| {2}|\t/g, "");
                        title_1 = Entities.decode(html.split('<a Class="bigChar"')[1].split(">")[1].split("</")[0]);
                        posterUrl = "/poster.png";
                        try {
                            // Get poster url
                            posterUrl = html
                                .split("Cover</div>")[1]
                                .trim()
                                .split('src="')[1]
                                .split('"')[0]
                                .replace(/https\/\//g, "https://");
                            // If the poster path is relative, apply that
                            if (!posterUrl.startsWith("http"))
                                posterUrl = "https://readcomiconline.li" + posterUrl;
                        }
                        catch (err) {
                            posterUrl = "/poster.png";
                        }
                        descriptionParagraphs = [];
                        try {
                            descriptionParagraphs = Entities.decode(html.split('<p style="text-align: justify;">')[1].split("</p>")[0]).split("<br />");
                        }
                        catch (err) {
                            // Something, I'm sure
                        }
                        chaptersHTML_1 = html
                            .split("<tr>")
                            .slice(2)
                            .map(function (s) { return s.split("</tr>")[0]; });
                        chapters = chaptersHTML_1
                            .map(function (str, i) {
                            // Get TD elements
                            var tds = str.split("<td>").map(function (s) { return s.split("</td>")[0]; });
                            var tdOne = tds[1];
                            var tdTwo = tds[2];
                            // Get label
                            var label = tdOne
                                .split('">')[1]
                                .split("</")[0]
                                .replace(title_1, "")
                                .trim();
                            // Get HREF
                            var hrefString = tdOne
                                .split('href="')[1]
                                .split('"')[0]
                                .split("?")[0]
                                .split("/")
                                .pop();
                            return {
                                label: label,
                                season: 1,
                                chapter: chaptersHTML_1.length - i,
                                combined: chaptersHTML_1.length - i,
                                date: new Date(tdTwo),
                                hrefString: hrefString
                            };
                        })
                            .sort(function (a, b) { return a.combined - b.combined; });
                        chapterImages = [];
                        if (!(chapterId !== -1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://readcomiconline.li/Comic/".concat(slug, "/").concat(chapterId, "?quality=lq"), {
                                family: 6,
                                headers: {
                                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36"
                                }
                            })];
                    case 3:
                        imgReq = _a.sent();
                        return [4 /*yield*/, imgReq.text()];
                    case 4:
                        chapterHTML = _a.sent();
                        js = chapterHTML
                            .split("var lstImages = new Array();")[1]
                            .split("var currImage = 0;")[0];
                        imgSources = js
                            .match(/lstImages\.push\("(.+?)"\);/g)
                            .map(function (snippet) {
                            return snippet.match(/lstImages\.push\("(.+?)"\);/)[1];
                        });
                        chapterImages = imgSources;
                        _a.label = 5;
                    case 5:
                        status = html
                            .split("Status:</span>")[1]
                            .split("<")[0]
                            .trim()
                            .replace(/&nbsp;/g, "")
                            .toLowerCase();
                        provider = (0, manga_page_1.getProviderId)(this.provider);
                        // console.info(chalk.blue("[RCO]") + ` Resolving ${title} at ${new Date().toLocaleString("it")}`);
                        return [2 /*return*/, {
                                constant: {
                                    title: title_1,
                                    slug: slug,
                                    posterUrl: posterUrl,
                                    alternateTitles: [],
                                    descriptionParagraphs: descriptionParagraphs,
                                    nsfw: false,
                                    genres: []
                                },
                                data: {
                                    chapters: chapters,
                                    chapterImages: chapterImages,
                                    status: status
                                },
                                success: true,
                                provider: (0, manga_page_1.isProviderId)(provider) ? provider : null
                            }];
                    case 6:
                        err_1 = _a.sent();
                        console.error(chalk_1["default"].red("[RCO]") + " An error occured:", err_1);
                        return [2 /*return*/, (0, index_1.error)(0, err_1)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RCOClass.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resultIds, mainReq, body, divs, searchUrl, searchReq, searchHTML, chapterCount, searchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Verify we can search
                        if (!this.canSearch) {
                            return [2 /*return*/, {
                                    error: "Unable to search. Check logs for more information."
                                }];
                        }
                        resultIds = [];
                        if (!(query === "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://readcomiconline.li/ComicList/MostPopular", {
                                family: 6,
                                headers: {
                                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36"
                                }
                            })];
                    case 1:
                        mainReq = _a.sent();
                        return [4 /*yield*/, mainReq.text()];
                    case 2:
                        body = _a.sent();
                        divs = body
                            .split("<tr>")
                            .slice(1)
                            .map(function (v) { return v.split("</tr>")[0].replace(/\r\n| {2}|\t/g, ""); });
                        // Extract links
                        resultIds = divs.map(function (div) {
                            // Get slug from table row
                            var slug = div.split('href="/Comic/')[1].split('"')[0];
                            return slug;
                        });
                        return [3 /*break*/, 7];
                    case 3:
                        searchUrl = "https://readcomiconline.li/Search/Comic";
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(searchUrl, {
                                family: 6,
                                method: "POST",
                                headers: {
                                    "content-type": "application/x-www-form-urlencoded",
                                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36"
                                },
                                body: "keyword=".concat(query.split(" ").join("+"))
                            })];
                    case 4:
                        searchReq = _a.sent();
                        if (!(searchReq.url === searchUrl)) return [3 /*break*/, 6];
                        return [4 /*yield*/, searchReq.text()];
                    case 5:
                        searchHTML = _a.sent();
                        resultIds = searchHTML
                            .split('<a href="/Comic/')
                            .slice(1)
                            .map(function (v) { return v.split('"')[0]; });
                        return [3 /*break*/, 7];
                    case 6:
                        // If there's only one result, RCO redirects to the comic's page
                        resultIds = [searchReq.url.split("/").pop()];
                        _a.label = 7;
                    case 7:
                        chapterCount = query === "" ? 15 : options.resultCount;
                        return [4 /*yield*/, Promise.all(resultIds
                                .slice(0, chapterCount)
                                .map(function (id) { return (0, updateManga_1["default"])("RCO", id.toString()); }))];
                    case 8:
                        searchResults = _a.sent();
                        // Return Adolla-formatted search results
                        return [2 /*return*/, searchResults.filter(function (r) { return r.success; })];
                }
            });
        });
    };
    return RCOClass;
}(types_1.Scraper));
// Create instance and extend it
var RCOInstance = new RCOClass();
exports["default"] = RCOInstance;
