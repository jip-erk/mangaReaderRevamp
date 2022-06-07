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
exports.getLists = void 0;
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
var updateManga_1 = __importDefault(require("../util/updateManga"));
var db_1 = __importDefault(require("../db"));
// Get "recommended" list
var recommendedLists = [];
function updateRecommended() {
    return __awaiter(this, void 0, void 0, function () {
        var suggestionsUrl, recommended;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.info(chalk_1["default"].yellowBright("[RECOMMENDATIONS]") +
                        " Updating recommendations at ".concat(new Date().toLocaleString()));
                    suggestionsUrl = "https://gist.githubusercontent.com/JipFr/17fabda0f0515965cbe1c73b75b7ed71/raw";
                    return [4 /*yield*/, (0, node_fetch_extra_1["default"])(suggestionsUrl)];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2:
                    recommended = _a.sent();
                    recommendedLists = recommended.map(function (recommendedItem) {
                        recommendedItem.byCreator = true;
                        return recommendedItem;
                    });
                    console.info(chalk_1["default"].green("[RECOMMENDATIONS]") + " Updated recommendations");
                    return [2 /*return*/];
            }
        });
    });
}
updateRecommended();
setInterval(updateRecommended, 1e3 * 60 * 60 * 12); // Update every 12 hours
function getLists(justHome) {
    if (justHome === void 0) { justHome = false; }
    return __awaiter(this, void 0, void 0, function () {
        var lists, updatedLists;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lists = db_1["default"].get("lists");
                    // Remove creator items from db results. There shouldn't be any, but I hope that this is what fixes Destruc7i0n's bug.
                    lists = lists.filter(function (l) { return !l.byCreator; });
                    lists = lists.filter(function (l) { return (justHome && l.showOnHome) || !justHome; });
                    updatedLists = Object.assign([], __spreadArray(__spreadArray([], recommendedLists, true), lists, true));
                    updatedLists = updatedLists.filter(function (l) { return (justHome ? l.showOnHome : true); });
                    return [4 /*yield*/, Promise.all(updatedLists.map(function (list) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        // Add data to all fields
                                        _a = list;
                                        return [4 /*yield*/, Promise.all(list.entries.map(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                                                var _a;
                                                var _b;
                                                return __generator(this, function (_c) {
                                                    switch (_c.label) {
                                                        case 0:
                                                            _a = entry;
                                                            return [4 /*yield*/, (0, updateManga_1["default"])((_b = entry.provider) !== null && _b !== void 0 ? _b : "mangasee", entry.slug)];
                                                        case 1:
                                                            _a.data = _c.sent();
                                                            return [2 /*return*/, entry];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        // Add data to all fields
                                        _a.entries = _b.sent();
                                        // Check for failed requests
                                        // list.entries = list.entries.filter((entry) => {
                                        // 	if (!(entry.data.success || !filterUndefineds)) {
                                        // 		console.info(
                                        // 			chalk.red("[LISTS]") +
                                        // 				` ${entry.slug} (${entry.provider}) has failed to load in ${
                                        // 					list.name
                                        // 				} (${list.slug}) at ${new Date().toLocaleString("it")}`
                                        // 		);
                                        // 	}
                                        // 	return entry.data.success || !filterUndefineds;
                                        // });
                                        return [2 /*return*/, list];
                                }
                            });
                        }); }))];
                case 1:
                    // Add data to each and every entry
                    updatedLists = _a.sent();
                    // Return both database items and creator's suggestions
                    return [2 /*return*/, updatedLists];
            }
        });
    });
}
exports.getLists = getLists;
