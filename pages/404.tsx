import React from "react";
import { useRouter } from "next/router";
import Image from "next/image"

export default React.memo(function Default() {
  const router = useRouter();
  const goto = (url: string) => router.push(url);
  return (
    <div className="w-100 d-flex my-5 py-5 flex-column align-items-center justify-content-center">
      <Image
        src={require("../src/img/404errorwith peopleholdingthe numbers-bro1.png")}
        width={438}
        height={292}
        // height="auto"
        alt="404"
      />
      <h1 className="text-success text-opacity-75">OOPS, Page not found</h1>
      <p className="col-8 col-lg-4 fw-light mb-5 text-center mt-4 h4">
        Check to see if you typed the correct URL or check your internet
        connectivity then try again.
      </p>
      <span onClick={()=>goto("/")} className="btn btn-success py-3 px-5 opacity-75">
        <i className="fas fa-arrow-left" /> Home
      </span>
    </div>
  );
});
