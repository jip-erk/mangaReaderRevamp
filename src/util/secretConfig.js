"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var example_secret_config_json_1 = __importDefault(require("../example.secret-config.json"));
var secretConfig;
var configPath = "./data/secret-config.json";
var oldPath = __dirname.split("/").slice(0, -1).join("/") + "/secret-config.json"; // Ew
if (!fs_1["default"].existsSync(configPath)) {
    // Set default secret config
    var newConfig = void 0;
    // Find new config to set. Either the existing one inside this directory or the example file
    if (fs_1["default"].existsSync(oldPath)) {
        console.error(chalk_1["default"].red("[SECRET]") +
            " Found secret-config.json in the `src` folder. This location is deprecated and is moved to `~/.adolla/secret-config.json`.");
        newConfig = fs_1["default"].readFileSync(oldPath, "utf-8");
        fs_1["default"].renameSync(oldPath, "src/secret-config-archived.json");
    }
    else {
        newConfig = JSON.stringify(example_secret_config_json_1["default"]);
    }
    fs_1["default"].writeFileSync(configPath, newConfig);
}
else if (fs_1["default"].existsSync(oldPath)) {
    console.error(chalk_1["default"].red("[SECRET]") +
        " Found secret-config.json in the `src` folder. This location is deprecated and is moved to `~/.adolla/secret-config.json`.");
    fs_1["default"].renameSync(oldPath, "secret-config-archived.json");
}
if (fs_1["default"].existsSync(configPath)) {
    secretConfig = JSON.parse(fs_1["default"].readFileSync(configPath, "utf-8"));
}
else {
    console.error(chalk_1["default"].red("[SECRET]") + " No secret-config provided.");
}
exports["default"] = secretConfig || null;
