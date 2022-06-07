"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Import modules
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var body_parser_1 = __importDefault(require("body-parser"));
// Import custom modules
var routers_1 = __importDefault(require("./routers"));
var getIconSrc_1 = __importDefault(require("./util/getIconSrc"));
var manga_page_1 = require("./routers/manga-page");
var app = (0, express_1["default"])();
// Set up view engine
app.engine("handlebars", (0, express_handlebars_1["default"])({
    helpers: {
        stringify: function (v) {
            return JSON.stringify(v);
        },
        /**
         * Get progress string to show on page, like 23%
         */
        getProgressString: function (manga) {
            var _a, _b;
            if (manga.progress && manga.success) {
                var curChapter = manga.data.chapters.find(function (c) { return c.hrefString === manga.progress.chapterId; });
                return ((_b = (curChapter === null || curChapter === void 0 ? void 0 : curChapter.label) +
                    (typeof ((_a = manga === null || manga === void 0 ? void 0 : manga.progress) === null || _a === void 0 ? void 0 : _a.percentage) !== "undefined"
                        ? " (".concat(manga.progress.percentage, "%)")
                        : "")) !== null && _b !== void 0 ? _b : "Chapter not found");
            }
            return "Not started yet";
        },
        /**
         * Get icon for each scraper
         */
        getScraperIcon: function (provider) {
            var _a;
            var icons = {
                mangasee: "https://mangasee123.com/media/favicon.png",
                mangadex: "https://mangadex.org/images/misc/navbar.svg",
                mangadex5: "https://mangadex.siteunblocked.info/images/misc/navbar.svg?3",
                rco: "/provider/rco.png",
                nhentai: "https://nhentai.to/img/logo.650c98bbb08e.svg",
                nhentainet: "https://nhentai.net/favicon.ico",
                manganelo: "https://manganato.com/favicon-96x96.png",
                comicextra: "https://www.comicextra.com/images/site/front/logo.png",
                mangahere: "/proxy-image?url=https://www.mangahere.cc/favicon.ico",
                guya: "https://guya.moe/static/logo_small.png"
            };
            return (_a = icons[provider]) !== null && _a !== void 0 ? _a : "/icons/main-on-white.png";
        },
        /**
         * Generate HREF for links in-app
         */
        genLink2: function (provider, slug, hrefString, chapter) {
            if (provider === void 0) { provider = "mangasee"; }
            if (hrefString === void 0) { hrefString = null; }
            if (chapter === void 0) { chapter = -1; }
            var href = "/".concat((0, manga_page_1.getProviderId)(provider), "/").concat(slug, "/");
            var seasonLink = typeof hrefString === "string" || typeof hrefString === "number"
                ? hrefString
                : "";
            if (typeof chapter === "number" && chapter !== -1)
                seasonLink = "".concat(hrefString, "-").concat(chapter); // Fallback stuff // TODO: Figure this out. This is related to reading at manga-card.handlebars, line 31
            return "".concat(href).concat(seasonLink);
        },
        /**
         * Compare season/chapter to other season/chapter and get relevant classes
         */
        isCurrentChapter: function (season1, season2, chapter1, chapter2) {
            return season1 === season2 && chapter1 === chapter2
                ? "current-chapter badge-background"
                : "";
        },
        /**
         * Used for small-manga in the sidebar
         * Returns relevant classes to maybe make it blue
         */
        checkSmallHighlight: function (mangaSlug, currentPage) {
            return mangaSlug === currentPage ? "currentManga badge-background" : "";
        },
        /**
         * Get dd-mm-yyyy format for chapter's date
         * Used in chapter list
         */
        getChapterDate: function (chapter) {
            function pad(v, amount) {
                if (amount === void 0) { amount = 2; }
                return v.toString().padStart(amount, "0");
            }
            var d = new Date(chapter.date);
            return "".concat(pad(d.getDate()), "-").concat(pad(d.getMonth() + 1), "-").concat(pad(d.getFullYear(), 4));
        },
        /**
         * Get chapter's existing progress
         * If it's over 90%, return page number 1 so that people can start the chapter over again
         */
        getPageProgress: function (progress) {
            if (!progress)
                return false;
            return progress.percentage < 90 ? progress.current : 1;
        },
        /**
         * If statement, used for development
         * AFAIK this is just for the label in the bottom left
         */
        ifDev: function (options) {
            return process.env.dev ? options.fn(this) : options.inverse(this);
        },
        /**
         * Get chapter's name, or label
         * Used in the main cards
         */
        getChapterName: function (progress, manga) {
            if (!progress)
                return "shrug";
            var current = manga.data.chapters.find(function (v) { return v.hrefString === progress.chapterId; });
            return current ? current.label : "Unknown chapter";
        },
        /**
         * If statement for checking if the list is by the creator
         */
        ifNotByCreator: function (list, options) {
            return list.byCreator ? options.inverse() : options.fn();
        },
        getIconSrc: getIconSrc_1["default"]
    }
}));
app.set("view engine", "handlebars");
app.set("view options", {
    layout: "main"
});
// Bodyparser
app.use(body_parser_1["default"].json());
// Routers
app.use("/", routers_1["default"].home);
app.use("/search", routers_1["default"].search);
app.use("/lists", routers_1["default"].lists);
app.use("/", routers_1["default"].settings);
// Static assets
app.use(express_1["default"].static("public"));
// More routers
app.use("/", routers_1["default"].mangaPage);
app.use("*", routers_1["default"].notFound);
exports["default"] = app;
