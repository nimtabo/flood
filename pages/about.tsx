import Image from "next/image";
import Meta from "../src/components/Meta";
import { API_ROOT } from "../src/config/env";

import React from "react";
export default function ABOUT(data) {
  return (
    <div className="px-lg-5 p-3 p-lg-5  light_bg">
      <Meta title="About NIHSAFPA" />
      <h2 className="text-center new_blue_color pb-3">ABOUT US</h2>
      <section className="bg-white p-3">
        <div className="py-2">
          <h5 className="py-2">
            NIHSA Flood Prediction Application (NIHSAFPA)
          </h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            tempus, fermentum turpis convallis. Tortor tempus sollicitudin
            gravida laoreet et ullamcorper arcu. Et velit in nisi, fermentum,
            scelerisque enim at pretium neque. Rhoncus sit nulla viverra vitae.
            Habitant mattis laoreet mi vulputate non mauris suspendisse vitae.
            Augue quam eget arcu gravida interdum. Aliquam suspendisse viverra
          </p>
        </div>

        <div className="py-2">
          <h5 className="py-2">PRIVACY</h5>
          <p>{data && data.data.privacyPolicy}</p>
        </div>

        <div className="py-2">
          <h5 className="py-2">LEGAL</h5>
          <p>{data && data.data.legal}</p>
        </div>

        <div className="py-2">
          {/* <h5 className="py-2"></h5> */}
          {/* <div className="row">
            <div className="col col-sm-12 col-lg-4 py-0 py-sm-5">
              <Image
                src="/stakeholders/nimet.png"
                width={1214}
                height={300}
                layout="intrinsic"
              />
            </div>
            <div className="col col-sm-12 col-lg-4 py-0 py-sm-5">
              <Image
                src="/stakeholders/nema.png"
                width={1166}
                height={300}
                layout="responsive"
              />
            </div>
            <div className="col col-sm-12 col-lg-4 py-0 py-sm-5">
              <Image
                src="/stakeholders/noa.png"
                width={1166}
                height={300}
                layout="responsive"
              />
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${API_ROOT}/get-user-home-content`);
  const data = await response.json();
  // return
  return {
    props: data,
  };
}
