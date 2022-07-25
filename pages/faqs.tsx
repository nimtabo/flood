import React from "react";
import { API_ROOT } from "../src/config/env";
export default function FAQS(data) {
 
  const faqs = (
    data.data.map((item, index) => {

      return (
        <div className="accordion-item mb-3 border border-3" key={index}>
          <h4 className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="true"
              aria-controls={`collapse${index}`}
            >
              {item.title}
            </button>
          </h4>
          <div
            id={`collapse${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">{item.body}</div>
          </div>
        </div>
      );
    })
  ) 
  return (
    <div className="w-100  light_bg p-2 p-sm-2 p-lg-5">
      <h2 className="text-center pb-3 new_blue_color">FAQ</h2>
      <div className="bg-white p-3 mb-3">
        <div className="w-100 py-3 d-flex flex-grow-1 overflow-scroll">
          <div className="accordion w-100" id="accordionExample">
            {faqs}
          </div>
        </div>
      </div>
    </div>
  );
};


export async function getServerSideProps(){

    const response = await fetch(`${API_ROOT}/get-faqs`);
    const data = await response.json()
    // return
    return {
      props:data
    };
  
}