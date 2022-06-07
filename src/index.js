"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
exports.__esModule = true;
// Import modules
var chalk_1 = __importDefault(require("chalk"));
// Log facts
console.info(chalk_1["default"].green("[SERVER]") + " Starting up at ".concat(new Date().toLocaleString("it")));
// Configure environment
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Require important things
var web_1 = __importDefault(require("./web"));
var backup_1 = __importDefault(require("./backup"));
// Import method to update all cache
var updatePopularCache_1 = __importDefault(require("./util/updatePopularCache"));
// Import config
var config_json_1 = __importDefault(require("./config.json"));
var secretConfig_1 = __importDefault(require("./util/secretConfig"));
// Start all
web_1["default"].listen((_c = (_b = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : secretConfig_1["default"].port) !== null && _b !== void 0 ? _b : config_json_1["default"].http.port) !== null && _c !== void 0 ? _c : 80, function () {
    var _a;
    console.info(chalk_1["default"].green("[SERVER]") +
        " Web server is live on localhost:".concat((_a = process.env.PORT) !== null && _a !== void 0 ? _a : config_json_1["default"].http.port));
    backup_1["default"].start();
    updatePopularCache_1["default"].start();
});
