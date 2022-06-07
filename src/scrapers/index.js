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
exports.scrapers = exports.Guya = exports.Mangadex5 = exports.Mangahere = exports.nhentainet = exports.nhentai = exports.ComicExtra = exports.Manganelo = exports.RCO = exports.Mangasee = exports.getDataFromURL = exports.error = void 0;
var node_fetch_extra_1 = __importDefault(require("node-fetch-extra"));
/**
 * Generate error object easily
 * @param status The HTTP status code
 * @param err A string describing the error
 */
function error(status, err) {
    if (status === void 0) { status = -1; }
    if (err === void 0) { err = "Unknown"; }
    return {
        status: status,
        err: err,
        success: false
    };
}
exports.error = error;
function getDataFromURL(url) {
    return __awaiter(this, void 0, void 0, function () {
        var retryCount, isValid, data, dataReq, res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    retryCount = 0;
                    isValid = false;
                    data = {};
                    _a.label = 1;
                case 1:
                    if (!(!isValid && retryCount < 4)) return [3 /*break*/, 12];
                    return [4 /*yield*/, (0, node_fetch_extra_1["default"])(url)];
                case 2:
                    dataReq = _a.sent();
                    if (!(dataReq.status === 204)) return [3 /*break*/, 3];
                    // Empty result.
                    // Just end the loop
                    isValid = true;
                    return [2 /*return*/, data];
                case 3: return [4 /*yield*/, dataReq.text()];
                case 4:
                    res = (data = _a.sent());
                    if (!(!res.startsWith("<") && res.trim().length > 0)) return [3 /*break*/, 9];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 6, , 8]);
                    data = JSON.parse(data);
                    isValid = true;
                    return [3 /*break*/, 8];
                case 6:
                    e_1 = _a.sent();
                    // Oh well
                    retryCount++;
                    return [4 /*yield*/, sleep(100 * Math.floor(Math.random() * 50))];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 11];
                case 9:
                    retryCount++;
                    return [4 /*yield*/, sleep(100 * Math.floor(Math.random() * 50))];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [3 /*break*/, 1];
                case 12: return [2 /*return*/, data];
            }
        });
    });
}
exports.getDataFromURL = getDataFromURL;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
// Import Mangasee
var mangasee_1 = __importDefault(require("./mangasee"));
exports.Mangasee = mangasee_1["default"];
// Import MangaDex
// import MangadexInstance from "./mangadex";
// export const Mangadex = MangadexInstance;
// Import ReadComicsOnline
var rco_1 = __importDefault(require("./rco"));
exports.RCO = rco_1["default"];
// Import Manganelo
var manganelo_1 = __importDefault(require("./manganelo"));
exports.Manganelo = manganelo_1["default"];
// Import ComicExtra
var comicextra_1 = __importDefault(require("./comicextra"));
exports.ComicExtra = comicextra_1["default"];
// Import nhentai
var nhentai_1 = __importDefault(require("./nhentai"));
exports.nhentai = nhentai_1["default"];
// Import nhentai.net
var nhentainet_1 = __importDefault(require("./nhentainet"));
exports.nhentainet = nhentainet_1["default"];
// Import Mangahere
var mangahere_1 = __importDefault(require("./mangahere"));
exports.Mangahere = mangahere_1["default"];
// Import MangaDex V5
var mangadex_v5_1 = __importDefault(require("./mangadex-v5"));
exports.Mangadex5 = mangadex_v5_1["default"];
// Import Guya.moe
var guya_1 = __importDefault(require("./guya"));
exports.Guya = guya_1["default"];
exports.scrapers = {
    Mangasee: exports.Mangasee,
    Mangadex5: exports.Mangadex5,
    Manganelo: exports.Manganelo,
    Mangahere: exports.Mangahere,
    RCO: exports.RCO,
    ComicExtra: exports.ComicExtra,
    nhentai: exports.nhentai,
    nhentainet: exports.nhentainet,
    Guya: exports.Guya
};
