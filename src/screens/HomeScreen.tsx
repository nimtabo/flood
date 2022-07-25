import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SlideShow from "../components/headerCarousel";
import Image from "next/image";
import useStatistics from "../hooks/useStatistics";

const homeCard = [
  {
    title: "Flood Forecast",
    cardText: "Get your flood forecast on NIHSAFPA",
    buttonText: "See Flood Forecast",
    buttonURL: "/flood-forecast",
    image: "/home-images/sky.gif",
  },
  {
    title: "Flood Info Update",
    cardText: "Get your flood update information",
    buttonText: "Get Flood Updates",
    buttonURL: "/flood-information-update",
    image: "/home-images/flood-update.png",
    overlay: {
      title: "Flood Forecast By LGA",
      cardText: "See and prepare for emergencies through NIHSAFPA",
      buttonText: "Get Early Warning Updates",
      buttonURL: "/early-warning-alerts",
    },
  },
  {
    title: "Emergency Responders",
    cardText: "Get Emergency Contact Of The Appropriate Agencies",
    buttonText: "View Responders",
    buttonURL: "/emergency-responders",
    image: "/home-images/early-warning-alert.png",
    overlay: {
      title: "Safety Tips",
      cardText: "See and prepare for emergencies through NIHSAFPA",
      buttonText: "View Helpful Tips",
      buttonURL: "/early-warning-alerts",
    },
  },

  {
    title: "Eye Witness Report",
    cardText: "Report Flood Event In Your Area",
    buttonText: "Tell Your Story",
    buttonURL: "/tell-your-story",
    image: "/home-images/tell-your-story.png",
  },
];

function HomeScreen() {
  const router = useRouter();

  const { data, isError, isLoading } = useStatistics();

  return (
    <main className="w-100 light_bg">
      <section
        className="row m-0 p-0 d-flex "
        style={{ maxWidth: "100vw", height: "70vh" }}
      >
        <SlideShow />
      </section>

      <h1 className="text-center new_blue_color py-5"></h1>
      <div className="d-flex justify-content-center">
        <div className="container w-100 w-sm-100 w-lg-75 p-3">
          {homeCard.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex flex-column  flex-sm-column flex-lg-row bg-white my-3 shadow"
              >
                <div
                  className={`
                  w-100 w-lg-50 w-sm-100
                  d-flex flex-column justify-content-between `}
                >
                  <div className="p-4 d-flex flex-column justify-content-between h-100">
                    <div>
                      <h3 className="light_blue_text">{item.title}</h3>
                      <p className="py-3">{item.cardText}</p>
                    </div>
                    <button
                      onClick={() => router.push(item.buttonURL)}
                      className="new_blue_color new_yellow_bg p-2 fs-5 align-self-start"
                    >
                      {item.buttonText}
                    </button>
                  </div>
                </div>
                <div
                  className={` 
                  w-100 w-lg-50 order-first  order-sm-first
                  ${index % 2 == 0 ? "order-lg-first" : "order-lg-last"}
                  `}
                  style={{
                    background: `url('${item.image}')`,
                    height: "300px",
                    width: "100%",
                    backgroundSize: "cover",
                  }}
                >
                  {item.overlay && (
                    <div className="p-3 h-100">
                      <div className="p-4 d-flex flex-column justify-content-between h-100 slide-text">
                        <div>
                          <h3 className="text-white">{item.overlay.title}</h3>
                          <p className="py-3 text-white">
                            {item.overlay.cardText}
                          </p>
                        </div>
                        <button
                          onClick={() => router.push(item.overlay.buttonURL)}
                          className="new_blue_color new_yellow_bg p-2 fs-5 align-self-start"
                        >
                          {item.overlay.buttonText}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-3  bg-white">
        <h3 className="text-center new_blue_color py-5">FLOOD STATISTICS</h3>
        <div className="row g-4">
          {data &&
            Object.keys(data.data)
              .filter((_item) => _item.includes("flooded"))
              .map((_item, _index) => {
                return (
                  <div className="col col-12 col-sm-12 col-lg-4  " key={_index}>
                    <div className="text-center text-white p-5 new_blue_bg my-1">
                      <h1 className="pb-2" style={{ fontSize: "80px" }}>
                        {data.data[_item]}
                      </h1>
                      <h5>
                        {_item.split("flooded")[1].toUpperCase() == "LGAS"
                          ? "LGAs"
                          : _item.split("flooded")[1].toUpperCase()}{" "}
                        AFFECTED
                      </h5>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      <div>
        <h2 className="text-center new_blue_color p-5 ">
          Download Our Mobile App
        </h2>

        <div>
          <Image
            src="/home-images/mobiles.png"
            width={2000}
            height={1043}
            layout="responsive"
          />
        </div>

        <div className="row mb-5">
          <div className="col"></div>
          <div className="col">
            <Image
              src="/home-images/google-play.png"
              width={300}
              height={100}
              // height={89}
            />
          </div>
          <div className="col">
            <Image src="/home-images/app-store.png" width={300} height={100} />
          </div>
          <div className="col"></div>
        </div>
      </div>
    </main>
  );
}

export default HomeScreen;
