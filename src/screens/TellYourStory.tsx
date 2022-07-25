import React from "react";
import ErrorBoundry from "../ErrorBoundry";
import Reports from "../modules/Reports";
import Image from "next/image";
import SlideShow from "../components/headerCarousel";

function VerifiedReportScreen() {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 col-md-12 row  p-4 p-md-0 p-lg-0 d-flex flex-row gx-2 ovefflow-hidden">
          <div
            className="w-100 border border-5 p-0 m-0 rounded-3"
            style={{ height: "600px" }}
          >
            <div className="border p-0 border-5 col-12 col-lg-12 d-flex flex-column p-2 rounded-3 overflow-scroll h-100 w-100">
              <ErrorBoundry>
                <Reports />
              </ErrorBoundry>
            </div>
          </div>
        </div>
        <div className="col col-lg-6 col-md-12">
          <Image
            src="/otherImages/verified-report.png"
            height={1000}
            width={1000}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(VerifiedReportScreen);
