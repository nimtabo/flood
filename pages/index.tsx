import React from "react";
import dynamic from "next/dynamic";

// const HomeScreen = dynamic(() => import("../src/screens/HomeScreen"), {
//   ssr: false,
// });
const HomeScreen = dynamic(() => import("../src/screens/Home.orig"), {
  ssr: false,
});

export default React.memo(function Home() {
  return (
    <div className="w-100 light_bg">
      <div className="w-100 d-flex mb-5 flex-row align-items-center justify-content-center">
        <div className="col-12 d-flex flex-row align-items-center justify-content-center">
          <HomeScreen />
        </div>
      </div>
    </div>
  );
});
