import Avatar from "../../../assets/img/avatar.png";
import React from "react";
import Attachment from "./Attachment";
import classNames from "../../../classNames";
import getValue from "../../../getValue";
import Queue from "nq";
import getDateAndTimeFromISO from "../../../getDateAndTimeFromISO";

function Content({ user, message }) {
  const sender = message.sender;
  const isSender = user.id === sender.id;
  return (
    <div className="d-flex mb-3">
      {!isSender && (
        <div className="align-self-end mb-4 me-2">
          <img
            src={
              (sender.profile && Queue.File.getFile(sender.profile)) || Avatar
            }
            width="45"
            alt="img"
            className="rounded-circle"
          />
        </div>
      )}
      <div className={classNames(getValue(isSender, "ms-auto"))}>
        {message.content && (
          <div
            className={classNames(
              "shadow-sm px-3 py-2",
              "shadow-sm px-3 py-2",
              getValue(!isSender, "bg-white"),
              getValue(isSender, "bg-primary text-white")
            )}
            style={{ borderRadius: "20px" }}
          >
            <p className="lh-base mb-0">{message.content}</p>
          </div>
        )}

        {message.attachment && (
          <div className="d-flex">
            <Attachment path={message.attachment} isSender={isSender} />
          </div>
        )}
        <div className={classNames(getValue(isSender, "text-end"))}>
          <span className="fs-xs opacity-50">
            {getDateAndTimeFromISO(message.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Content;
