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
var scrapers = __importStar(require("../scrapers"));
var doSearch_1 = require("../util/doSearch");
var getMangaProgress_1 = require("../util/getMangaProgress");
var types_1 = require("../scrapers/types");
var manga_page_1 = require("./manga-page");
var getReading_1 = __importDefault(require("../util/getReading"));
var db_1 = __importDefault(require("../db"));
router.get("/", function (req, res) {
    var _a;
    var query = ((_a = req.query.q) !== null && _a !== void 0 ? _a : "").trim();
    res.redirect("/search/mangasee/".concat(query ? "?q=".concat(encodeURIComponent(query)) : ""));
});
//---------- help --------------------
router.get("/all", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    function delay(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    var query, params, param, provider, searchResults, test, scrapersArray, scraperMap;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                query = ((_a = req.query.q) !== null && _a !== void 0 ? _a : "").trim();
                params = ['mangasee', 'mangadex5', 'mangahere'];
                param = 'mangahere';
                provider = (0, manga_page_1.isProviderId)(param) ? param : null;
                searchResults = [];
                test = "mangadex5";
                types_1.providerids.forEach(function (providerids) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, doSearch_1.doSearch)(providerids, query)];
                            case 1:
                                //console.log(providerids)
                                searchResults = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, delay(100000)];
            case 1:
                _b.sent();
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // Do something before delay
                                console.log('before delay');
                                return [4 /*yield*/, delay(10000)];
                            case 1:
                                _a.sent();
                                // Do something after
                                console.log(searchResults);
                                return [2 /*return*/];
                        }
                    });
                }); })();
                // !Get search results
                // Get search results
                if (Array.isArray(searchResults)) {
                    searchResults = searchResults.filter(function (v) { return v.success; });
                }
                if (!Array.isArray(searchResults)) return [3 /*break*/, 3];
                return [4 /*yield*/, Promise.all(searchResults.map(getMangaProgress_1.setMangaProgress))];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                scrapersArray = Object.values(scrapers.scrapers);
                scraperMap = scrapersArray
                    .map(function (scraper) {
                    var _a;
                    var id = (0, manga_page_1.getProviderId)(scraper.provider);
                    var name = (0, manga_page_1.getProviderName)(id);
                    if (db_1["default"].get("settings.show-nsfw") === "no" && scraper.nsfw)
                        return null;
                    if (!scraper.canSearch)
                        return null;
                    return {
                        id: id,
                        name: (_a = scraper.searchDisplay) !== null && _a !== void 0 ? _a : name,
                        href: "/search/".concat(id, "/").concat(query ? "?q=".concat(encodeURIComponent(query)) : ""),
                        isCurrent: id === test
                    };
                })
                    .filter(Boolean);
                res.render("search", {
                    query: query,
                    searchResults: searchResults,
                    isSearch: true,
                    scrapers: scraperMap
                });
                return [2 /*return*/];
        }
    });
}); });
//------------------------------------------------------------
router.get("/:provider", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, param, provider, scraperName, searchResults, scrapersArray, scraperMap;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                query = ((_a = req.query.q) !== null && _a !== void 0 ? _a : "").trim();
                param = req.params.provider.toLowerCase();
                provider = (0, manga_page_1.isProviderId)(param) ? param : null;
                scraperName = (0, manga_page_1.getProviderName)(provider);
                if (!scraperName) {
                    next();
                    return [2 /*return*/];
                }
                searchResults = [];
                return [4 /*yield*/, (0, doSearch_1.doSearch)(provider, query)];
            case 1:
                searchResults = _b.sent();
                if (Array.isArray(searchResults)) {
                    searchResults = searchResults.filter(function (v) { return v.success; });
                }
                if (!Array.isArray(searchResults)) return [3 /*break*/, 3];
                return [4 /*yield*/, Promise.all(searchResults.map(getMangaProgress_1.setMangaProgress))];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                scrapersArray = Object.values(scrapers.scrapers);
                scraperMap = scrapersArray
                    .map(function (scraper) {
                    var _a;
                    var id = (0, manga_page_1.getProviderId)(scraper.provider);
                    var name = (0, manga_page_1.getProviderName)(id);
                    if (db_1["default"].get("settings.show-nsfw") === "no" && scraper.nsfw)
                        return null;
                    if (!scraper.canSearch)
                        return null;
                    return {
                        id: id,
                        name: (_a = scraper.searchDisplay) !== null && _a !== void 0 ? _a : name,
                        href: "/search/".concat(id, "/").concat(query ? "?q=".concat(encodeURIComponent(query)) : ""),
                        isCurrent: id === param
                    };
                })
                    .filter(Boolean);
                res.render("search", {
                    query: query,
                    searchResults: searchResults,
                    isSearch: true,
                    scrapers: scraperMap
                });
                return [2 /*return*/];
        }
    });
}); });
router.get("/:provider/json", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, param, provider, scraperName, searchResults, reading, scrapersArray, scraperMap;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                res.header("Access-Control-Allow-Origin", "*");
                query = ((_a = req.query.q) !== null && _a !== void 0 ? _a : "").trim();
                param = req.params.provider.toLowerCase();
                provider = (0, manga_page_1.isProviderId)(param) ? param : null;
                scraperName = (0, manga_page_1.getProviderName)(provider);
                if (!scraperName) {
                    next();
                    return [2 /*return*/];
                }
                searchResults = [];
                return [4 /*yield*/, (0, doSearch_1.doSearch)(provider, query)];
            case 1:
                searchResults = _b.sent();
                if (!Array.isArray(searchResults)) return [3 /*break*/, 3];
                return [4 /*yield*/, Promise.all(searchResults.map(getMangaProgress_1.setMangaProgress))];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, (0, getReading_1["default"])(4)];
            case 4:
                reading = _b.sent();
                scrapersArray = Object.values(scrapers.scrapers);
                scraperMap = scrapersArray.map(function (scraper) {
                    var id = (0, manga_page_1.getProviderId)(scraper.provider);
                    var name = (0, manga_page_1.getProviderName)(id);
                    return {
                        id: id,
                        name: name,
                        href: "/search/".concat(id, "/").concat(query ? "?q=".concat(encodeURIComponent(query)) : ""),
                        isCurrent: id === param
                    };
                });
                res.json({
                    data: {
                        reading: reading,
                        query: query,
                        searchResults: searchResults,
                        scrapers: scraperMap
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
