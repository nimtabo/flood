import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default React.memo(function OffCanvas() {
  const router = useRouter();
  const goto = (url: string) => router.push(url);

  return (
    <div
      className="offcanvas offcanvas-start shadow-lg new_blue_bg w-75"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <p id="offcanvasRightLabel"></p>
        <button
          type="button"
          className=" btn-close btn-close-white text-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="d-flex flex-column p-3">
          <Link href="/">
            <h3 className="btn text-start text-white py-2 fw-bold">HOME</h3>
          </Link>
          <hr className="text-white"></hr>
          <Link href="/flood-forecast">
            <h3 className="btn text-start text-white py-2 fw-bold">
              FLOOD FORECAST
            </h3>
          </Link>

          {/* <hr className="text-white"></hr>
          <Link href="/make-a-report">
            <h3 className="btn text-start text-white py-2 fw-bold">
              REPORT FLOOD EVENT
            </h3>
          </Link> */}

          <hr className="text-white"></hr>
          <Link href="/make-a-report">
            <h3 className="btn text-start text-white py-2 fw-bold">
              INFORMATION HUB
            </h3>
          </Link>
          <Link href="/early-warning-alerts">
            <h3 className="btn text-start text-white py-2  fw-light">
              Early Warning Alert
            </h3>
          </Link>
          <Link href="/safety-tips">
            <h3 className="btn text-start text-white py-2  fw-light">
              Safety Tips
            </h3>
          </Link>
          <Link href="/flood-information-update">
            <h3 className="btn text-start text-white py-2  fw-light">
              Flood Information Update
            </h3>
          </Link>

          <hr className="text-white"></hr>
          <Link href="/emergency-responders">
            <h3 className="btn text-start text-white py-2 fw-bold">
              HELP CENTER
            </h3>
          </Link>
          <Link href="/emergency-responders">
            <h3 className="btn text-start text-white py-2  fw-light">
              Emergency Responders
            </h3>
          </Link>

          <hr className="text-white"></hr>
          <Link href="/faqs">
            <h3 className="btn text-start text-white py-2 fw-bold">FAQ</h3>
          </Link>

          <Link href="/tell-your-story">
            <button className="btn new_blue_color new_yellow_bg rounded fw-bold fs-4 py-2 mt-5">
              TELL YOUR STORY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});
