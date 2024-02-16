module.exports = {
    apps: [
        {
            name: "aud-jpy-bot",
            script: "ts-node",
            args: "src/index.ts",
            watch: true,
            interpreter: "none",
        },
    ],
};
