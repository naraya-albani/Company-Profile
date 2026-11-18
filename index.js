const path = require("path");
const express = require("express");
const app = express();
const public = path.join(__dirname, "public");

app.use(express.json());
app.use(express.static(public));

app.use("/api/services", require("./routes/services.routes"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));

module.exports = app;
