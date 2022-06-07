"use strict";
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
exports.isProviderId = exports.getProviderId = exports.isProviderName = exports.getProviderName = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var db_1 = __importDefault(require("../db"));
var updateManga_1 = __importDefault(require("../util/updateManga"));
var getMangaProgress_1 = __importStar(require("../util/getMangaProgress"));
var lists_1 = require("../util/lists");
var getProgressData_1 = __importDefault(require("../util/getProgressData"));
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var lists_2 = require("./lists");
var scrapers_1 = require("../scrapers");
var scrapersMapped = {
    mangasee: "Mangasee",
    mangadex: "Mangadex",
    rco: "RCO",
    nhentai: "nhentai",
    manganelo: "Manganelo",
    comicextra: "ComicExtra",
    mangahere: "Mangahere",
    mangadex5: "Mangadex5",
    nhentainet: "nhentainet",
    guya: "Guya"
};
var scrapersMappedReversed = Object.fromEntries(Object.entries(scrapersMapped).map(function (v) { return v.reverse(); }));
function getProviderName(slug) {
    var _a;
    return (_a = scrapersMapped[slug === null || slug === void 0 ? void 0 : slug.toLowerCase()]) !== null && _a !== void 0 ? _a : null;
}
exports.getProviderName = getProviderName;
function isProviderName(slug) {
    return !!scrapersMappedReversed[slug];
}
exports.isProviderName = isProviderName;
function getProviderId(slug) {
    var _a;
    return (_a = scrapersMappedReversed[slug]) !== null && _a !== void 0 ? _a : slug;
}
exports.getProviderId = getProviderId;
function isProviderId(slug) {
    return !!scrapersMapped[slug];
}
exports.isProviderId = isProviderId;
router.get("/:provider/:slug", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var param, provider, data, _a, lists, allLists, mangaProgress;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                param = req.params.slug;
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    next();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, updateManga_1["default"])(provider, param, true)];
            case 1:
                data = _b.sent();
                if (!(data && data.success)) return [3 /*break*/, 3];
                return [4 /*yield*/, handleData(data, param)];
            case 2:
                _a = _b.sent(), lists = _a.lists, allLists = _a.allLists, mangaProgress = _a.mangaProgress;
                // Render
                res.render("manga", {
                    data: data,
                    currentSlug: param,
                    lists: lists,
                    allLists: allLists,
                    mangaProgress: mangaProgress
                });
                return [3 /*break*/, 4];
            case 3:
                console.error("No data found for", param);
                next();
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/:provider/:slug/json", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var param, provider, data, newData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res.header("Access-Control-Allow-Origin", "*");
                param = req.params.slug;
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    res.json({
                        status: 404,
                        error: "Not a provider",
                        data: null
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, updateManga_1["default"])(provider, param, true)];
            case 1:
                data = _a.sent();
                if (!(data && data.success)) return [3 /*break*/, 3];
                return [4 /*yield*/, handleData(data, param)];
            case 2:
                newData = _a.sent();
                // Render
                res.json({
                    data: newData
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
function handleData(data, param) {
    return __awaiter(this, void 0, void 0, function () {
        var allLists, lists, convert, totalChapterCount, doneChapterCount, mangaProgress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Set progress
                return [4 /*yield*/, (0, getMangaProgress_1.setMangaProgress)(data)];
                case 1:
                    // Set progress
                    _a.sent();
                    // See if chapter is same as "last read" chapter
                    return [4 /*yield*/, setColors(data, param)];
                case 2:
                    // See if chapter is same as "last read" chapter
                    _a.sent();
                    return [4 /*yield*/, (0, lists_1.getLists)()];
                case 3:
                    allLists = _a.sent();
                    lists = allLists.filter(function (l) { return l.entries.find(function (m) { return m.slug === param; }); });
                    convert = function (l) { return ({
                        slug: l.slug,
                        name: l.name
                    }); };
                    totalChapterCount = data.data.chapters.length;
                    doneChapterCount = data.data.chapters.reduce(function (acc, current) { var _a, _b; return acc + ((_b = (_a = current === null || current === void 0 ? void 0 : current.progress) === null || _a === void 0 ? void 0 : _a.percentage) !== null && _b !== void 0 ? _b : 0) / 100; }, 0);
                    mangaProgress = {
                        total: totalChapterCount,
                        done: Math.round(doneChapterCount),
                        percentage: Math.round((doneChapterCount / totalChapterCount) * 100)
                    };
                    return [2 /*return*/, {
                            lists: lists.filter(function (l) { return !l.byCreator; }).map(convert),
                            allLists: allLists.filter(function (l) { return !l.byCreator; }).map(convert),
                            totalChapterCount: totalChapterCount,
                            doneChapterCount: doneChapterCount,
                            mangaProgress: mangaProgress
                        }];
            }
        });
    });
}
router.get("/:provider/:slug/:chapter", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, slug, provider, data, chapters, currentChapter, nextChapter, previousChapter;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                chapterId = req.params.chapter;
                slug = req.params.slug;
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    next();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, updateManga_1["default"])(provider, slug)];
            case 1:
                data = _c.sent();
                if (!(data && data.success)) return [3 /*break*/, 4];
                // Stuff
                return [4 /*yield*/, (0, getMangaProgress_1.setMangaProgress)(data)];
            case 2:
                // Stuff
                _c.sent();
                chapters = data.data.chapters;
                currentChapter = chapters.find(function (c) { return c.hrefString == chapterId; });
                nextChapter = (_a = chapters[chapters.indexOf(currentChapter) + 1]) !== null && _a !== void 0 ? _a : null;
                previousChapter = (_b = chapters[chapters.indexOf(currentChapter) - 1]) !== null && _b !== void 0 ? _b : null;
                // See if chapter is same as last chapter
                return [4 /*yield*/, setColors(data, slug)];
            case 3:
                // See if chapter is same as last chapter
                _c.sent();
                res.render("manga-chapter", {
                    data: data,
                    navigation: {
                        nextChapter: nextChapter,
                        previousChapter: previousChapter,
                        currentChapter: currentChapter
                    },
                    isMangaPage: true,
                    readerSettings: true,
                    currentSlug: slug
                });
                return [3 /*break*/, 5];
            case 4:
                console.error("No data found for", slug);
                next();
                _c.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/:provider/:slug/:chapter/json", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, slug, provider, data, chapters, currentChapter, nextChapter, previousChapter;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                res.header("Access-Control-Allow-Origin", "*");
                chapterId = req.params.chapter;
                slug = req.params.slug;
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    return [2 /*return*/, res.json({
                            status: 404,
                            error: "Provider not found",
                            data: null
                        })];
                }
                return [4 /*yield*/, (0, updateManga_1["default"])(provider, slug)];
            case 1:
                data = _c.sent();
                if (!(data && data.success)) return [3 /*break*/, 4];
                // Stuff
                return [4 /*yield*/, (0, getMangaProgress_1.setMangaProgress)(data)];
            case 2:
                // Stuff
                _c.sent();
                chapters = data.data.chapters;
                currentChapter = chapters.find(function (c) { return c.hrefString == chapterId; });
                nextChapter = (_a = chapters[chapters.indexOf(currentChapter) + 1]) !== null && _a !== void 0 ? _a : null;
                previousChapter = (_b = chapters[chapters.indexOf(currentChapter) - 1]) !== null && _b !== void 0 ? _b : null;
                // See if chapter is same as last chapter
                return [4 /*yield*/, setColors(data, slug)];
            case 3:
                // See if chapter is same as last chapter
                _c.sent();
                res.json({
                    data: {
                        data: data,
                        navigation: {
                            nextChapter: nextChapter,
                            previousChapter: previousChapter,
                            currentChapter: currentChapter
                        },
                        currentSlug: slug
                    }
                });
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.json({
                    status: 404,
                    error: "Manga not found",
                    data: null
                })];
            case 5: return [2 /*return*/];
        }
    });
}); });
var imageRouter = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, slug, provider, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chapterId = req.params.chapter;
                slug = req.params.slug;
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    next();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, updateManga_1["default"])(provider, slug, true, chapterId)];
            case 1:
                data = _a.sent();
                if (data && data.success) {
                    // Return images
                    res.json(data.data.chapterImages);
                }
                else if (data.success === false) {
                    // Something went wrong for some reason
                    res.status(404);
                    res.json({
                        status: 404,
                        err: data.err
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
router.get("/:provider/:slug/:chapter/get-images/json", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
router.get("/:provider/:slug/:chapter/get-images", imageRouter);
router.get("/:provider/:slug/:chapter/get-images/json", imageRouter);
/**
 * Proxy pages
 */
router.get("/proxy-image", function (req, res) {
    var url = decodeURIComponent(req.query.url.toString());
    res.setHeader("content-type", "image/".concat(url.includes(".png") ? "png" : "jpg") // Oh well
    );
    var headers = {};
    if (req.query.referer === "mangasee") {
        headers.referer = "https://mangasee123.com";
    }
    else if (req.query.referer === "manganelo") {
        headers.referer = "https://readmanganato.com/";
    }
    headers["user-agent"] = "Adolla";
    (0, node_fetch_extra_1["default"])(url, {
        headers: headers
    }).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            response.body.pipe(res);
            return [2 /*return*/];
        });
    }); });
});
router.get("/mangadex-cover/:slug/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posterId, slug, url, posterData, posterEntry;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                posterId = decodeURIComponent(req.params.id.toString());
                slug = decodeURIComponent(req.params.slug.toString());
                url = "https://i.imgur.com/6TrIues.jpg";
                return [4 /*yield*/, (0, scrapers_1.getDataFromURL)("https://api.mangadex.org/cover?ids[]=".concat(posterId))];
            case 1:
                posterData = _c.sent();
                posterEntry = (_b = (_a = posterData === null || posterData === void 0 ? void 0 : posterData.results) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data;
                if (posterEntry) {
                    url = "https://uploads.mangadex.org/covers/".concat(slug, "/").concat(posterEntry.attributes.fileName, ".512.jpg");
                }
                res.redirect(url);
                return [2 /*return*/];
        }
    });
}); });
// Mark as read
router.post("/:provider/:slug/mark-chapters-as/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, updateValues, provider, data, chapters_1, markChapters, lastProgressData, _i, markChapters_1, chapter, queryString, existingData, progressData, progressDataNew, lastReadChapter_1, lastReadChapterInRead, allReading, newLast, readingData, remainingData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slug = req.params.slug;
                updateValues = req.body.values;
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    next();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, updateManga_1["default"])(provider, slug)];
            case 1:
                data = _a.sent();
                if (data.success === true) {
                    chapters_1 = data.data.chapters;
                    markChapters = updateValues.map(function (markingChapter) {
                        return chapters_1.find(function (c) { return c.hrefString === markingChapter; });
                    });
                    lastProgressData = null;
                    for (_i = 0, markChapters_1 = markChapters; _i < markChapters_1.length; _i++) {
                        chapter = markChapters_1[_i];
                        queryString = "reading_new.".concat(getProviderId(data.provider), ".").concat(slug, ".").concat(chapter.hrefString.replace(/\./g, "_"));
                        existingData = db_1["default"].get(queryString);
                        if (!existingData ||
                            (existingData && existingData.percentage !== 100) ||
                            req.body.action === "remove-read-status") {
                            progressData = (0, getProgressData_1["default"])({
                                current: 500,
                                total: 500,
                                chapterId: chapter.hrefString
                            });
                            // If the action is to remove the read status, override progressData
                            if (req.body.action === "remove-read-status") {
                                progressData = undefined;
                            }
                            else {
                                // Update last
                                lastProgressData = progressData;
                            }
                            // Update db
                            db_1["default"].set(queryString, progressData);
                        }
                        progressDataNew = db_1["default"].get(queryString);
                        if (queryString)
                            lastProgressData = progressDataNew;
                    }
                    lastReadChapter_1 = db_1["default"].get("reading_new.".concat(getProviderId(data.provider), ".").concat(slug, ".last"));
                    if (lastReadChapter_1) {
                        lastReadChapterInRead = db_1["default"].get("reading_new.".concat(getProviderId(data.provider), ".").concat(slug, ".").concat(lastReadChapter_1.chapterId));
                        // The "last" chapter's read data was removed
                        if (!lastReadChapterInRead) {
                            allReading = Object.values(db_1["default"].get("reading_new.".concat(getProviderId(data.provider), ".").concat(slug)));
                            allReading = allReading.sort(function (a, b) { return b.at - a.at; });
                            newLast = allReading.find(function (item) { return item && item.chapterId !== lastReadChapter_1.chapterId; });
                            db_1["default"].set("reading_new.".concat(getProviderId(data.provider), ".").concat(slug, ".last"), newLast);
                        }
                    }
                    // Set last progress data
                    if (lastProgressData)
                        db_1["default"].set("reading_new.".concat(getProviderId(data.provider), ".").concat(slug, ".last"), lastProgressData);
                    readingData = db_1["default"].get("reading_new.".concat(getProviderId(data.provider), ".").concat(slug));
                    remainingData = Object.entries(readingData)
                        .filter(function (v) { return v[1]; })
                        .map(function (v) { return v[0]; });
                    // If the only entry is "last" (and not "1-1" or whatever), remove it
                    if ((remainingData[0] === "last" && remainingData.length <= 1) ||
                        remainingData.length <= 0) {
                        // Remove entry
                        db_1["default"].set("reading_new.".concat(getProviderId(data.provider), ".").concat(slug), undefined);
                        console.info(chalk_1["default"].green("[DB]") +
                            " Removing ".concat(data.provider, "'s ").concat(slug, " from reading"));
                    }
                    res.json({
                        status: 200
                    });
                    return [2 /*return*/];
                }
                res.status(404);
                res.json({
                    status: 404,
                    err: "Something went wrong while fetching information about this manga"
                });
                return [2 /*return*/];
        }
    });
}); });
// Set the lists
router.post("/:provider/:slug/set-lists", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newLists, currentLists, provider, _loop_1, _i, newLists_1, n, otherLists, _loop_2, _a, otherLists_1, deleteFrom;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newLists = req.body.lists;
                return [4 /*yield*/, (0, lists_1.getLists)()];
            case 1:
                currentLists = _b.sent();
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    next();
                    return [2 /*return*/];
                }
                console.info(chalk_1["default"].yellowBright("[LISTS]") +
                    " Setting lists for ".concat(req.params.slug, " (").concat(provider, ") at ").concat(new Date().toLocaleString("it"), ". New lists: ").concat(newLists.map(function (v) { return v.slug; }).join(", ")));
                _loop_1 = function (n) {
                    // Verify the list we're adding to exists
                    if (!currentLists.find(function (l) { return l.slug === n.slug; })) {
                        // Add new list
                        currentLists.push({
                            slug: n.slug,
                            name: n.name,
                            entries: [],
                            showOnHome: false
                        });
                    }
                    // Add to list
                    var list = currentLists.find(function (l) { return l.slug === n.slug; });
                    if (!list.entries.find(function (entry) { return entry.slug === req.params.slug; }) &&
                        !list.byCreator) {
                        list.entries.push({
                            slug: req.params.slug,
                            provider: getProviderId(provider)
                        });
                        list.last = Date.now();
                        console.info(chalk_1["default"].green("[LISTS]") +
                            " Adding ".concat(req.params.slug, " (").concat(provider, ") to ").concat(list.name, " (").concat(list.slug, ") at ").concat(new Date().toLocaleString("it")));
                    }
                };
                for (_i = 0, newLists_1 = newLists; _i < newLists_1.length; _i++) {
                    n = newLists_1[_i];
                    _loop_1(n);
                }
                otherLists = currentLists.filter(function (l) { return !newLists.find(function (newList) { return newList.slug === l.slug; }) && !l.byCreator; });
                _loop_2 = function (deleteFrom) {
                    // Remove every entry from this list since it wasn't mentioned in the updated list
                    var isChanged = false;
                    deleteFrom.entries = deleteFrom.entries.filter(function (l) {
                        var isRemoveableEntry = l.slug === req.params.slug;
                        if (isRemoveableEntry) {
                            // When it's the same slug, that means it's getting removed
                            isChanged = true;
                            console.info(chalk_1["default"].red("[LISTS]") +
                                " Removing ".concat(req.params.slug, " (").concat(provider, ") from ").concat(deleteFrom.name, " (").concat(deleteFrom.slug, ") at ").concat(new Date().toLocaleString("it")));
                            return false;
                        }
                        return true;
                    });
                    if (isChanged)
                        deleteFrom.last = Date.now();
                };
                for (_a = 0, otherLists_1 = otherLists; _a < otherLists_1.length; _a++) {
                    deleteFrom = otherLists_1[_a];
                    _loop_2(deleteFrom);
                }
                // Remove empty lists
                currentLists = currentLists.filter(function (list) { return list.entries.length > 0; });
                // Sort lists
                currentLists = currentLists.sort(function (a, b) { var _a, _b; return ((_a = b.last) !== null && _a !== void 0 ? _a : -1) - ((_b = a.last) !== null && _b !== void 0 ? _b : -1); });
                // Store new value
                db_1["default"].set("lists", currentLists.filter(function (l) { return !l.byCreator; }).map(lists_2.removeData));
                res.json({
                    status: 200
                });
                return [2 /*return*/];
        }
    });
}); });
router.post("/:provider/:slug/hide-series", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        db_1["default"].set("hide_read.".concat(getProviderId(req.params.provider), ".").concat(req.params.slug), true);
        res.json({
            status: 200
        });
        return [2 /*return*/];
    });
}); });
router.post("/:provider/:slug/:chapter/set-progress", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, slug, provider, progressData, data, storeNsfw;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chapterId = req.params.chapter;
                slug = req.params.slug;
                if (!req.body.current || !req.body.total) {
                    res.status(403);
                    res.json({
                        status: 401,
                        err: "Missing current or total"
                    });
                    return [2 /*return*/];
                }
                provider = getProviderName(req.params.provider.toLowerCase());
                if (!provider) {
                    next();
                    return [2 /*return*/];
                }
                progressData = (0, getProgressData_1["default"])(__assign(__assign({}, req.body), { chapterId: chapterId }));
                return [4 /*yield*/, (0, updateManga_1["default"])(provider, req.params.slug)];
            case 1:
                data = _a.sent();
                if (data.success) {
                    storeNsfw = db_1["default"].get("settings.store-nsfw") === "yes";
                    if (((storeNsfw && data.constant.nsfw) || !data.constant.nsfw) &&
                        !process.env.IGNOREREADING) {
                        // Update db
                        db_1["default"].set("hide_read.".concat(getProviderId(provider), ".").concat(slug), false);
                        db_1["default"].set("reading_new.".concat(getProviderId(provider), ".").concat(slug, ".").concat(chapterId.toString().replace(/\./g, "_")), progressData);
                        db_1["default"].set("reading_new.".concat(getProviderId(provider), ".").concat(slug, ".last"), progressData);
                    }
                }
                res.json({
                    status: 200
                });
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
function setColors(data, slug) {
    return __awaiter(this, void 0, void 0, function () {
        var lastChapter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, getMangaProgress_1["default"])(data.provider, slug)];
                case 1:
                    lastChapter = _a.sent();
                    data.data.chapters.forEach(function (ch) {
                        var _a;
                        if (ch.progress)
                            ch.progress.percentageColor =
                                ch.progress && ((_a = ch.progress) === null || _a === void 0 ? void 0 : _a.chapterId) === (lastChapter === null || lastChapter === void 0 ? void 0 : lastChapter.chapterId)
                                    ? "recent"
                                    : "neutral";
                    });
                    return [2 /*return*/];
            }
        });
    });
}
