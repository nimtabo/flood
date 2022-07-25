import React from "react";
import TitleHeader from "../src/components/TitleHeader";
// import ReportScreen from "../src/screens/ReportScreen"
import dynamic from "next/dynamic";

const ReportScreen = dynamic(() => import("../src/screens/ReportScreen"), {
  ssr: false,
});

export default function MakeAReport() {
  return (
    <div className="w-100 light_bg">
      <div className="w-100 d-flex mb-5 flex-row align-items-center justify-content-center">
        <div className="col-12 d-flex flex-row align-items-center justify-content-center">
          <ReportScreen />
        </div>
      </div>
    </div>
  );
};
