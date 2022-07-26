import React from "react";
import TitleHeader from "../src/components/TitleHeader";
import Image from "next/image";
import SlideShow from "../src/components/headerCarousel";

interface contactStruct {
  img: string;
  title: string;
  socials: { url: string; logo: string }[];
  phones: string[];
  address: string;
}

const data: contactStruct[] = [
  {
    img: "/emergency-contacts/nema.png",
    title: "NEMA",
    address: "",
    socials: [
      {
        url: "https://www.facebook.com/nemanigeria",
        logo: "fab fa-facebook-square fa-2x",
      },
      {
        url: "https://www.instagram.com/nemanigeria",
        logo: "fab fa-instagram fa-2x",
      },
      {
        url: "https://twitter.com/nemanigeria",
        logo: "fab fa-twitter fa-2x",
      },
    ],
    phones: ["112", "2347042618875", "+23480022556362"],
  },
  {
    img: "/emergency-contacts/red-cross.png",
    title: "RED CROSS",
    address: "",
    socials: [
      {
        url: "https://www.facebook.com/NigerianRedCrossSocietyNhqts",
        logo: "fab fa-facebook-square fa-2x",
      },
      {
        url: "https://www.instagram.com/redcrossnigeria",
        logo: "fab fa-instagram fa-2x",
      },
      {
        url: "https://twitter.com/nrcs_ng",
        logo: "fab fa-twitter fa-2x",
      },
    ],
    phones: ["0803 123 0430", "0809 993 7357"],
  },
  {
    img: "/emergency-contacts/civil-defense.png",
    title: "CIVIL DEFENCE",
    address: "",
    socials: [
      {
        url: "https://www.facebook.com/NSCDC",
        logo: "fab fa-facebook-square fa-2x",
      },
      {
        url: "https://nscdc.gov.ng",
        logo: "fas fa-globe fa-2x",
      },
    ],
    phones: ["09-2914164"],
  },
];

const output = data.map((item, index) => {
  return (
    <div className="d-flex my-2 my-sm-1 my-lg-2 p-3 bg-white rounded" key={index}>
      <div className="">
        <Image src={item.img} width={113} height={119} alt=".." />
      </div>
      <div className="ms-5">
        <h2 className="">{item.title}</h2>

        <h6 className="pb-2 py-4">Social Media Handles:</h6>
        <ul className="list-group d-flex flex-column flex-sm-column flex-lg-row m-0 p-0">
          {item.socials.map((social, index) => {
            return (
              <li className="list-group-item border-0 p-0 m-0 pe-3" key={index}>
                <a href={social.url}>
                  <i className={`${social.logo} fs-3`} />
                </a>
              </li>
            );
          })}
        </ul>

        <h6 className="pb-2 py-4">Telephone:</h6>
        <div className="d-flex d-flex flex-column flex-sm-column flex-lg-row  m-0 p-0">
          {item.phones.map((phone, index) => {
            return (
              <li
                className="list-group-item d-flex  border-0 p-0 m-0 bg-primary me-2 rounded p-1 my-1 d-flex"
                key={index}
              >
                <a href={`tel:${phone}`} className="text-white fs-6 phoneLink">
                  <i className="fa fa-phone ps-1 pe-2" />
                  <p>{phone}</p>
                </a>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default function Connect() {
  const images = [
    "/home-header-slide-images/red-cross.jpg",
  ];
  return (
    <>
      <section
        className="row m-0 p-0 d-flex "
        style={{ maxWidth: "100vw", height: "82vh" }}
      >
        <SlideShow
          title="Flood Information Centre"
          description="Learn how to protect yourself nd family. Check for flood Information and read our flood surviving guid"
          btnText="Know More"
          height="82vh"
          images={images}
        />
      </section>
      <div className="w-100  light_bg">
        <TitleHeader currentScreen="connect" />
        <div
          className={`d-flex flex-column 
      justify-content-center 
      p-0 p-sm-0 p-lg-5 py-3`}
        >
          {output}
        </div>
      </div>
    </>
  );
};
