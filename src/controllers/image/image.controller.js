import { blobServiceClient } from "../../database/azure/storage.database.js";

export const GetImages = async (req, res) => {
  try {
    const { container, filename } = req.params;
    const containerClient = blobServiceClient.getContainerClient(container);
    res.header("Content-Type", "image/png");
    const response = await containerClient
      .getBlockBlobClient(filename)
      .downloadToBuffer();
    res.send(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
