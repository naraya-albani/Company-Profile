const path = require("path");
const express = require("express");
const {
  wajibLogin,
  wajibLoginUntukUbah,
} = require("./middleware/auth.middleware");

const app = express();
const folderPublic = path.join(__dirname, "public");
const folderPrivate = path.join(__dirname, "private");

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

app.get(["/admin", "/admin.html"], wajibLogin, (req, res) => {
  res.sendFile(path.join(folderPrivate, "admin.html"));
});

app.use(express.static(folderPublic));

app.use(
  "/api/services",
  wajibLoginUntukUbah,
  require("./routes/services.routes"),
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));

module.exports = app;
