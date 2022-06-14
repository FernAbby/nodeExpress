module.exports = {
    "presets": [
        ["@babel/preset-env", {
            targets: {
                chrome: "58",
            }
        }]
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }],
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }],
    ],
};
