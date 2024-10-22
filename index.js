const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults if your JSON file is empty
db.defaults({ albums: [] }).write();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/newAlbum", (req, res) => {
  const { albumName, submitterName } = req.body;
  const now = new Date();
  const dateTime = now.toLocaleString();

  db.get("albums").push({ albumName, submitterName, dateTime }).write();

  res.json({
    message: "Album added",
    album: { albumName, submitterName, dateTime },
  });
});

app.get("/albums", (req, res) => {
  const albums = db.get("albums").value();
  res.json(albums);
});

app.use(express.static("public"));
app.use("/", express.static("public/index.html"));
app.use("/about", express.static("public/about.html"));
app.use("/newmusic", express.static("public/newmusic.html"));
app.use("/album.html", express.static("public/album.html"));

// app.listen(3000, () => {
//   console.log("running on port 3000");
// });

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening at ", port);
});
