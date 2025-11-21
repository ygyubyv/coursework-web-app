/**
 * Downloads a file from a remote URL by triggering a browser download.
 *
 * @param fileName - The name that the file will be saved as (e.g. "app.apk")
 * @param url - The direct URL to the file (e.g. Azure Blob URL)
 *
 * @example
 * downloadFile("virodip.apk", "https://blob/.../virodip.apk");
 */
export const downloadFile = (fileName: string, url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
