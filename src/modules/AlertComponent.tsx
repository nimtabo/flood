import { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
// react hot toast
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import validators from "../utils/validators";

type AlertComponentProps = {
  item: any;
  alertRef: any;
};
type ReportComponentProps = {
  showModal: boolean;
  closeModal: () => any;
  alertId: string;
};

function ReplyComponent({
  showModal,
  closeModal,
  alertId,
}: ReportComponentProps) {
  const [state, setState] = useState({
    fullName: "",
    phoneNumber: "",
    locationAddress: {} as any,
    isAffected: false,
    isResponseLoading: false,
  });

  const handleCreateResponse = async (e: any) => {
    e.preventDefault();
    try {
      setState({
        ...state,
        isResponseLoading: true,
      });

      // get responseData
      const responseData: any = {
        fullName: state.fullName,
        phoneNumber: state.phoneNumber,
        isAffected: state.isAffected,
        formattedAddress: state.locationAddress.label
          ? state.locationAddress.label
          : "",
      };

      // validate
      const error = validators.createResponseValidator(responseData);

      // check if error
      if (error) {
        setState({ ...state, isResponseLoading: false });
        return toast(error, { style: { maxWidth: 500 } });
      }

      // geocode address
      const results = await geocodeByAddress(responseData.formattedAddress);

      // get lat lng
      const { lat, lng } = await getLatLng(results[0]);

      // update responseData
      responseData["latitude"] = lat;
      responseData["longitude"] = lng;

      // make request to create response
      const response = await axios.post(
        `${process.env.API_ROOT}/create/alert/response/${alertId}`,
        responseData
      );

      console.log(response);

      // check if no success
      if (!response.data.success) {
        return toast(response.data.message);
      }

      // show success
      toast("Response sent successfully");

      setState({
        ...state,
        isResponseLoading: false,
        fullName: "",
        phoneNumber: "",
        locationAddress: {},
      });

      closeModal();
    } catch (error) {
      setState({
        ...state,
        isResponseLoading: false,
      });
      console.log(error);
      return toast("Oops! an error has occurred");
    }
  };

  const handleInput = async (e: any) => {
    const handleAll =
      e.target.name == "isAffected" ? e.target.value == "yes" : e.target.value;
    await setState({
      ...state,
      [`${e.target.name}`]: handleAll,
    });
  };
  return (
    <div>
      <Modal
        size="lg"
        show={showModal}
        onHide={closeModal}
        centered     
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact Nema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="px-0 px-md-2 mb-5">
            {/* full name */}
            <div className="mb-4">
              <label>
                Full Name <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control form-input"
                onChange={handleInput}
                value={state.fullName}
                placeholder="Your full name"
              />
            </div>

            {/* phone number */}
            <div className="mb-4">
              <label>
                Phone Number <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="text"
                id="phone"
                name="phoneNumber"
                className="form-control form-input"
                onChange={handleInput}
                value={state.phoneNumber}
                placeholder="Your phone number"
              />
            </div>

            {/* address */}
            <div className="mb-4">
              <label>
                Your Address<span className="text-danger">*</span>{" "}
              </label>
              {useMemo(
                () => (
                  <GooglePlacesAutocomplete
                    autocompletionRequest={{
                      componentRestrictions: { country: "ng" },
                    }}
                    apiOptions={{ region: "ng", language: "en" }}
                    apiKey={process.env.googleApiKey}
                    selectProps={{
                      locationAddress: state.locationAddress,
                      onChange: (data: any) =>
                        setState({ ...state, locationAddress: data }),
                    }}
                  />
                ),
                []
              )}
            </div>

            <div className="mb-4">
              <label>
                Are you affected?<span className="text-danger">*</span>{" "}
              </label>
              <select
                className={`form-select form-input text-truncate`}
                name="isAffected"
                onChange={handleInput}
              >
                <option value="" className="text-muted">
                  Please Select
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {state.isResponseLoading ? (
            <button
              className="btn btn-primary-color btn-normal text-white"
              disabled
            >
              Please wait...
            </button>
          ) : (
            <button
              className="btn btn-primary btn-normal text-white"
              onClick={handleCreateResponse}
            >
              Submit
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default function AlertComponent({
  item,
  alertRef,
}: AlertComponentProps) {
  const [state, setState] = useState({
    showModal: false,
  });

  const toggleModal = () => {
    setState({
      ...state,
      showModal: !state.showModal,
    });
  };

  return (
    <div
      className={`row w-100 border bg-white shadow-sm rounded-3 mb-4 p-3 py-5 p-md-3 p-lg-3`}
      key={item.id}
      ref={alertRef}
    >
      <div className="d-flex align-items-center justify-content-between">
        <h3>Early Warning Alert</h3>
        <p>{new Date(item.createdAt).toLocaleString()}</p>
      </div>
      <div className="d-flex align-items-center justify-content- pt-4">
        <div>
          <h5>Location:</h5>
          <p>
            {item.lga}, {item.state}
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-start pt-4">
        <div>
          <h5>Status:</h5>
          <p style={{ color: item.status.colorCode }}>{item.status.title}</p>
        </div>
      </div>
      <div className="pt-4">
        <h5 className="text-black fw-bold text-start">{item.title}</h5>
        <p className="">{item.description}</p>
      </div>
      <div className="pt-4">
        <ReplyComponent
          showModal={state.showModal}
          closeModal={toggleModal}
          alertId={item._id}
        />
        <button className="btn bg-transparent" onClick={toggleModal}>
          <i className="fa fa-reply pe-2"></i>
          <label>Reply</label>
        </button>
        <button className="btn bg-transparent">
          <i className="fa fa-share-alt pe-2"></i>
          <label>Share</label>
        </button>
      </div>
      <Toaster />
    </div>
  );
}
