const got = require("got");
const fs = require("fs");
let mediaItems = [];
async function download(token) {
  console.log("Hitting photos api", token);
  const response = await got.post("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
    "headers": {
      "Authorization": ""
    },
    "body": JSON.stringify({
      "pageSize": 100,
      "pageToken": token,
      "filters": {
        "mediaTypeFilter": {
          "mediaTypes": [
            "PHOTO"
          ]
        }
      }
    })
  }).json();
  if (response.mediaItems) {
    mediaItems = mediaItems.concat(response.mediaItems);
    console.log(mediaItems.length);
    // await Promise.all(response.mediaItems.map(mediaItem => {
    //   console.log(mediaItem);
    //   return got.stream(mediaItem.baseUrl).pipe(fs.createWriteStream(__dirname + `/files/${mediaItem.id}.jpg`))
    // }));
    if (response.nextPageToken) {
      return download(response.nextPageToken);
    }
  }
  console.log(JSON.stringify(mediaItems.map(item => ({"id": item.id, "fileName": item.filename}))));
  return "finished";
}

(async () => {
  await download();
})();

