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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var jipdb_1 = __importDefault(require("jipdb"));
var chalk_1 = __importDefault(require("chalk"));
// Configure DB's default values
var defaults = {
    reading_new: {},
    other: {},
    notified: {},
    lists: [],
    settings: {
        icon: "White",
        "show-nsfw": "no",
        "store-nsfw": "no"
    }
};
// Iniate new DB
var homePath = "./data";
var dbPath = path_1["default"].join(homePath, "data.json");
if (!fs_1["default"].existsSync(homePath)) {
    fs_1["default"].mkdirSync(homePath);
}
// Move db
if (fs_1["default"].existsSync("./data.json")) {
    var data = fs_1["default"].readFileSync("./data.json", "utf-8");
    fs_1["default"].writeFileSync(dbPath, data);
    fs_1["default"].renameSync("data.json", "data-archived.json");
    console.log("MOVED! data.json");
}
// Make db
var db = new jipdb_1["default"](dbPath, defaults);
db.set("data_cache", undefined);
// Update reading format
var oldReading = db.get("reading");
if (oldReading) {
    console.info(chalk_1["default"].green("[DB]") + " Storing old reading data");
    // Store old data
    fs_1["default"].writeFileSync("./old-reading.json", JSON.stringify(oldReading, null, "\t"));
    // Get new format for reading
    var newReading = {
        mangasee: {}
    };
    console.info(chalk_1["default"].yellowBright("[DB]") + " Start converting old reading to new");
    // Generate new objects
    for (var _i = 0, _b = Object.keys(oldReading); _i < _b.length; _i++) {
        var slug = _b[_i];
        newReading.mangasee[slug] = __assign({}, ((_a = newReading.mangasee[slug]) !== null && _a !== void 0 ? _a : {}));
        for (var _c = 0, _d = Object.keys(oldReading[slug]); _c < _d.length; _c++) {
            var chapter = _d[_c];
            var d = oldReading[slug][chapter];
            console.info(chalk_1["default"].green("[DB]") +
                " Converting old reading to new: ".concat(slug, "'s ").concat(chapter));
            newReading.mangasee[slug][chapter] = {
                current: d.current,
                total: d.total,
                at: d.at,
                chapterId: "".concat(d.season, "-").concat(d.chapter)
            };
        }
    }
    console.info(chalk_1["default"].green("[DB]") + " Converted old reading to new");
    // Store new object, get rid of old
    db.set("reading", undefined);
    db.set("reading_new", newReading);
    // Since this is the old data format, also clear the old data
    db.set("manga_cache", undefined);
    console.info(chalk_1["default"].green("[DB]") + " Removed old manga cache");
}
// Export database for the entire app's use
exports["default"] = db;
