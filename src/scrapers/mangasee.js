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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MangaseeClass = exports.Directory = void 0;
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var chalk_1 = __importDefault(require("chalk"));
var fuse_js_1 = __importDefault(require("fuse.js"));
var updateManga_1 = __importDefault(require("../util/updateManga"));
var types_1 = require("./types");
var manga_page_1 = require("../routers/manga-page");
var index_1 = require("./index");
var config_json_1 = require("../config.json");
// Search interfaces
/** This is for `DirectoryItem`, the values there aren't very useful */
var Directory;
(function (Directory) {
    Directory["Genres"] = "g";
    Directory["Slug"] = "i";
    Directory["Title"] = "s";
    Directory["OngoingPublish"] = "ps";
    Directory["OngoingPrint"] = "ss";
    Directory["AlternateTitles"] = "al";
})(Directory = exports.Directory || (exports.Directory = {}));
var headers = {
    "user-agent": "Adolla"
};
var MangaseeClass = /** @class */ (function (_super) {
    __extends(MangaseeClass, _super);
    function MangaseeClass() {
        var _this = _super.call(this) || this;
        _this.provider = "Mangasee";
        _this.canSearch = true;
        _this.nsfw = false;
        _this.genres;
        return _this;
    }
    MangaseeClass.prototype.search = function (query, options, host) {
        if (host === void 0) { host = "mangasee123"; }
        return __awaiter(this, void 0, void 0, function () {
            var resultCount, matchedResults, searchUrl, searchRes, html, directory, directory, fuse, searchResultData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultCount = __assign({ resultCount: 5 }, options).resultCount;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        matchedResults = [];
                        if (!(query === "")) return [3 /*break*/, 4];
                        searchUrl = "https://".concat(host, ".com/search/?sort=y&desc=true&name=").concat(encodeURIComponent(query));
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(searchUrl, { headers: headers })];
                    case 2:
                        searchRes = _a.sent();
                        return [4 /*yield*/, searchRes.text()];
                    case 3:
                        html = _a.sent();
                        try {
                            directory = JSON.parse(html.split("vm.Directory = ")[1].split("];")[0] + "]");
                            matchedResults = directory
                                .sort(function (a, b) {
                                return normalizeNumber(b.v) - normalizeNumber(a.v);
                            })
                                .slice(0, resultCount);
                        }
                        catch (err) {
                            // Error handling.... of sorts
                            // We don't need to do anything since matchedResults is already empty
                            // console.error("Error in search, MS is probably down....... Again.");
                            throw new Error("Initial search went wrong");
                        }
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://".concat(host, ".com/_search.php"), { headers: headers })];
                    case 5: return [4 /*yield*/, (_a.sent()).json()];
                    case 6:
                        directory = _a.sent();
                        fuse = new fuse_js_1["default"](directory, {
                            threshold: 0.3,
                            distance: 200,
                            keys: [Directory.Title, Directory.Genres, Directory.AlternateTitles]
                        });
                        matchedResults = fuse
                            .search(query)
                            .map(function (result) { return result.item; })
                            .slice(0, resultCount);
                        _a.label = 7;
                    case 7: return [4 /*yield*/, Promise.all(matchedResults.map(function (item) {
                            return (0, updateManga_1["default"])("Mangasee", item[Directory.Slug]);
                        }))];
                    case 8:
                        searchResultData = _a.sent();
                        // Return all successfull data requests
                        return [2 /*return*/, searchResultData.filter(function (v) { return v.success; })];
                    case 9:
                        err_1 = _a.sent();
                        if (host === "mangasee123") {
                            return [2 /*return*/, this.search(query, options, "manga4life")];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * The scrape function. This returns data for an anime
     * @param slug The manga's slug.
     * @param chapter
     * @param season
     */
    MangaseeClass.prototype.scrape = function (slug, chapterId) {
        if (chapterId === void 0) { chapterId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var maxTimeout, scraping, raceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxTimeout = new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve((0, index_1.error)(0, "This request took too long"));
                            }, 15e3);
                        });
                        scraping = this.doScrape(slug, chapterId);
                        return [4 /*yield*/, Promise.race([maxTimeout, scraping])];
                    case 1:
                        raceResult = _a.sent();
                        // Check if it's the timeout instead of the scraped result
                        if (raceResult.success === false &&
                            raceResult.err === "This request took too long") {
                            console.error(chalk_1["default"].red("[MANGADEX]") +
                                " A request for '".concat(slug, "' at '").concat(chapterId, "' took too long and has timed out"));
                        }
                        // Return result
                        return [2 /*return*/, raceResult];
                }
            });
        });
    };
    MangaseeClass.prototype.doScrape = function (slug, chapterId, host) {
        if (chapterId === void 0) { chapterId = null; }
        if (host === void 0) { host = "mangasee123"; }
        return __awaiter(this, void 0, void 0, function () {
            var season, chapter, chapterMatch, nums, doErr, url, pageRes, html, title, posterUrl, alternateTitles, descriptionParagraphs, chapterData, chapters, genres, status, chapterImages, chapterUrl, chapterRes, chapterBody, cdnUrl, curChapter, page, _a, chapterNormal, chapterModded, chapterString, directoryString, pageString, nsfw, _i, genres_1, genre, providerId, err_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (chapterId && typeof chapterId === "string") {
                            chapterMatch = chapterId.match(/(\d*\.?\d+)-(\d*\.?\d+)/);
                            if (!chapterMatch) {
                                return [2 /*return*/, (0, index_1.error)(403, "Invalid season chapter string")];
                            }
                            nums = chapterMatch.map(function (v) { return Number(v); });
                            season = nums[1];
                            chapter = nums[2]; // Bit of a hack...
                        }
                        doErr = function (status, reason) {
                            if (host === "mangasee123") {
                                return _this.doScrape(slug, chapterId, "manga4life");
                            }
                            else {
                                console.error("".concat(status, " Throwing error for ").concat(slug));
                                return (0, index_1.error)(status, reason);
                            }
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        url = "https://".concat(host, ".com/manga/").concat(slug);
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(url, { headers: headers })];
                    case 2:
                        pageRes = _b.sent();
                        return [4 /*yield*/, pageRes.text()];
                    case 3:
                        html = _b.sent();
                        // if (Math.floor(Math.random() * 2) === 0) throw new Error("lol");
                        // Check if response is valid.
                        // Throw error if not
                        if (!pageRes.ok ||
                            pageRes.url.endsWith("undefined") ||
                            html.includes("<title>404 Page Not Found</title>")) {
                            return [2 /*return*/, doErr(pageRes.status, html)];
                        }
                        title = html.split("<h1>")[1].split("</h1>")[0];
                        posterUrl = html
                            .split('<meta property="og:image" content="')[1]
                            .split('"')[0];
                        alternateTitles = [];
                        if (html.includes("Alternate Name(s):"))
                            alternateTitles = html
                                .split('<span class="mlabel">Alternate Name(s):</span>')[1] // Find starting point of alternate names
                                .split("<")[0] // Find closing HMTL tag
                                .trim() // Remove trailing stuff
                                .split(", ") // Seperate names on comma
                                .filter(Boolean); // Remove empty strings
                        descriptionParagraphs = html
                            .split('<span class="mlabel">Description:</span>')[1] // Find start of div of descriptions (it's a bit weird)
                            .split(">")[1] // Find closing of opening paragraph
                            .split("</")[0] // Find closing paragraph
                            .trim() // Remove start & end trim
                            .split("\n") // Get seperate paragraphs
                            .filter(Boolean);
                        chapterData = JSON.parse(html.split("vm.Chapters = ")[1].split(";")[0]);
                        chapters = chapterData
                            .map(function (ch) {
                            var season = Number(ch.Chapter[0]);
                            var chapter = normalizeNumber(ch.Chapter.slice(1)) / 10;
                            var label = "".concat(ch.Type, " ").concat(chapter);
                            var date = new Date(ch.Date);
                            return {
                                season: season,
                                chapter: chapter,
                                label: label,
                                date: date,
                                hrefString: "".concat(season, "-").concat(chapter),
                                combined: season * 1e5 + chapter
                            };
                        })
                            .sort(function (a, b) { return a.combined - b.combined; });
                        genres = JSON.parse(html.split('"genre": ')[1].split("],")[0] + "]");
                        status = html
                            .split('<span class="mlabel">Status:</span>')[1]
                            .split(">")[1]
                            .split(" (")[0]
                            .trim()
                            .toLowerCase();
                        chapterImages = [];
                        if (!(season >= 0 && chapter >= 0)) return [3 /*break*/, 6];
                        chapterUrl = "https://".concat(host, ".com/read-online/").concat(slug, "-chapter-").concat(chapter, "-index-").concat(season, ".html");
                        return [4 /*yield*/, (0, node_fetch_extra_1["default"])(chapterUrl, { headers: headers })];
                    case 4:
                        chapterRes = _b.sent();
                        return [4 /*yield*/, chapterRes.text()];
                    case 5:
                        chapterBody = _b.sent();
                        cdnUrl = chapterBody.split('vm.CurPathName = "')[1].split('"')[0];
                        curChapter = JSON.parse(chapterBody.split("vm.CurChapter = ")[1].split("};")[0] + "}");
                        // Generate URLs
                        chapterImages = [];
                        for (page = 0; page < Number(curChapter.Page); page++) {
                            _a = chapter
                                .toString()
                                .split(/(\.)/), chapterNormal = _a[0], chapterModded = _a.slice(1);
                            chapterString = "".concat(chapterNormal.padStart(4, "0")).concat(chapterModded.join(""));
                            directoryString = curChapter.Directory
                                ? "/".concat(curChapter.Directory)
                                : "";
                            pageString = (page + 1).toString().padStart(3, "0");
                            // Add page url to array
                            chapterImages.push("https://".concat(cdnUrl, "/manga/").concat(slug).concat(directoryString, "/").concat(chapterString, "-").concat(pageString, ".png"));
                        }
                        _b.label = 6;
                    case 6:
                        nsfw = false;
                        for (_i = 0, genres_1 = genres; _i < genres_1.length; _i++) {
                            genre = genres_1[_i];
                            if (config_json_1.disallowedGenres.includes(genre.toLowerCase()))
                                nsfw = true;
                        }
                        providerId = (0, manga_page_1.getProviderId)(this.provider);
                        // console.info(chalk.blue(" [MS]") + ` Resolving ${title} at ${new Date().toLocaleString("it")}`);
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
                    case 7:
                        err_2 = _b.sent();
                        // OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!
                        // console.error(err.stack);
                        return [2 /*return*/, doErr(-1, err_2)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return MangaseeClass;
}(types_1.Scraper));
exports.MangaseeClass = MangaseeClass;
// Generate mangasee object and export it
var Mangasee = new MangaseeClass();
exports["default"] = Mangasee;
/**
 * Normalize a number string.
 * Many strings are 0-padded, if you do `Number("00005")` weird stuff happens.
 *
 * Returns a normal number
 * @param input a zero-padded number string, like `0003`
 *
 */
function normalizeNumber(input) {
    var normalized = Number(input.slice(input.split("").findIndex(function (v) { return v !== "0"; })));
    return normalized;
}
