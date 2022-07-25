import React, { useState, useRef, useCallback } from "react";
import useGetReports from "../hooks/useGetReports";
import Loader from "./Loader";
import ReportComponent from "./ReportComponent";

export default function Reports() {
  // set the page number
  const [page, setPage] = useState(1);

  // get all the data first before anything
  const { data, error, hasMore, isLoading } = useGetReports(
    "",
    page,
    `${process.env.API_ROOT}/live/feed/reports`
  );

  // create the intersection observer with the useRef
  const observer = useRef<IntersectionObserver>();

  // have the lastElement ref so as to get when the last element is visible on the screen
  const lastDataElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore)
          setPage((prevState) => prevState + 1);
      });

      if (node) observer.current?.observe(node);

      return false;
    },
    [isLoading, hasMore]
  );

  // return the output for each report
  const output = data.map((item: any, index: number) => {
    const ref = data.length === index + 1 ? lastDataElementRef : null;

    return (
      <ReportComponent
        data={data}
        index={index}
        item={item}
        key={index}
        reportRef={ref}
      />
    );
  });

  // if (error) throw new Error(error.message);
  // else
  return (
    <>
      {output.length > 0 && output}
      {isLoading && <Loader />}
    </>
  );
}
