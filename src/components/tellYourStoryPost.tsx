import React, { useEffect, useState } from "react";
import { nameStorageKey, reactionTypes } from "../constants/constants";

export default function PostComponent(props: any) {
  const { exp,  react, uniqueReactions, comment, getComments } =
    props;

  const [state, setState] = useState({
    comment: "",
    _name: "",
  });

  const getName = () => {
    if (typeof window != "undefined") {
      const _name = localStorage.getItem(nameStorageKey) || "";
      setState({ ...state, _name: _name });
      return _name;
    }
  };

  const handleInput = (e: any) => {
    setState({
      ...state,
      [`${e.target.name}`]: e.target.value,
    });
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <div className="d-flex my-2 flex-column shadow-sm">
        <div
          className={`d-flex align-items-center 
          justify-content-between p-2
          new_blue_bg text-white
          
          `}
          style={{ minHeight: "60px" }}
        >
          <h6>
            <span className="fw-light">By: </span>
            {exp.from || "Anonymous"}
          </h6>
          <h6 className="fw-light">
            {new Date(exp.createdAt).toLocaleString()}
          </h6>
        </div>
        <div className=" p-sm-1 p-lg-1 row bg-white pb-2  h-100">
          <div className="col col-sm-12 ">
            <p style={{ minHeight: "100px" }}>{exp.body}</p>
            <small>{exp.commentCount}: Comments</small>
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center flex-wrap">
                {Object.keys(reactionTypes).map(
                  (_reactionType, _reactionIndex) => {
                    return (
                      <div
                        key={_reactionIndex}
                        className="d-flex justify-content-around m-1 p-2 shadow-sm btn"
                      
                        onClick={async () => {
                          await react(_reactionType, exp._id, state._name);
                        }}
                      >
                        <p className="fs-3">{reactionTypes[_reactionType] }</p>
                        <p className="fs-6">
                          {uniqueReactions[_reactionType] || 0}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            {exp["isPost"] && (
              <div
                className="col d-flex justify-content-around align-items-center mt-2"
                style={{ height: "40px" }}
              >
                <input
                  className=" light_bg ps-3"
                  placeholder="Drop a Comment..."
                  value={state.comment}
                  name="comment"
                  onChange={handleInput}
                  style={{
                    outline: "none",
                    border: "0 solid red",
                    borderRadius: "5px",
                    width: "80%",
                    height: "100%",
                  }}
                />
                <div
                  className="btn bg-success text-white ms-1 d-flex  justify-content-center align-items-center"
                  style={{ fontSize: "0.8rem", width: "20%", height: "100%" }}
                  onClick={async () => {
                    await comment(exp._id, state.comment, state._name);
                  }}
                >
                  <p>Send</p>
                </div>
                <div
                  className={`btn new_blue_bg text-white  ms-1 d-flex justify-content-center align-items-center`}
                  style={{
                    fontSize: "0.8rem",
                    width: "20%",
                    height: "100%",
                    opacity: exp.commentCount < 1 ? "0.2" : "1",
                  }}
                  onClick={async () => {
                    exp.commentCount > 0 && (await getComments(exp));
                  }}
                >
                  <p>Comments</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
