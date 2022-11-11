const basePath = ""
const {rename, writeFile} = require("fs/promises");
// const non4k = data.map(i => i.SourceFile);
// const {concat, intersectionBy} = require("lodash");

// const combined = concat(require("./4k.json").map(i => i.SourceFile), require("./non4k.json").map(i => i.SourceFile));
// console.log(combined.length);
// console.log(data.length);
// // console.log(intersectionBy(data, combined, (a, b) => a.SourceFile === b.SourceFile));
// console.log(data.filter(x => !combined.includes(x)));

(async() => {
    for(const row of require("./non4k.json")) {
        // console.log(`${basePath}${row.SourceFile.replace("./", "/")}`);
        await rename(`${basePath}${row.SourceFile.replace("./", "/")}`, `${basePath}/non4k${row.SourceFile.replace("./", "/")}`);
    }
})();

