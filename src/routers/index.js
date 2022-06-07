"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var home_1 = __importDefault(require("./home"));
var manga_page_1 = __importDefault(require("./manga-page"));
var search_1 = __importDefault(require("./search"));
var not_found_1 = __importDefault(require("./not-found"));
var lists_1 = __importDefault(require("./lists"));
var settings_1 = __importDefault(require("./settings"));
exports["default"] = {
    home: home_1["default"],
    mangaPage: manga_page_1["default"],
    search: search_1["default"],
    notFound: not_found_1["default"],
    lists: lists_1["default"],
    settings: settings_1["default"]
};
