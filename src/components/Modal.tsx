import React from "react";
// import SuccessComponent from "./SuccessComponent";
import FailedComponent from "./FailedComponent";
import dynamic from "next/dynamic";

const SuccessComponent = dynamic(() => import("./SuccessComponent"), {
  ssr: false,
});

type ModalProps = {
  type: "success" | "fail";
  message?: string;
};

export default React.memo(function Modal(props: ModalProps) {
  return (
    <div
      className="modal fade d-flex justify-content-center"
      id="alertModal"
      tabIndex={-1}
      aria-labelledby="alertModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {props.type === "success" ? "Success" : "Failed"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body d-flex flex-column align-items-center justify-content-center text-center">
            {props.type === "success" ? (
              <SuccessComponent />
            ) : (
              <FailedComponent message={props.message} />
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
