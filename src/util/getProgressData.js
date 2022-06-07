"use strict";
// Used to get progress data.
// This data will be put in the database.
// This was put in /util because it's used more than once. Putting it in the router would be gross
exports.__esModule = true;
function getProgressData(_a) {
    var current = _a.current, total = _a.total, chapterId = _a.chapterId, _b = _a.at, at = _b === void 0 ? Date.now() : _b;
    return {
        current: current,
        total: total,
        percentage: Math.round((current / total) * 100),
        at: at,
        chapterId: chapterId
    };
}
exports["default"] = getProgressData;
