import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default React.memo(function Header() {
  const router = useRouter();
  const goto = (url: string) => router.push(url);

  const informationHubRoutes = {
    "/early-warning-alerts": "Early Warning Alert",
    "/safety-tips": "Safety Tips",
    "/flood-information-update": "Flood Information Updates",
  } as any;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light border-bottom pt-0 mt-0">
        <div className="container-fluid px-lg-0 py-lg-0 ">
          <span className="navbar-brand col-lg-4 m-0" onClick={() => goto("/")}>
            <h4
              className="p-0 m-0 text-white fw-normal p-0 m-0 fw-bold p-0 m-0 contact"
              style={{ fontStyle: "italic" }}
            >
              nihsafpa
            </h4>
            <p style={{ fontSize: "10px" }} className="text-white p-0 m-0">
              Flood Prediction by NIHSA
            </p>
          </span>
          <div className="col-lg-8 m-0">
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars text-white" />
            </button>

            <div className="collapse navbar-collapse " id="navbarNav">
              <div className="w-100 d-flex  justify-content-end">
                <ul className="navbar-nav d-flex flex-row justify-content-between  w-100">
                  <li className="nav-item hoverNavLink">
                    <div
                      className="nav-link btn"
                      aria-current="page"
                      onClick={() => goto("/")}
                    >
                      <b
                        className={`fs-6 ${
                          router.pathname == "/"
                            ? "new_yellow_color"
                            : "text-white"
                        }`}
                      >
                        HOME
                      </b>
                    </div>
                  </li>

                  <li className="nav-item hoverNavLink">
                    <span
                      className="nav-link btn"
                      onClick={() => goto("/flood-forecast")}
                    >
                      <b
                        className={`fs-6 ${
                          router.pathname == "/flood-forecast"
                            ? "new_yellow_color"
                            : "text-white"
                        }`}
                      >
                        FLOOD FORECAST
                      </b>
                    </span>
                  </li>

                  <li className="nav-item hoverNavLink">
                    <div className="dropdown">
                      <button
                        className={`btn dropdown-toggle fs-6 fw-bold ${
                          Object.keys(informationHubRoutes).includes(
                            router.pathname
                          )
                            ? "new_yellow_color"
                            : "text-white"
                        }`}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        INFORMATION HUB
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {Object.keys(informationHubRoutes).map(
                          (_route, _index) => (
                            <Link href={_route} key={_index}>
                              <span>
                                <span
                                  className={`btn text-start ${
                                    router.pathname == _route
                                      ? "text-primary"
                                      : ""
                                  }`}
                                  style={{ fontSize: "14px" }}
                                >
                                  {informationHubRoutes[_route]}
                                </span>
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </li>

                  <li className="nav-item hoverNavLink">
                    <span
                      className="nav-link btn"
                      onClick={() => goto("/tell-your-story")}
                    >
                      <b
                        className={`fs-6 ${
                          router.pathname == "/tell-your-story"
                            ? "new_yellow_color"
                            : "text-white"
                        }`}
                      >
                        TELL YOUR STORY
                      </b>
                    </span>
                  </li>

                  <li className="nav-item hoverNavLink">
                    <span
                      className="nav-link btn text-white new_blue_color new_green_bg"
                      onClick={() => goto("/emergency-responders")}
                    >
                      <b>HELP CENTER</b>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
});
