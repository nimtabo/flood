import React from "react";
import { useRouter } from "next/router";

type TitleHeaderProps = {
  currentScreen: string;
};

function TitleHeader(props: TitleHeaderProps) {
  const router = useRouter();

  const titles = {
    home: "HOME",
    report: "REPORT A FLOOD EVENT",
    story: "MAKE A FLOOD REPORT",
    "tell-your-story": "Flood Experiences",
    connect: "EMERGENCY CONTACT",
    blog: "Safety Tips",
    alert: "EARLY WARNING ALERT",
    "flood-information-update": "FLOOD INFORMATION UPDATE",
  } as any;

  return (
    <div className="w-100 mb-4 d-flex justify-content-center">
      <div className="border text-white col-12  p-3 px-3 px-lg-5 bg-opacity-75 new_blue_bg">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
          className="text-decoration-none d-flex justify-content-center align-items-center w-100 text-white"
        >
          <span className="ms-1 ms-lg-4 fs-2">
            {titles[props.currentScreen] || "BACK"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TitleHeader);
