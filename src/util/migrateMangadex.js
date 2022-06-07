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
exports.doMangadexMigration = void 0;
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var db_1 = __importDefault(require("../db"));
function doMangadexMigration() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var reading, mangadex5, md, mdSeriesIds, newIds, mappedIds, _i, newIds_1, newIdObj, legacyChapterIds, newChapterIds, seriesId, oldSeriesId, chapterIds, _b, newChapterIds_1, newChapterData, chapterId, oldChapterId, legacyMd, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    reading = db_1["default"].get("reading_new");
                    mangadex5 = (_a = db_1["default"].get("reading_new.mangadex5")) !== null && _a !== void 0 ? _a : {};
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 12, , 13]);
                    if (!reading.mangadex) return [3 /*break*/, 11];
                    md = reading.mangadex;
                    mdSeriesIds = Object.keys(md).map(function (n) { return Number(n); });
                    console.info(chalk_1["default"].green("[MANGADEX]") + " Migrating series:", mdSeriesIds);
                    return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://api.mangadex.org/legacy/mapping", {
                            method: "POST",
                            body: JSON.stringify({
                                type: "manga",
                                ids: mdSeriesIds
                            })
                        }).then(function (d) { return d.json(); })];
                case 2:
                    newIds = _c.sent();
                    mappedIds = {};
                    _i = 0, newIds_1 = newIds;
                    _c.label = 3;
                case 3:
                    if (!(_i < newIds_1.length)) return [3 /*break*/, 10];
                    newIdObj = newIds_1[_i];
                    if (!(newIdObj.result === "ok")) return [3 /*break*/, 9];
                    // Get legacy chapter IDs
                    mappedIds[newIdObj.data.attributes.legacyId] = newIdObj.data.id;
                    legacyChapterIds = Object.keys(reading.mangadex[newIdObj.data.attributes.legacyId])
                        .map(Number)
                        .filter(Boolean);
                    return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://api.mangadex.org/legacy/mapping", {
                            method: "POST",
                            body: JSON.stringify({
                                type: "chapter",
                                ids: legacyChapterIds
                            })
                        }).then(function (d) { return d.text(); })];
                case 4:
                    newChapterIds = _c.sent();
                    if (!!newChapterIds.startsWith("<")) return [3 /*break*/, 5];
                    // HTML... Yay....
                    newChapterIds = JSON.parse(newChapterIds);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, (0, node_fetch_extra_1["default"])("https://api.mangadex.org/legacy/mapping", {
                        method: "POST",
                        body: JSON.stringify({
                            type: "chapter",
                            ids: legacyChapterIds
                        })
                    }).then(function (d) { return d.json(); })];
                case 6:
                    newChapterIds = _c.sent();
                    _c.label = 7;
                case 7:
                    seriesId = newIdObj.data.attributes.newId;
                    oldSeriesId = newIdObj.data.attributes.legacyId;
                    console.info(chalk_1["default"].green("[MANGADEX]") +
                        " Migrating manga series ".concat(oldSeriesId, " -> ").concat(seriesId));
                    mangadex5[seriesId] = {}; // Prepare series object
                    chapterIds = {};
                    // We have received the updated IDs for chapters
                    // Now reassign the old data
                    for (_b = 0, newChapterIds_1 = newChapterIds; _b < newChapterIds_1.length; _b++) {
                        newChapterData = newChapterIds_1[_b];
                        if (newChapterData.result === "ok") {
                            chapterId = newChapterData.data.attributes.newId;
                            oldChapterId = newChapterData.data.attributes.legacyId;
                            // console.info(
                            // 	chalk.green("[MANGADEX]") +
                            // 		` Migrating chapter ${oldChapterId} -> ${chapterId}`
                            // );
                            chapterIds[oldChapterId] = chapterId;
                            mangadex5[seriesId][chapterId] =
                                reading.mangadex[oldSeriesId][oldChapterId];
                            mangadex5[seriesId][chapterId].chapterId = chapterId;
                        }
                    }
                    // Update last to fit with new IDs
                    mangadex5[seriesId].last = reading.mangadex[oldSeriesId].last;
                    mangadex5[seriesId].last.chapterId =
                        chapterIds[reading.mangadex[oldSeriesId].last.chapterId] ||
                            reading.mangadex[oldSeriesId].last.chapterId;
                    console.info(chalk_1["default"].green("[MANGADEX]") +
                        " Series (".concat(oldSeriesId, " -> ").concat(seriesId, ") \"last\": from ").concat(reading.mangadex[oldSeriesId].last.chapterId, " -> ").concat(mangadex5[seriesId].last.chapterId, "."));
                    return [4 /*yield*/, sleep(500)];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10:
                    // Store new mangadex object
                    db_1["default"].set("reading_new.mangadex5", mangadex5);
                    legacyMd = db_1["default"].get("reading_new.mangadex");
                    db_1["default"].set("other.legacy-md", legacyMd);
                    db_1["default"].set("reading_new.mangadex", undefined);
                    _c.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    e_1 = _c.sent();
                    console.error(chalk_1["default"].red("[MANGADEX]"), e_1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.doMangadexMigration = doMangadexMigration;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
