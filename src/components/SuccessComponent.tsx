import React from "react";
import { useRouter } from "next/router";
import { Modal } from "bootstrap";
import Image from "next/image";

export default function SuccessComponent() {
  const router = useRouter();
  const goto = (url: string) => router.push(url);

  function handleClick() {
    if (typeof window !== "undefined") {
      const element = document.getElementById("alertModal")!;
      const myModal = Modal.getOrCreateInstance(element, { keyboard: true });
      myModal.hide();
    }
  }
  return (
    <>
      <Image
        className="border rounded-circle p-1 border-danger"
        src={require("../img/tick-circle.png")}
        width={150}
        height={150}
        // height="auto"
        alt="..."
      />
      <h5 className="mt-4 text-success fw-bold">
        REPORT SUBIMITTED SUCCESSFULLY
      </h5>
      <p className="mt-3 col-11 col-lg-9">
        Thank you for submiting your flood report our Agents will contact you
        soon with further details stay safe.
      </p>
      <span
        onClick={() => {
          handleClick();
          goto("/");
        }}
        data-dismiss="modal"
        className="btn btn-success text-white py-2 px-4 mt-4"
      >
        <i className="fas fa-arrow-left" /> Home
      </span>
    </>
  );
}
