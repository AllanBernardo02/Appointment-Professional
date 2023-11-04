import React from "react";

function ContractCard({ className, object, onClickView }) {
  return (
    <>
      <div className={`card m-2 ${className}`}>
        <div className="card-header fw-bold">Contract Template</div>
        <div className="card-body">
          <h5 className="card-title">Contract to: {object.companyName}</h5>
          <p className="card-text">{object.description}</p>
          <button className="btn btn-primary" onClick={onClickView}>
            View
          </button>
        </div>
      </div>
    </>
  );
}

export default ContractCard;
