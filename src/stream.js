const got = require("got");
const fs = require("fs");

async function download(token) {
  console.log("Hitting photos api", token);
  const response = await got.post("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
    "headers": {
      "Authorization": "Bearer "
    },
    "body": JSON.stringify({
      "pageSize": 100,
      "pageToken": token,
      "albumId": "AKkJ-GFXQsISYVQhwgfa7XZ8VAaYezO0cbnjp2OesTVImbExulYEY4pZWfrUGFaL800Y-15xRi1w"
    })
  }).json();
  await Promise.all(response.mediaItems.map(mediaItem => {
    return got.stream(mediaItem.baseUrl).pipe(fs.createWriteStream(__dirname + `/files/${mediaItem.id}.jpg`))
  }));
  if (response.nextPageToken) {
    return download(response.nextPageToken);
  }
  console.log("finished");
  return "finished";
}

(async () => {
  await download();
})();

