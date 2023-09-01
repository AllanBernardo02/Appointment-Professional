export default function ellipsize(string, length) {
  return string.length > length
    ? string.slice(0, length).concat(" ...")
    : string;
}
