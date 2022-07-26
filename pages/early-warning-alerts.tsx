import React from "react";
import TitleHeader from "../src/components/TitleHeader";
import FloodAlertScreen from "../src/screens/FloodAlertScreen";
import SlideShow from "../src/components/headerCarousel";


export default function FloodAlert() {
  const images = [
    "/home-header-slide-images/flood4.jpg",
  ];
  return (
    <>
      <section
        className="row m-0 p-0 d-flex "
        style={{ maxWidth: "100vw", height: "82vh" }}
      >
        <SlideShow
          title="Flood Safety Tips and Resources"
          description="Flooding is a coast-to-coast threat to some part of the Nigeria States and its territories"
          btnText={`What To Know`}
          height="82vh"
          images={images}
        />
      </section>
      <div className="w-100 light_bg">
        <TitleHeader currentScreen='alert' />
        <div className="w-100 d-flex mb-5 flex-row align-items-center justify-content-center">
          <div className="col-12 d-flex flex-row align-items-center justify-content-center"><FloodAlertScreen /></div>
        </div>
      </div>
    </>
  )
};