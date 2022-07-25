


import React from "react";

type FailedComponentProps = {
     message?: string
}
export default function FailedComponent({ message }: FailedComponentProps) {
  return (
    <>
    <span className="text-danger"><i className="fas fa-times-circle fa-9x" /></span>
    <h5 className="mt-4 text-danger fw-bold">
      REPORT SUBMISSION FAILED
    </h5>
    <p className="mt-3 col-11 col-lg-9">
     {
          message ? message?.length > 0 
          ? message
          : "Sorry, there was a problem submitting your report, please try again, and if the problem presists, please contact us directly."
          : "Sorry, there was a problem submitting your report, please try again, and if the problem presists, please contact us directly."
     }
    </p>
    </>
  )
}