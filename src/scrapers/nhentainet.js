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
exports.nhentaiClass = void 0;
var chalk_1 = __importDefault(require("chalk"));
var index_1 = require("./index");
var types_1 = require("./types");
var manga_page_1 = require("../routers/manga-page");
var updateManga_1 = __importDefault(require("../util/updateManga"));
var nhentaiClass = /** @class */ (function (_super) {
    __extends(nhentaiClass, _super);
    function nhentaiClass() {
        var _this = _super.call(this) || this;
        _this.provider = "nhentainet";
        _this.searchDisplay = "nhentai.net";
        _this.canSearch = true;
        _this.nsfw = true;
        return _this;
    }
    nhentaiClass.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resultCount, pageUrl, searchData, ids, searchResultData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultCount = __assign({ resultCount: 5 }, options).resultCount;
                        if (query === "") {
                            // Get popular page
                            pageUrl = "https://nhentai.net/api/galleries/search?query=english&sort=popular-week";
                        }
                        else {
                            pageUrl = "https://nhentai.net/api/galleries/search?query=".concat(encodeURIComponent(query), "+english&sort=popular-week");
                        }
                        return [4 /*yield*/, (0, index_1.getDataFromURL)(pageUrl)];
                    case 1:
                        searchData = _a.sent();
                        if (!(searchData === null || searchData === void 0 ? void 0 : searchData.result)) return [3 /*break*/, 3];
                        ids = searchData.result
                            .map(function (result) { return result.id; })
                            .slice(0, resultCount);
                        return [4 /*yield*/, Promise.all(ids.map(function (id) { return (0, updateManga_1["default"])("nhentainet", id); }))];
                    case 2:
                        searchResultData = _a.sent();
                        return [2 /*return*/, searchResultData];
                    case 3: 
                    //console.log(pageUrl);
                    return [2 /*return*/, []];
                }
            });
        });
    };
    /**
     * The scrape function
     */
    nhentaiClass.prototype.scrape = function (slug, chapterId) {
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
                            console.error(chalk_1["default"].red("[NHENTAI]") +
                                " A request for '".concat(slug, "' at '").concat(chapterId, "' took too long and has timed out"));
                        }
                        // Return result
                        return [2 /*return*/, raceResult];
                }
            });
        });
    };
    nhentaiClass.prototype.getImageType = function (type) {
        var _a;
        var types = {
            j: "jpg",
            p: "png"
        };
        return (_a = types[type]) !== null && _a !== void 0 ? _a : "jpg";
    };
    nhentaiClass.prototype.doScrape = function (slug, chapterId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var data_1, language, textTitle, title, alternateTitles, posterUrlMain, posterUrl, genres, date, chapterImages, providerId, e_1;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, index_1.getDataFromURL)("https://nhentai.net/api/gallery/".concat(slug))];
                    case 1:
                        data_1 = _d.sent();
                        language = ((_a = data_1.tags.find(function (tag) { return tag.type === "language"; })) === null || _a === void 0 ? void 0 : _a.name) || "unknown";
                        textTitle = (_c = (_b = data_1.title.pretty) !== null && _b !== void 0 ? _b : data_1.title.english) !== null && _c !== void 0 ? _c : Object.values(data_1.title)[0];
                        title = "".concat(language.slice(0, 1).toUpperCase() + language.slice(1, 2), ": ").concat(textTitle);
                        alternateTitles = Object.values(data_1.title);
                        posterUrlMain = "https://t.nhentai.net/galleries/".concat(data_1.media_id, "/cover.").concat(this.getImageType(data_1.images.cover.t));
                        posterUrl = "/proxy-image?url=".concat(encodeURIComponent(posterUrlMain));
                        genres = data_1.tags.map(function (tag) { return tag.name.slice(0, 1).toUpperCase() + tag.name.slice(1); });
                        date = new Date(data_1.upload_date * 1e3);
                        chapterImages = data_1.images.pages.map(function (pageInfo, i) {
                            return "https://i.nhentai.net/galleries/".concat(data_1.media_id, "/").concat(i + 1, ".").concat(_this.getImageType(pageInfo.t));
                        });
                        providerId = (0, manga_page_1.getProviderId)(this.provider);
                        return [2 /*return*/, {
                                constant: {
                                    title: title,
                                    slug: slug,
                                    posterUrl: posterUrl,
                                    alternateTitles: alternateTitles,
                                    descriptionParagraphs: ["nhentai does not provide descriptions."],
                                    genres: genres,
                                    nsfw: true
                                },
                                data: {
                                    chapters: [
                                        {
                                            season: 1,
                                            chapter: 1,
                                            label: "Chapter 1",
                                            date: date,
                                            hrefString: "read"
                                        },
                                    ],
                                    chapterImages: chapterImages,
                                    status: "ended"
                                },
                                success: true,
                                provider: (0, manga_page_1.isProviderId)(providerId) ? providerId : null
                            }];
                    case 2:
                        e_1 = _d.sent();
                        return [2 /*return*/, {
                                success: false,
                                status: 0,
                                err: e_1
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return nhentaiClass;
}(types_1.Scraper));
exports.nhentaiClass = nhentaiClass;
// Generate nhentai object and export it
var nhentai = new nhentaiClass();
exports["default"] = nhentai;
