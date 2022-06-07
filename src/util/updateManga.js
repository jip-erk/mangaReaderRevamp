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
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var bbcode_parser_1 = __importDefault(require("bbcode-parser"));
var html_entities_1 = require("html-entities");
var scrapers = __importStar(require("../scrapers"));
var db_1 = __importDefault(require("../db"));
var getMangaProgress_1 = __importDefault(require("./getMangaProgress"));
var config_json_1 = __importDefault(require("../config.json"));
var manga_page_1 = require("../routers/manga-page");
var config_json_2 = require("../config.json");
var config_json_3 = require("../config.json");
var cache_1 = __importDefault(require("../util/cache"));
var Entities = new html_entities_1.XmlEntities();
var parser = new bbcode_parser_1["default"](bbcode_parser_1["default"].defaultTags());
var bannerCache = {};
var nsfwError = {
    success: false,
    status: 0,
    err: "This is NSFW content"
};
function updateManga(provider, slug, ignoreExisting, chapterId) {
    var _a;
    if (ignoreExisting === void 0) { ignoreExisting = false; }
    if (chapterId === void 0) { chapterId = -1; }
    return __awaiter(this, void 0, void 0, function () {
        var existing, d_1, scraperName, scraper, data, nData, p, d;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    existing = (_a = cache_1["default"] === null || cache_1["default"] === void 0 ? void 0 : cache_1["default"][(0, manga_page_1.getProviderId)(provider)]) === null || _a === void 0 ? void 0 : _a[slug];
                    if (!(existing &&
                        existing.savedAt > Date.now() - config_json_1["default"].cache.duration &&
                        !ignoreExisting &&
                        chapterId === -1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, addInfo(existing)];
                case 1:
                    d_1 = _b.sent();
                    if (d_1.success && d_1.constant.nsfw && db_1["default"].get("settings.show-nsfw") === "no")
                        return [2 /*return*/, nsfwError];
                    return [2 /*return*/, d_1];
                case 2:
                    scraperName = (0, manga_page_1.getProviderName)(provider) || provider;
                    scraper = scrapers[scraperName];
                    if (!scraper) {
                        console.error("No scraper: " + provider);
                        return [2 /*return*/, {
                                err: "No such scraper exists",
                                status: 0,
                                success: false
                            }];
                    }
                    return [4 /*yield*/, scraper.scrape(slug, chapterId)];
                case 3:
                    data = _b.sent();
                    if (data.success) {
                        nData = JSON.parse(JSON.stringify(data));
                        nData.savedAt = Date.now();
                        // Remove unnecesary data from DB
                        nData.data.chapters.forEach(function (d) {
                            delete d.progress;
                            delete d.realProgress;
                        });
                        delete nData.data.chapterImages; // Get rid of images
                        delete nData.realProgress;
                        delete nData.progress;
                        p = (0, manga_page_1.getProviderId)(provider);
                        if (!cache_1["default"][p])
                            cache_1["default"][p] = [];
                        cache_1["default"][(0, manga_page_1.getProviderId)(p)][slug] = nData;
                        // db.set(dbQuery, nData);
                    }
                    return [4 /*yield*/, addInfo(data)];
                case 4:
                    d = _b.sent();
                    if (!(d === null || d === void 0 ? void 0 : d.success)) {
                        if (typeof (d === null || d === void 0 ? void 0 : d.success) === "undefined") {
                            return [2 /*return*/, {
                                    success: false,
                                    status: -1,
                                    err: "Unkown error"
                                }];
                        }
                        return [2 /*return*/, d];
                    }
                    // Throw NSFW error if this content is nsfw and the user doesn't want NSFW content
                    if (d.constant.nsfw && db_1["default"].get("settings.show-nsfw") === "no")
                        return [2 /*return*/, nsfwError];
                    // Return normal data
                    return [2 /*return*/, d];
            }
        });
    });
}
exports["default"] = updateManga;
function addInfo(data) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var chapterPromises, readChapters, unreadChapterCount, seasonSet, chapters, TrueGenres_1, _i, _d, genre, _e, _f, genre, existingBanner, query, aniListData, banner, err_1;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!data.success) return [3 /*break*/, 7];
                    chapterPromises = data.data.chapters.map(function (ch) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = ch;
                                    return [4 /*yield*/, (0, getMangaProgress_1["default"])(data.provider, data.constant.slug, ch.hrefString)];
                                case 1:
                                    _a.progress = _b.sent();
                                    return [2 /*return*/, ch];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(chapterPromises)];
                case 1:
                    _g.sent();
                    if (db_1["default"].get("settings.show-unread-chapter-count") === "yes") {
                        readChapters = data.data.chapters.filter(function (v) { var _a; return ((_a = v.progress) === null || _a === void 0 ? void 0 : _a.percentage) >= 90; });
                        unreadChapterCount = data.data.chapters.length - readChapters.length;
                        data.unreadChapterCount = unreadChapterCount;
                    }
                    else {
                        data.unreadChapterCount = null;
                    }
                    // Clean description paragraphs
                    data.constant.descriptionParagraphs = data.constant.descriptionParagraphs.map(function (s) {
                        return Entities.decode(parser.parseString(s)) // Basic HTML entities and bbcode parser
                            .replace(/&rsquo;/g, "'") // Weird HTML entities
                            .replace(/\[\/?spoiler\]/g, "");
                    } // Get rid of [spoiler] tags
                    );
                    seasonSet = new Set(data.data.chapters.map(function (c) { return c.season.toString(); }));
                    chapters = Array.from(seasonSet);
                    data.data.hasSeasons = chapters.length > 1;
                    TrueGenres_1 = ['harem', 'romance', 'comedy', 'isekai', 'ecchi'];
                    // See if it's hentai or if it's safe
                    for (_i = 0, _d = data.constant.genres; _i < _d.length; _i++) {
                        genre = _d[_i];
                        //if(!TrueGenres.includes(genre)){
                        //delete data.constant.genres[genre];
                        //	}
                        if (config_json_2.disallowedGenres.includes(genre.toLowerCase())) {
                            data.constant.nsfw = true;
                        }
                    }
                    data.constant.genres.forEach(function (element, index) {
                        if (!TrueGenres_1.includes(element.toLowerCase()))
                            data.constant.genres.splice(index, 1);
                    });
                    for (_e = 0, _f = data.constant.genres; _e < _f.length; _e++) {
                        genre = _f[_e];
                        if (config_json_3.disallowedLanguage.includes(genre.toLowerCase())) {
                            data.constant.nsfw = true;
                        }
                    }
                    if (data.constant.descriptionParagraphs.join("\n").includes("sex")) {
                        data.constant.nsfw = true;
                    }
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 6, , 7]);
                    if (!(data.provider === "mangadex5" ||
                        data.provider === "mangasee" ||
                        data.provider === "manganelo" ||
                        data.provider === "mangahere")) return [3 /*break*/, 4];
                    existingBanner = bannerCache[data.constant.title];
                    if (existingBanner) {
                        data.constant.banner = existingBanner;
                        return [2 /*return*/, data];
                    }
                    query = "\n\t\t\t\tquery media($search:String, $type:MediaType) { \n\t\t\t\t\tMedia(search:$search, type:$type){\n\t\t\t\t\t\tid\n\t\t\t\t\t\tbannerImage\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t";
                    return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://graphql.anilist.co", {
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify({
                                query: query,
                                variables: {
                                    search: data.constant.title,
                                    type: "MANGA"
                                }
                            }),
                            method: "POST"
                        }).then(function (d) { return d.json(); })];
                case 3:
                    aniListData = _g.sent();
                    banner = (_c = (_b = (_a = aniListData === null || aniListData === void 0 ? void 0 : aniListData.data) === null || _a === void 0 ? void 0 : _a.Media) === null || _b === void 0 ? void 0 : _b.bannerImage) !== null && _c !== void 0 ? _c : null;
                    data.constant.banner = banner;
                    if (banner)
                        bannerCache[data.constant.title] = banner;
                    return [3 /*break*/, 5];
                case 4:
                    data.constant.banner = data.constant.posterUrl;
                    _g.label = 5;
                case 5:
                    // Store title in db cache, just for future safety
                    if (!db_1["default"].get("seriesMetaData.".concat(data.provider, ".").concat(data.constant.slug))) {
                        db_1["default"].set("seriesNames.".concat(data.provider, ".").concat(data.constant.slug), data.constant);
                    }
                    // Return data
                    return [2 /*return*/, data];
                case 6:
                    err_1 = _g.sent();
                    data.constant.banner = data.constant.posterUrl;
                    //console.error(
                    //	chalk.red("[ANILIST]") +
                    //		` Unable to fetch banner for ${data.constant.title}:`,
                    //);
                    return [2 /*return*/, data];
                case 7: return [2 /*return*/];
            }
        });
    });
}
