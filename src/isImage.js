import getExtension from "./getExtension";

function isImage(path) {
  const ext = getExtension(path);
  switch (ext) {
    case "jpg":
    case "jpeg":
    case "png":
      return true;
    default:
      return false;
  }
}

export default isImage;
