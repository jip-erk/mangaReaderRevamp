"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Import used modules
var fs_1 = __importDefault(require("fs"));
// Import and export data
var data = JSON.parse(fs_1["default"].readFileSync("./data.json", "utf-8"));
fs_1["default"].writeFileSync("data-formatted.json", JSON.stringify(data, null, "\t"));
// OK lol
console.info("OK");
