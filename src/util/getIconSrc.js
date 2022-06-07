"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.iconNamesReversed = exports.iconNames = void 0;
var db_1 = __importDefault(require("../db"));
exports.iconNames = {
    "main-on-white": "White",
    "white-on-gold": "Gold",
    "white-on-blue": "Ocean",
    "white-on-dark": "Night",
    "white-on-green": "Forest",
    "white-on-red": "Crimson",
    "white-on-black": "Black"
};
exports.iconNamesReversed = Object.fromEntries(Object.entries(exports.iconNames).map(function (v) { return v.reverse(); }));
/**
 * Get source for app icon
 */
function getIconSrc() {
    var selectedName = db_1["default"].get("settings.icon");
    return "/icons/".concat(exports.iconNamesReversed[selectedName] || "main-on-white", ".png");
}
exports["default"] = getIconSrc;
