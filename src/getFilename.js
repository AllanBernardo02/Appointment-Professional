function getFilename(path) {
  return path.split("/").pop().split("_").pop();
}

export default getFilename;
