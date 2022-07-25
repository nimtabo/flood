import React, { useState, useEffect, useMemo } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import SlideShow from "../src/components/headerCarousel";

import Skeleton from "react-loading-skeleton";

import { nigerianStates } from "nigerian-states-and-lgas";
import useForecast from "../src/hooks/useForecast";
import FModalBody, { DifferentHours } from "../src/components/FModalBody";

import dynamic from "next/dynamic";

const _NoSsr = ({ children }) => <>{children}</>;

export const NoSsr = dynamic(() => Promise.resolve(_NoSsr), {
  ssr: false,
});

// default export
export default function FloodForecast() {
  // handling address from google autocomplete
  const [formattedAddress, setFormattedAddress] = useState<any>("");

  // holding all the states
  const [stateList, setStateList] = useState([]);

  // holding the currently selected state
  const [stateRef, setStateRef] = useState("Abia");

  // holding the currently selected lga
  const [localGovtRef, setLocalGovtRef] = useState("Osisioma");

  // holding the currently selected area
  const [areaRef, setAreaRef] = useState("");

  // this holds the forecast data that would be shown to the user
  const [forecastData, setForecastData] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  const [forecastParams, setForecastParams] = useState({
    lat: 5.1433291,
    lng: 7.340870099999999,
    state: stateRef,
    lga: localGovtRef,
  });

  // main function to handle the form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent screen refresh
    event.preventDefault();

    const results = await geocodeByAddress(formattedAddress.label);

    // get lat lng
    const { lat, lng } = await getLatLng(results[0]);

    setForecastParams({
      lat,
      lng,
      state: stateRef,
      lga: localGovtRef,
    });
  }

  const { data: response, isLoading, isError } = useForecast(forecastParams);

  // handling the google suggest system
  const googleSuggest = useMemo(() => {
    return (
      <div className="" style={{ width: "250px" }}>
        <NoSsr>
          <GooglePlacesAutocomplete
            autocompletionRequest={{
              componentRestrictions: { country: "ng" },
            }}
            apiOptions={{ region: "ng", language: "en" }}
            apiKey={process.env.googleApiKey}
            selectProps={{ formattedAddress, onChange: setFormattedAddress }}
          />
        </NoSsr>
      </div>
    );
  }, [formattedAddress]);

  // useEffect to set the states
  useEffect(() => {
    setStateList(nigerianStates.states() as any);
  }, []);

  // main return
  return (
    <>
      <section
        className="row m-0 p-0 d-flex "
        style={{ maxWidth: "100vw", height: "30vh" }}
      >
        <SlideShow
          title=""
          description=""
          btnText={`FLOOD FORECAST - ZONE ${
            formattedAddress && formattedAddress.label
          }`}
          height="30vh"
        />
      </section>
      <div className=" p-2 p-sm-2 p-lg-5 m-0  light_bg">
        <form
          onSubmit={handleSubmit}
          className={`d-flex
         flex-column flex-sm-column flex-md-row flex-lg-row py-3 
        justify-content-lg-center align-items-lg-center 
         align-items-sm-start  p-0
   
        `}
        >
          <p className="fw-bold me-2 ">Enter Location</p>
          <div className="py-1 d-flex align-items-center">
            <label className="fw-bold me-2" style={{ width: "50px" }}>
              State:
            </label>
            <select
              className="me-2 p-2 rounded w-sm-100"
              onChange={(e) => setStateRef(e.target.value)}
              aria-label=".form-select-lg example"
              required
              value={stateRef}
              style={{ width: "250px" }}
            >
              <option value="">Select State</option>
              {stateList.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="py-1 d-flex align-items-center">
            <label className="fw-bold me-2" style={{ width: "50px" }}>
              LGA:
            </label>
            <select
              className="me-2  p-2 rounded"
              required
              onChange={(e) => setLocalGovtRef(e.target.value)}
              aria-label=".form-select-lg example"
              value={localGovtRef}
              style={{ width: "250px" }}
            >
              <option value="">Select LGA</option>
              {stateRef &&
                nigerianStates.lgas(stateRef).map((lgs: any, index: number) => {
                  return (
                    <option key={index} value={lgs}>
                      {lgs}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="d-flex align-items-center py-1">
            <p className="me-2 fw-bold" style={{ width: "50px" }}>
              City:
            </p>
            {googleSuggest}
          </div>
          <div
            className=" d-flex justify-content-end  justify-content-sm-end justify-content-lg-start "
            style={{ width: "312px" }}
          >
            <button
              className="btn  new_blue_bg text-white ms-2"
              disabled={isLoading && true}
            >
              {isLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>
        <div className="m-0 my-2">
          <p className="fs-6 fw-bold">
            {(formattedAddress && formattedAddress.label) ||
              "Rhema University, Aba-Owerri Road, Aba"}
          </p>
        </div>
        <div className="container-fluid p-0 m-0">
          {isLoading ? (
            <Skeleton height={300} />
          ) : (
            <div className="row d-flex justify-content-between p-0 ">
              <div className="col col-12 col-sm-12 col-lg-6 p-0">
                {response && response.data && (
                  <FModalBody
                    data={response}
                    formattedAddress={formattedAddress}
                  />
                )}
              </div>
              <div className="col col-sm-12 col-lg-6 p-0">
                {response?.data && (
                  <div
                    className="card p-2 my-3 my-sm-3 my-lg-0 ms-0 ms-sm-0 ms-lg-2 rounded"
                    style={{ minHeight: "100%" }}
                  >
                    <h3 className="p-2 light_blue_text">Flood Warning</h3>
                    <hr></hr>
                    {/* <h6 className="p-2"> {response.data.advisory}</h6> */}
                    <div className="p-2">
                      <h2 className="py-3 fw-bold">{response.data.advisory}</h2>
                      <h5 className="py-3"> {new Date().toString()}, </h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="row py-4">
            <div className="col col-sm-12 col-lg-12 p-0">
              <div className="d-flex pb-3" style={{ overflowX: "scroll" }}>
                {response?.data && <DifferentHours hours={response} />}
              </div>
              {/* {response?.data && <ForecastModal forecastData={response} />} */}
            </div>
          </div>
          <div className="col col-sm-12 col-lg-12">
            <div className="">
              <h4 className="text-danger">Disclaimer</h4>
              <p className="fw-bold">
                The flood forecast is strictly based on weather and climatic
                conditions related to your current location. This does not take
                into account flood events that occur due to man-made factors
                such as blocked drainages and waterways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
