import React from "react";
import { useRouter } from "next/router";

export default React.memo(function Footer() {
  const router = useRouter();
  const goto = (url: string) => router.push(url);

  return (
    <footer className="text-white  new_blue_bg">
      <div className="container-fluid" style={{ maxWidth: "100vw" }}>
        <div className="row">
          <div
            className={`col-sm-12 col-lg-3 p-3 pt-5  d-flex flex-column
            
           align-items-center align-items-sm-center align-items-lg-start  text-sm-center text-lg-start`}
          >
            <h1 style={{ fontSize: "60px",fontStyle:"italic"}}>nihsafpa</h1>
            <p className="my-0 py-0">Flood Prediction by NIHSA</p>
          </div>

          <div className=" col-sm-12 col-lg-3 p-3 pt-5 d-flex flex-column  align-items-sm-center align-items-lg-start text-sm-center">
            <p
              className="btn p-0 fw-bold text-white contact"
              onClick={() => goto("/")}
            >
              Home
            </p>

            <a
              href="https://nihsa.gov.ng/"
              className="btn p-0 fw-bold text-white contact"
            >
              <p>About NIHSA</p>
            </a>
            <p
              className="btn p-0 fw-bold text-white contact"
              onClick={() => goto("/faqs")}
            >
              FAQ
            </p>
          </div>

          <div className=" col-sm-12 col-lg-3 p-3 pt-5 d-flex flex-column  align-items-sm-center align-items-lg-start text-sm-center">
            <p
              className="btn p-0  text-white contact"
              onClick={() => goto("/flood-forecast")}
            >
              Daily Forecast
            </p>
            <p
              className="btn p-0  text-white contact"
              onClick={() => goto("/tell-your-story")}
            >
              Tell Your Story
            </p>
            <p
              className="btn p-0  text-white contact"
              onClick={() => goto("/early-warning-alerts")}
            >
              Early Warning Alert
            </p>
            <p
              className="btn p-0  text-white contact"
              onClick={() => goto("/tell-your-story")}
            >
              Flood Info Update
            </p>
            <p
              className="btn p-0  text-white contact"
              onClick={() => goto("/emergency-responders")}
            >
              Emergency Responders
            </p>
            <p
              className="btn p-0  text-white contact"
              onClick={() => goto("/safety-tips")}
            >
              Safety Tips
            </p>
          </div>

          <div className="col-sm-12 col-lg-3 p-3 pt-5 m-0 d-flex flex-column align-items-center align-items-sm-center   align-items-lg-start ">
            <ul className="list-group list-group-horizontal p-0 ">
              <li className="list-group-item border-0 ps-0 bg-transparent">
                <a
                  href="https://www.facebook.com/nihsang"
                  className="text-white contact"
                >
                  <i className="fab fa-facebook-square fa-2x" />
                </a>
              </li>
              <li className="list-group-item border-0 bg-transparent">
                <a
                  href="https://www.instagram.com/nihsa_ng/"
                  className="text-white contact"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              </li>
              <li className="list-group-item border-0 bg-transparent">
                <a
                  href="https://ng.linkedin.com/in/nihsa-nigeria-b213b41b0"
                  className="text-white contact"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              </li>
              <li className="list-group-item border-0 bg-transparent">
                <a
                  href="https://twitter.com/nihsa_ng"
                  className="text-white contact"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              </li>
            </ul>
            <p>Collaborating Agencies</p>
            <p>
              <a
                href="https://nimet.gov.ng/"
                target={"blank_"}
                rel="noreferrer"
                className="text-white contact text-decoration-none btn ps-0 "
              >
                NIMET
              </a>
              |
              <a
                href="https://www.un-spider.org/nigeria-national-emergency-management-agency-nema"
                target={"blank_"}
                rel="noreferrer"
                className="text-white contact text-decoration-none btn"
              >
                NEMA
              </a>
              |
              <a
                href="https://www.noa.gov.ng/"
                target={"blank_"}
                rel="noreferrer"
                className="text-white  contact text-decoration-none btn"
              >
                NOA
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-5 pb-3">
        <p className="m-0 p-0">Copyright Ⓒ NIHSA 2022</p>
      </div>
    </footer>
  );
});
