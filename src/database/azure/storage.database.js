import { BlobServiceClient } from "@azure/storage-blob";
import { config } from "dotenv";

config();

export const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_ACCESS_KEY_CONNECTION_STRING
);
