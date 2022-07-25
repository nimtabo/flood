import Link from "next/link";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
// Header Component
import Header from "./Header";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { url } from "inspector";

// prop types
type CarouselProps = {
  title: String;
  description: String;
  btnText: String;
  height: String;
};

const SlideShow = ({ title, description, btnText, height }: CarouselProps) => {
  // const images = [
  //   "/home-header-slide-images/early_warning_sign.jpg",
  //   "/home-header-slide-images/flood.png",
  //   "/home-header-slide-images/flooded_homes.png",
  //   "/home-header-slide-images/flooded_farm.jpg",
  // ];

  const images = [
    "/home-header-slide-images/Edo_flood.jpg",
    "/home-header-slide-images/lagos-flood.jpg",
    "/home-header-slide-images/flood.png",
    "/home-header-slide-images/flooded.webp",
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
      }}
      className=" d-flex align-items-end align-items-sm-end align-items-lg-center m-0 p-0"
    >
      {/* Carousel  */}
      <div
        style={{
          height: `${height}`,
          width: "100%",
          position: "absolute",
        }}
      >
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  width: "100vw",
                  height: `${height}`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* NAVBAR | BRAND | LINKS */}
      <div className="header_links_container">
        <Header />
      </div>
      {/* Overlay */}
      {title === "" && description === "" ? (
        <div
          className="mx-lg-5 p-lg-1 p-1 w-100 w-lg-50"
          style={{ position: "absolute", zIndex: "1" }}
        >
          <button
            className="btn bg-light text-dark mx-lg-5  p-lg-3 my-lg-3 fw-bold"
            style={{ position: "absolute", zIndex: "1" }}
          >
            {btnText}
          </button>
        </div>
      ) : (
        <div
          className="slide-text mx-lg-5 p-lg-5 p-4 w-100 w-lg-50"
          style={{ position: "absolute", zIndex: "1" }}
        >
          <h2
            className="text-white fw-bold w-100 border-bottom border-danger"
            style={{ fontSize: "55px" }}
          >
            {/* Flood Prediction {new Date().getFullYear()} */}
            {title}
          </h2>
          <p
            className="text-white  fw-light fs-4 w-lg-100"
            // style={{ fontSize: "8px" }}
          >
            {/* Turn Around, Don't Drown at Flooded Roads  */}
            {description}
          </p>
          <Link href="/flood-forecast" passHref>
            <button className="btn bg-danger text-white p-lg-3 my-lg-3 fw-bold">
              {/* Check Your Area <i className="fas fa-arrow-right" /> */}
              {btnText}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SlideShow;
