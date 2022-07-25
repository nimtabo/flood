import React, { useState } from "react";
import TitleHeader from "../src/components/TitleHeader";
import { reactionTypes } from "../src/constants/constants";
import useReports from "../src/hooks/useReports";
import Image from "next/image";
import SlideShow from "../src/components/headerCarousel";

function FloodInformationUpdateCard({ details }) {
  return (
    <div className="bg-white row mb-3 shadow-sm">
      <div className="col col-12 col-sm-12 col-lg-6">
        <div className="px-2 py-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <h5>
              {details.formattedAddress || "No Formatted Address Was Provided"}
            </h5>
            <p>
              {details.reportMessage || "Report Did Not Add Report Message"}
            </p>
          </div>

          <div className="d-flex py-4">
            {Object.keys(reactionTypes).map((_each, _index) => {
              return (
                <p className="fs-3 me-2" key={_index}>
                  {reactionTypes[_each]}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col col-12 col-sm-12 col-lg-6 p-0 order-first order-sm-first order-lg-last">
        <div
          className={`bg-white h-100 w-100 ${details.fileUrl ? "" : "p-2"}`}
          style={{ minHeight: "300px" }}
        >
          {details.fileUrl ? (
            <Image
              src={details.fileUrl}
              objectFit="cover"
              layout="responsive"
              width={400}
              height={200}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center w-100 h-100 light_bg ">
              <p className="fs-1 text-center">No Image Was Provided</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FloodInformationUpdate() {
  const [reportParams, setReportParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError } = useReports(reportParams);

  const nextPage = (withJump) => {
    if (reportParams.page + 1 <= Number(data.data.totalPages)) {
      console.log("entered");
      setReportParams({
        ...reportParams,
        page:
          withJump && reportParams.page + 5 < Number(data.data.totalPages)
            ? reportParams.page + 5
            : reportParams.page + 1,
      });
    }
  };

  const previousPage = (withJump) => {
    if (reportParams.page > 1) {
      setReportParams({
        ...reportParams,
        page:
          withJump && reportParams.page - 5 < 1
            ? reportParams.page - 5
            : reportParams.page - 1,
      });
    }
  };

  return (
    <div className="">
      <section
        className="row m-0 p-0 d-flex "
        style={{ maxWidth: "100vw", height: "92vh" }}
      >
        <SlideShow
          title="Flood Information Centre"
          description="Learn how to protect yourself nd family. Check for flood Information and read our flood surviving guid"
          btnText="Know More"
          height="92vh"
        />
      </section>
      <TitleHeader currentScreen="flood-information-update" />
      <div className=" d-flex flex-column align-items-center">
        <div className="p-3  w-100 w-sm-100 w-md-100 w-lg-75">
          {data &&
            data.data.docs.map((_each, _index) => (
              <FloodInformationUpdateCard details={_each} key={_index} />
            ))}
          {data && (
            <div className="d-flex align-items-center justify-content-center bg-white p-2 rounded shadow-3 ">
              <button
                className="btn new_blue_bg text-white shadow-sm me-2"
                disabled={reportParams.page - 5 < 1}
                onClick={() => previousPage(true)}
              >
                {"<<"}
              </button>
              <button
                className="btn new_blue_bg text-white shadow-sm me-2"
                disabled={!Boolean(data.data.prevPage)}
                onClick={() => previousPage(false)}
              >
                {"<"}
              </button>
              <p className="me-2">
                Page: {reportParams.page} of {Number(data.data.totalPages)}
              </p>
              <button
                className={`btn new_blue_bg text-white shadow-sm me-2 `}
                disabled={!Boolean(data.data.nextPage)}
                onClick={() => nextPage(false)}
              >
                {">"}
              </button>
              <button
                className="btn new_blue_bg text-white shadow-sm me-2"
                onClick={() => nextPage(true)}
                disabled={reportParams.page + 5 > Number(data.data.totalPages)}
              >
                {">>"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
