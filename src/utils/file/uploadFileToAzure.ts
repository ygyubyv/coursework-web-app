/**
 * Uploads a File or Blob to a given Azure Blob Storage URL using HTTP PUT.
 *
 * The function sends the binary data directly to the storage endpoint.
 * Make sure the URL contains a valid SAS token with write permissions.
 *
 * @param url - A full Azure Blob Storage URL including SAS token.
 * @param file - The File or Blob object to upload.
 * @returns The fetch Response object if the request succeeds.
 *
 * @example
 * const url = "https://account.blob.core.windows.net/container/file.png?sv=...";
 * await uploadBlob(url, file); // uploads the file
 *
 * @throws Will log an error if the upload fails.
 */
export const uploadBlob = async (url: string, file: File | Blob) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "x-ms-blob-type": "BlockBlob" },
      body: file,
    });

    return response;
  } catch (error) {
    console.error("Помилка при завантаженні blob:", error);
  }
};
