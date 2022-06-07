"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
var telebot_1 = __importDefault(require("telebot"));
var secretConfig_1 = __importDefault(require("../util/secretConfig"));
var botToken = (_a = process.env.TELEGRAMTOKEN) !== null && _a !== void 0 ? _a : (_b = secretConfig_1["default"] === null || secretConfig_1["default"] === void 0 ? void 0 : secretConfig_1["default"].telegram) === null || _b === void 0 ? void 0 : _b.bot;
var telegramUser = (_c = process.env.TELEGRAMUSER) !== null && _c !== void 0 ? _c : (_d = secretConfig_1["default"] === null || secretConfig_1["default"] === void 0 ? void 0 : secretConfig_1["default"].telegram) === null || _d === void 0 ? void 0 : _d.user;
var bot = null;
if (botToken) {
    bot = new telebot_1["default"](botToken);
    bot.start();
    bot.on("text", function (message) {
        console.info("The Telegram bot has received a message from ID: ".concat(message.from.id, " (@").concat(message.from.username, ")"));
    });
}
else {
    console.error(chalk_1["default"].red("[SECRET]") +
        " There is no Telegram bot token in the secret-config. As a result of that, you won't be notified of new chapters through Telegram.");
}
var Bot = /** @class */ (function () {
    function Bot() {
    }
    Bot.prototype.get = function () {
        return bot !== null && bot !== void 0 ? bot : null;
    };
    Bot.prototype.send = function (message) {
        var bot = this.get();
        if (bot && telegramUser) {
            bot.sendMessage(telegramUser, message, {
                parseMode: "markdown"
            });
        }
        else {
            console.error(telegramUser
                ? "[TELEGRAM] No bot token found"
                : "[TELEGRAM] No user ID found");
        }
    };
    return Bot;
}());
exports["default"] = new Bot();
