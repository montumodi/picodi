const unzipper = require("unzipper");
const fs = require("fs");
const { readdir, unlink } = require("fs/promises");
const basePath = "";
(async() => {
    const files = await readdir(basePath);
    console.log(JSON.stringify(files));
})();



