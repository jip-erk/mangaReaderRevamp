"use strict";
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
var db_1 = __importDefault(require("../db"));
var getMangaProgress_1 = require("../util/getMangaProgress");
var updateManga_1 = __importDefault(require("../util/updateManga"));
function getReading(maxResults) {
    if (maxResults === void 0) { maxResults = Infinity; }
    return __awaiter(this, void 0, void 0, function () {
        var readingManga, allProviders, readingMeta, _i, allProviders_1, provider, _a, _b, slug, reading;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    readingManga = db_1["default"].get("reading_new");
                    allProviders = Object.keys(readingManga);
                    readingMeta = [];
                    for (_i = 0, allProviders_1 = allProviders; _i < allProviders_1.length; _i++) {
                        provider = allProviders_1[_i];
                        if (!readingManga[provider])
                            continue;
                        for (_a = 0, _b = Object.keys(readingManga[provider]); _a < _b.length; _a++) {
                            slug = _b[_a];
                            // Check if it actually has any content
                            // If it's "mark as unread" it'll be undefined
                            // Not having an if statement for that would still add it
                            // Obviously, we don't want that
                            if (readingManga[provider][slug] &&
                                Object.keys(readingManga[provider][slug]).length > 0) {
                                if (db_1["default"].get("hide_read.".concat(provider, ".").concat(slug)) !== true) {
                                    readingMeta.push({
                                        provider: provider,
                                        slug: slug
                                    });
                                }
                            }
                        }
                    }
                    // Sort data
                    readingMeta = readingMeta.sort(function (b, a) {
                        var _a, _b;
                        return ((_a = readingManga[a.provider][a.slug].last) === null || _a === void 0 ? void 0 : _a.at) -
                            ((_b = readingManga[b.provider][b.slug].last) === null || _b === void 0 ? void 0 : _b.at);
                    });
                    // Slice down to max results
                    readingMeta = readingMeta.slice(0, maxResults);
                    return [4 /*yield*/, Promise.all(readingMeta.map(function (obj) { return __awaiter(_this, void 0, void 0, function () {
                            var manga;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, (0, updateManga_1["default"])((_a = obj.provider) !== null && _a !== void 0 ? _a : "mangasee", obj.slug)];
                                    case 1:
                                        manga = _b.sent();
                                        return [4 /*yield*/, (0, getMangaProgress_1.setMangaProgress)(manga)];
                                    case 2:
                                        manga = _b.sent();
                                        return [2 /*return*/, manga];
                                }
                            });
                        }); }))];
                case 1:
                    reading = _c.sent();
                    // TypeScript doesn't typeguard .filter :/
                    reading = reading
                        .filter(function (e) { return e.success === true; })
                        .sort(function (a, b) {
                        var _a, _b;
                        return (b.success && b.progress ? (_a = b.progress) === null || _a === void 0 ? void 0 : _a.at : 0) -
                            (a.success && a.progress ? (_b = a.progress) === null || _b === void 0 ? void 0 : _b.at : 0);
                    });
                    return [2 /*return*/, reading];
            }
        });
    });
}
exports["default"] = getReading;
