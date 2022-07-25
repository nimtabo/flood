import React from "react";
import { useRouter } from "next/router";

type ReportComponentProps = {
  index: number;
  item: any;
  data: any;
  reportRef: React.LegacyRef<HTMLDivElement> | undefined;
};

export default function ReportComponent({
  index,
  item,
  data,
  reportRef,
}: ReportComponentProps) {
  const router = useRouter();
  const goto = (url: string) => router.push(url);
  return (
    <div
      className={`w-100 ${
        index === data.length - 1 ? "border-0" : "border-bottom"
      } p-3 py-5 p-md-5 p-lg-5`}
      key={item._id}
      ref={reportRef}
    >
      <h4 className="fw-bold text-capitalize">{item.fullName}</h4>
      <p>{item.reportMessage}</p>
      <div className="row p-0 m-0 mt-5 d-flex align-items-center justify-content-lg-between">
        <div className="col-12 col-lg-7 d-flex justify-content-center m-0 p-0 justify-content-lg-start mb-5 mb-lg-0">
          <div className="me-3">
            {new Date(item.createdAt).toLocaleString("en-us", {
              dateStyle: "medium",
            })}
          </div>
          <div>
            {new Date(item.createdAt).toLocaleString("en-US", {
              timeStyle: "short",
            })}
          </div>
        </div>

        <div className="col-12 col-lg-5 d-flex justify-content-between text-center m-0 p-0">
          <div className="col-3 col-lg-auto d-flex flex-column justify-content-center align-items-center contact">
            <div
              onClick={() => goto("/emergency-responders")}
              className="text-decoration-none text-dark"
            >
              <div>
                <i className="fas fa-phone fa-lg" />
              </div>
              <div style={{ fontSize: "0.6rem" }}>Contact NEMA</div>
            </div>
          </div>

          <div className="col-3 col-lg-auto d-flex flex-column justify-content-center align-items-center contact">
            <div
              onClick={() => goto("/make-a-report")}
              className="text-decoration-none text-dark"
            >
              <div>
                <i className="fas fa-circle-question fa-lg" />
              </div>
              <div style={{ fontSize: "0.6rem" }}>Ask for help</div>
            </div>
          </div>

          <div className="col-3 col-lg-auto d-flex flex-column justify-content-center align-items-center contact">
            <div>
              <i className="fas fa-share fa-lg" />
            </div>
            <div style={{ fontSize: "0.6rem" }}>Share to social media</div>
          </div>
        </div>
      </div>
    </div>
  );
}
