import React from "react";
import BlogItem from "../modules/BlogItem";
import useBlogNews from "../hooks/useBlogNews";
import SlideShow from "../components/headerCarousel";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function BlogScreen() {
  const { data, isLoading, isError } = useBlogNews();

  return (
    <div className="col-11 col-md-11 col-lg-11 p-0 p-md-0 p-lg-0 ovefflow-hidden">
      <div className="row m-0 p-0 w-100 mt-5 my-3 d-flex flex-column justify-content-center align-content-center">
        {isLoading ? (
          <div className="border rounded-3 bg-white p-3 col-12 col-lg-6 my-2">
            <Skeleton height={200} />
          </div>
        ) : (
          <></>
        )}
        {data &&
          data.data.map((item: any, index: number) => {
            return <BlogItem key={index} item={item} />;
          })}
      </div>
    </div>
  );
}

export default React.memo(BlogScreen);
