


import React from "react";
type ToastProps = {
  msg: string
}
export default React.memo(function Toast(props: ToastProps) {
  return (
    <div className="toast-container">
    <div className="position-fixed top-0 end-0 p-3" style={{zIndex: "9991"}}>
    <div id="liveToast" 
         className={`toast`} 
         role="alert" 
         aria-live="assertive" 
         aria-atomic="true">
      <div className="toast-header bg-success bg-opacity-75 text-white">
        {/* <img src={require('../img/logo.png')} width="30px" height="30px" className="rounded me-2" alt="logo" /> */}
        <strong className="me-auto">NIHSA</strong>
        <button type="button" 
                className="btn-close white" 
                data-bs-dismiss="toast" 
                aria-label="Close"></button>
      </div>
      <div className={`toast-body`}>
        {props.msg} has subscribed successfully
      </div>
    </div>
    </div>
    </div>
  )
}); 