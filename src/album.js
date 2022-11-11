const got = require("got");
const data = require("../out.json");
const {chunk} = require("./chunk");
const chunkedData = chunk(data.map(i => i.id), 50);
const token = "";
async function createAlbum() {
    console.log("Creating album");
    const response = await got.post("https://photoslibrary.googleapis.com/v1/albums", {
      "headers": {
        "Authorization": token
      },
      "body": JSON.stringify({
        "album": {
          "title": "all-the-photos"
        }
      })
    }).json();
    console.log("Album created", response.id);
    return response.id;
  }

  async function addMediaToAlbum(albumId, mediaItems) {
    console.log("Adding album", mediaItems.length);
    console.log("Adding album", albumId);

    const response = await got.post(`https://photoslibrary.googleapis.com/v1/albums/${albumId}:batchAddMediaItems`, {
      "headers": {
        "Authorization": token
      },
      "body": JSON.stringify({
        "mediaItemIds": mediaItems
      })
    }).json();
    console.log("Successfully Added items", response);
  }
  
  (async () => {
    const albumId = await createAlbum();
    for (const mediaItems of chunkedData) {
        await addMediaToAlbum(albumId, mediaItems);
    }
    console.log("done");
  })();