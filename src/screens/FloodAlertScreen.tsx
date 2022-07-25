import React, { useRef, useState, useEffect } from "react";
import ErrorBoundry from "../ErrorBoundry";
import FloodAlerts from "../modules/FloodAlerts";
import SlideShow from "../components/headerCarousel";
import { useRouter } from "next/router";

import { nigerianStates } from "nigerian-states-and-lgas";

export type QueryType = {
  state: string;
  localGovt: string | undefined;
};

function FloodAlertScreen() {
  const router = useRouter();

  const { state: queryState, lga: queryLGA } = router.query;

  const queryStateValid = nigerianStates.states().includes(queryState);
  const queryLGAValid =
    queryStateValid && nigerianStates.lgas(queryState).includes(queryLGA);

  const [stateList, setStateList] = useState([]);

  const [stateRef, setStateRef] = useState(
    queryStateValid ? (queryState as string) : ""
  );

  const [localGovtRef, setLocalGovtRef] = useState(
    queryLGAValid ? (queryLGA as string) : ""
  );

  const [query, setQuery] = useState<QueryType>({
    state: queryStateValid ? (queryState as string) : "",
    localGovt: queryLGAValid ? (queryLGA as string) : "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      state: stateRef,
      localGovt: localGovtRef,
    };

    setQuery(data);
  }

  useEffect(() => {
    setStateList(nigerianStates.states());
    console.log(query);
  }, []);

  return (
    <div className="col-11 col-md-11 col-lg-11 p-0 p-md-0 p-lg-0 ovefflow-hidden">
      <div className="row w-100 p-0 m-0 d-flex flex-column flex-lg-row justify-content-between align-content-center">
        <form className=" d-flex justify-content-start" onSubmit={handleSubmit}>
          <div
            className={`d-flex flex-column flex-sm-column  flex-md-row flex-lg-row align-items-start align-items-md-center`}
          >
            <p className="fw-bold me-2 my-2">Enter Location:</p>
            <div className="d-flex justify-content-center align-items-center  my-2">
              <label className="me-2" style={{ width: "40px" }}>
                State
              </label>
              <select
                className="form-select form-select me-2"
                required
                onChange={(e) => setStateRef(e.target.value)}
                aria-label=".form-select-lg example"
                style={{ width: "10rem" }}
                defaultValue={stateRef}
              >
                <option value="">Select State</option>
                {stateList.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-center align-items-center  my-2">
              <label className="me-2" style={{ width: "40px" }}>
                LGA
              </label>
              <select
                required
                className="form-select form-select me-2"
                onChange={(e) => setLocalGovtRef(e.target.value)}
                aria-label=".form-select-lg example"
                style={{ width: "10rem" }}
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
            <div className="py-2">
              <button
                className="btn btn text-white new_blue_bg p-1"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div
          className="rounded-3 col me-lg-0 d-flex flex-column justify-content-center overflow-hidden align-items-center p-2"
          style={{ height: "700px" }}
        >
          <h5 className="text-muted">Search Results</h5>
          <div className="w-100 d-flex flex-column flex-grow-1 overflow-scroll px-md-4 px-lg-4 mt-3">
            <ErrorBoundry>
              <FloodAlerts query={query} />
            </ErrorBoundry>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FloodAlertScreen);
