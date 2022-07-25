import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../src/index.css";
import "../src/screen-breakpoints.css";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css/animate.min.css";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header.orig";
import Script from "next/script.js";
import Offcanvas from "../src/components/Offcanvas";
import { useRouter } from "next/router";
import ErrorBoundry from "../src/ErrorBoundry";
import Meta from "../src/components/Meta";
import SlideShow from "../src/components/headerCarousel";

import React, { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Meta title="NIHSA FLOOD PREDICTION" />
      <div>
        <Script src="https://upload-widget.cloudinary.com/global/all.js" />
        <Script
          src="https://kit.fontawesome.com/e0a2125bac.js"
          strategy="afterInteractive"
        />
        {["/404"].includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <div>
            <Header />
            <Offcanvas />
            <ErrorBoundry>
              <div className=" light_bg" style={{ minHeight: "50vh" }}>
                <Component {...pageProps} />
              </div>
            </ErrorBoundry>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
