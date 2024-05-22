import { blobServiceClient } from "../../database/azure/storage.database.js";

export const uploadBlob = async (req, res) => {
  try {
    const { container } = req.body;
    const { originalname, buffer } = req.file;
    const containerclient = blobServiceClient.getContainerClient(container);
    await containerclient.getBlockBlobClient(originalname).uploadData(buffer);
    //console.log(container);
    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
