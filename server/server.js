const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
let port = process.env.PORT || 5000;

const validators = require("./validators");

app.use(express.json());
app.use(cors());

app.get("/image", (req, res) => {
  return res.sendFile(path.resolve("./ScannedImage.png"));
});

app.post("/form", (req, res) => {
  const {
    projectName,
    scanningMode,
    scanDimensionsX,
    scanDimensionsY,
    scannerFrequency,
  } = req.body;

  if (!validators.isProjectNameValid(projectName)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Project Name" });
  }

  if (!validators.isScanningModeValid(scanningMode)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Scanning Mode" });
  }

  if (!validators.isDimensionValid(scanDimensionsX)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Scan Dimension for X" });
  }

  if (!validators.isDimensionValid(scanDimensionsY)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Scan Dimension for Y" });
  }

  if (!validators.isFrequencyValid(scannerFrequency)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Scanner Frequency" });
  }

  return res
    .status(200)
    .json({ success: true, msg: "Successfully keyed in project parameters" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
