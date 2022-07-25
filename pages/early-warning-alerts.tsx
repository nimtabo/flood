import React from "react";
import TitleHeader from "../src/components/TitleHeader";
import FloodAlertScreen from "../src/screens/FloodAlertScreen";


export default function FloodAlert() {
  return (
    <div className="w-100 light_bg">
      <TitleHeader currentScreen='alert'/>
      <div className="w-100 d-flex mb-5 flex-row align-items-center justify-content-center">
      <div className="col-12 d-flex flex-row align-items-center justify-content-center"><FloodAlertScreen /></div>
      </div>
    </div>
  )
};