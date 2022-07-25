import React, { useState, useRef, useCallback } from "react";
import { QueryType } from "../screens/FloodAlertScreen";
import useGetAlerts from "../hooks/useGetAlerts";
import { useRouter } from "next/router";
import Loader from "./Loader";
import AlertComponent from "./AlertComponent";

type FloodAlertsProps = {
  query: QueryType;
};

export default function FloodAlerts(props: FloodAlertsProps) {
  const observer = useRef<IntersectionObserver>();

  const [page, setPage] = useState(1);

  const { data, error, hasMore, isLoading } = useGetAlerts(
    props.query,
    page,
    `${process.env.API_ROOT}/query/alerts`
  );

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

  const output = data.map((item, index) => {
    const ref = data.length === index + 1 ? lastDataElementRef : null;
    return <AlertComponent alertRef={ref} item={item} key={index} />;
  });

  // if (error) {}//throw new Error(error.message);
  // else
  return (
    <>
      {output.length > 0 && output}
      {isLoading && <Loader />}
    </>
  );
}
