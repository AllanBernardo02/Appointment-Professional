import React from "react";
import Queue from "nq";
import Profile from "../../assets/img/profile_icon.jpg";

function SearchResult({ user, onClickUser }) {

   
  return (
    <>
      <div
        className="p-3 cursor-pointer"
        onClick={() => onClickUser(user)}
      >
        <div>
         
          <div className="d-flex align-items-center">
            <img
              className="rounded-circle me-2"
              src={
                (user.profile && Queue.File.getFile(user.profile)) || Profile
              }
              width="40"
              height="40"
              alt=""
            />
            <h6 className="mb-0">{user.name || user.username}</h6>
          </div> 
        </div>
      </div>
    </>
  );
}

const styles = {
  result: {
    backgroundColor: "white",
    boxShadow: "0px 0px 8px #ddd",
    borderRadius: "10px",
    maxHeight: "300px",
    overflowY: "auto",
    margin: "1rem 0",
  },
};

export default SearchResult;
