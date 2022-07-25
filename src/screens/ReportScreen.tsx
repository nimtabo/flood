import React, { useState, useRef, useEffect, useMemo } from "react";
import ModalComponent from "../components/Modal";
import { Modal } from "bootstrap";
import axios from "axios";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

import { nigerianStates } from "nigerian-states-and-lgas";
import Image from "next/image";

declare global {
  interface Window {
    cloudinary: any;
  }
}

axios.interceptors.request.use((config: any) => {
  config.headers.authorization = process.env.googleApiKey;
  return config;
});

function ReportScreen() {
  const [isLoading, setLoading] = useState(false);

  const [modalType, setModalType] = useState(false);

  const [modalMessage, setModalMessage] = useState("");

  const [needHelp, setNeedHelp] = useState(false);

  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const [formattedAddress, setFormattedAddress] = useState<any>("");

  const [stateList, setStateList] = useState([]);

  const [reliefMaterials, setReliefMaterials] = useState([]);

  const [fullnameRef, setFullnameRef] = useState("");

  const [phoneNumberRef, setPhoneNumberRef] = useState("");

  const [stateRef, setStateRef] = useState("");

  const [localGovtRef, setLocalGovtRef] = useState("");

  const [storyRef, setStoryRef] = useState("");

  const reliefMaterialRef = useRef<HTMLSelectElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    if (typeof window !== "undefined") {
      setLoading(true);

      const element = document.getElementById("alertModal")!;
      const myModal = Modal.getOrCreateInstance(element, { keyboard: false });

      const data1: any = {
        fullName: fullnameRef,
        phoneNumber: phoneNumberRef,
        state: stateRef,
        lga: localGovtRef,
        formattedAddress: formattedAddress.label,
        reportMessage: storyRef,
        fileUrl: uploadedFileUrl,
        from: "BROWSER",
      };

      const results = await geocodeByAddress(data1.formattedAddress);

      const { lat, lng } = await getLatLng(results[0]);

      data1["latitude"] = lat;

      data1["longitude"] = lng;

      if (needHelp) {
        const relief = reliefMaterialRef.current?.value as string;
        axios
          .post(`${process.env.API_ROOT}/create/request`, {
            ...data1,
            title: relief,
          })
          .then((res) => console.log(res.data))
          .catch((error) => console.log(error));
      }

      axios
        .post(`${process.env.API_ROOT}/create/report`, data1)
        .then((res) => {
          setLoading(false);

          if (!res.data.success) {
            setModalType(false);

            setModalMessage(res.data.message);

            return myModal.show();
          }

          setModalType(true);

          myModal.show();

          const form1 = document.getElementById("form1") as HTMLFormElement;

          form1.reset();

          console.log(res);
        })
        .catch((error) => console.log(error));
    }
  }

  const openCloudinaryUploadWidget = () => {
    if (typeof window !== "undefined") {
      const cloudinaryWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "nihsa",
          uploadPreset: "vio0y9a4",
        },
        (error: any, result: any) => {
          // check if error
          if (error) {
            return alert("Oops! failed to upload file");
          }

          // check if success
          if (result.info && result.info.secure_url) {
            // update uploadedFileUrl
            setUploadedFileUrl(result.info.secure_url);
          }
        }
      );
      cloudinaryWidget.open();
    }
  };

  const autoCompleteSelect = useMemo(
    () => (
      <GooglePlacesAutocomplete
        autocompletionRequest={{ componentRestrictions: { country: "ng" } }}
        apiOptions={{ region: "ng", language: "en" }}
        apiKey={process.env.googleApiKey}
        selectProps={{
          formattedAddress,
          onChange: setFormattedAddress,
          placeholder: "Address",
        }}
      />
    ),
    []
  );

  useEffect(() => {
    setStateList(nigerianStates.states());

    async function getReliefMaterials() {
      const response = await axios.get(
        `${process.env.API_ROOT}/fetch/request/types`
      );

      if (!response.data.success) return console.log("error");

      setReliefMaterials(response.data.data);
    }
    getReliefMaterials();
  }, []);

  const handleFullNameChange = (e: any) => setFullnameRef(e.target.value);
  const handlePhoneNumberChange = (e: any) => setPhoneNumberRef(e.target.value);
  const handleStateSelection = (e: any) => setStateRef(e.target.value);
  const handleLGA = (e: any) => setLocalGovtRef(e.target.value);
  const handleUserStory = (e: any) => setStoryRef(e.target.value);

  return (
        <form
          className="px-3 p-md-5 pt-3 border rounded-3 bg-white "
          onSubmit={handleSubmit}
          id="form1"
        >
          <label className="fw-bold">Full Name (Required)</label>
          <div className="mb-3">
            <input
              type="text"
              onChange={handleFullNameChange}
              className="form-control p-3"
              id="fullname"
              placeholder="name@example.com"
              required
            />
          </div>
          <label className="fw-bold">Phone Number (Required)</label>
          <div className="mb-3">
            <input
              type="text"
              onChange={handlePhoneNumberChange}
              className="form-control p-3"
              id="phone"
              placeholder="+234811"
              required
            />
            <div className="py-2 px-1" style={{ fontSize: "0.7rem" }}>
              Your phone number is required so as to get accross to you
            </div>
          </div>

          <div className="row g-3">
            <div className="m-0 p-0 col col-12 col-sm-12 col-lg-6">
              <label className="fw-bold">State (Required)</label>
              <select
                className="form-select form-select mb-3 py-3"
                onChange={handleStateSelection}
                aria-label=".form-select-lg example"
                required
              >
                <option value="">Select State</option>
                {stateList.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 px-0 col col-12 col-sm-12 col-lg-6">
              <label className="fw-bold">LGA (Required)</label>
              <select
                className="form-select form-select mb-3 py-3 ms-1"
                required
                onChange={handleLGA}
                aria-label=".form-select-lg example"
              >
                <option value="">Select LGA</option>
                {stateRef &&
                  nigerianStates
                    .lgas(stateRef)
                    .map((lgs: any, index: number) => {
                      return (
                        <option key={index} value={lgs}>
                          {lgs}
                        </option>
                      );
                    })}
              </select>
            </div>
          </div>

          <label className="fw-bold">Flood Location (Required)</label>
          <div className="mb-5">{autoCompleteSelect}</div>

          <div className="input-group mb-5 d-flex flex-column">
            <label className="fw-bold">Narrate Your Experience</label>

            <textarea
              id="your-story"
              onChange={handleUserStory}
              required
              className="form-control w-100"
              style={{ height: "200px", resize: "none" }}
              aria-label="With textarea"
            ></textarea>
          </div>

          <div className="mb-5">
            <label className="fw-bold">
              Click the icon below to upload image
            </label>
            <div className="d-flex align-items-end">
              <i
                className="fas fa-image new_blue_color p-0 m-0 contact"
                style={{ fontSize: "120px" }}
                onClick={() => openCloudinaryUploadWidget()}
              ></i>
            </div>
          </div>

          <div className="w-100 mb-5">
            <label className="fw-bold">
              Do you want to make relief request?
            </label>
            <div className="d-flex">
              <div className="form-check px-0 d-flex align-items-center">
                <input
                  type="radio"
                  name="radios"
                  className="form-check-input"
                  id="exampleRadio1"
                  value="yes"
                  onChange={() => setNeedHelp(true)}
                />
                <label
                  className="form-check-label px-2 fw-bold"
                  htmlFor="exampleRadio1"
                >
                  Yes, Request Relief
                </label>
              </div>

              <div className="form-check px-0 d-flex align-items-center">
                <input
                  type="radio"
                  name="radios"
                  className="form-check-input"
                  id="exampleRadio2"
                  value="no"
                  onChange={() => setNeedHelp(false)}
                />
                <label
                  className="form-check-label  px-2 fw-bold"
                  htmlFor="exampleRadio2"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div className={`mb-3 ${!needHelp && "d-none"}`}>
            <select
              ref={reliefMaterialRef}
              className="form-select form-select mb-3 py-3"
              required={needHelp ? true : false}
              aria-label=".form-select-lg example"
            >
              <option value="">Select Relief Material</option>
              {reliefMaterials.map((item: any, index: number) => {
                return (
                  <option value={item.title} key={index}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="w-100 btn my-4 btn py-3 new_blue_bg text-white"
            disabled={isLoading && true}
            type="submit"
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit Flood Report"
            )}
          </button>
        </form>
  );
}

export default ReportScreen;

