function getExtension(path) {
  return path.match(/\.([^\./\?]+)($|\?)/)[1];
}

export default getExtension;
