// import isImage from "../../../isImage";
// import React from "react";
// import getFilename from "../../../getFilename";
// import classNames from "../../../classNames";
// import getValue from "../../../getValue";

import classNames from "../../../classNames";
import getFilename from "../../../getFilename";
import getValue from "../../../getValue";
import isImage from "../../../isImage";

function Attachment({ path, isSender }) {
  if (isImage(path))
    return (
      <img
        className={classNames(
          "image-fluid w-50",
          getValue(isSender, "ms-auto")
        )}
        src={path}
      />
    );
  return <a href={path}>{getFilename(path)}</a>;
}

export default Attachment;
