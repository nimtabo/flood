import axios from "axios";
import React, { useEffect, useState } from "react";
import useFloodExperience from "../src/hooks/useFloodExperience";
import TellYourStoryComments from "../src/components/tellYourStoryComments";
import ErrorBoundary from "../src/ErrorBoundry";
import dynamic from "next/dynamic";
import SlideShow from "../src/components/headerCarousel";

const ReportScreen = dynamic(() => import("../src/screens/ReportScreen"), {
  ssr: false,
});

// swrConfig
import { useSWRConfig } from "swr";
import PostComponent from "../src/components/tellYourStoryPost";
import { nameStorageKey, reactionTypes } from "../src/constants/constants";
import Modal from "react-bootstrap/Modal";

export default function TellYourStory() {
  const { mutate } = useSWRConfig();

  const [state, setState] = useState({
    threadId: "",
    post: "",
    comment: "",
    comments: [] as any,
    reaction: "",
    _name: "",
    parent: null,
    showComments: false,
    showReportForm: true,
  });

  const { data: response, isError, isLoading } = useFloodExperience();

  const closeModals = () => {
    setState({ ...state, showComments: false, showReportForm: false });
  };

  const getName = () => {
    if (typeof window != "undefined") {
      const _name = localStorage.getItem(nameStorageKey) || "";
      setState({ ...state, _name: _name });
      return _name;
    }
  };

  const setName = (name: string) => {
    if (typeof window != "undefined") {
      setState({ ...state, _name: name });
      return localStorage.setItem(nameStorageKey, name);
    }
  };

  const handleInput = async (e: any) => {
    await setState({
      ...state,
      [`${e.target.name}`]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("data changed");
  }, [response]);

  useEffect(() => {
    getName();
  }, []);

  const getComments = async (post) => {
    try {
      const comments = await axios.get(
        `${process.env.API_ROOT}/fetch-comments?_id=${post._id}`
      );
      await setState({
        ...state,
        threadId: post._id,
        showComments: true,
        comments: comments.data.data,
        parent: post,
      });
    } catch (err) {
      alert("Error Fetching comments" + err.toString());
    }
  };

  const createPost = async (_body, _from) => {
    try {
      const _newPost = await axios.post(`${process.env.API_ROOT}/create-post`, {
        body: _body,
        from: _from,
      });
      await mutate(`${process.env.API_ROOT}/fetch-threads`);
      return _newPost;
    } catch (err) {
      console.log("Post error", err);
    }
  };

  const comment = async (_parent_id, _body, _from) => {
    try {
      const comment = await axios.post(
        `${process.env.API_ROOT}/comment-on-post`,
        {
          parent_id: _parent_id,
          body: _body,
          from: _from,
        }
      );
      setState({ ...state, comment: "" });
      await mutate(`${process.env.API_ROOT}/fetch-threads`);
      return comment;
    } catch (err) {
      console.log("comment failed failed!!1, invalid reaction", err);
    }
  };

  const react = async (_reaction, _id, _from) => {
    try {
      const validReactions = Object.keys(reactionTypes);
      if (validReactions.includes(_reaction)) {
        const _react = await axios.post(
          `${process.env.API_ROOT}/react-to-post`,
          {
            _id: _id,
            reaction: _reaction,
            from: _from,
          }
        );
        await mutate(`${process.env.API_ROOT}/fetch-threads`);
        if (state.showComments) {
          await getComments(state.parent);
        }
        return _react;
      }
      console.log("reaction failed!!1, invalid reaction");
    } catch (err) {
      console.log("react error", err);
    }
  };

  const floodExperiencesComponent =
    response &&
    response.data.map((exp, index) => {
      const uniqueReactions = {};
      exp.reactions.forEach((item) => {
        uniqueReactions[item.type]
          ? (uniqueReactions[item.type] += 1)
          : (uniqueReactions[item.type] = 1);
      });

      return (
        <PostComponent
          className="col col-12 col-sm-12 col-lg-6 p-0 "
          key={index}
          exp={exp}
          react={react}
          uniqueReactions={uniqueReactions}
          comment={comment}
          getComments={getComments}
        />
      );
    });

  const images = [
    "/home-header-slide-images/flood5.jpg",
  ];

  return (
    <>
      <section
        className="row m-0 p-0 d-flex "
        style={{ maxWidth: "100vw", height: "92vh" }}
      >
        <SlideShow
          title="Flood Safety Tips and Resources"
          description="Flooding is a coast-to-coast threat to some part of the Nigeria States and its territories"
          btnText={`What To Know`}
          height="92vh"
          images={images}
        />
      </section>
      <div className="p-0">
        <ErrorBoundary>
          <div className="p-0 bg-success">
            <Modal
              size="xl"
              show={state.showReportForm}
              onHide={closeModals}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>FLood Report Form</Modal.Title>
              </Modal.Header>
              <Modal.Body
                className="p-0"
                style={{ borderRadius: "0px", border: "none" }}
              >
                <ReportScreen />
              </Modal.Body>
            </Modal>
          </div>
          <div className="">
            <div className="w-100 d-flex flex-column align-items-center">
              <div className="container-fluid w-100 w-sm-100 w-lg-75 pt-3">
                <h1 className="text-start py-3 " style={{ alignSelf: "start" }}>
                  Flood Experiences
                </h1>
                <section className=" row g-4 my-3 w-100 ">
                  <div className="col col-12 col-sm-12 col-lg-6 m-0 p-0 ">
                    <div
                      className={`bg-white rounded shadow-sm p-2 
                  mb-2 mb-sm-2 mb-lg-0
                  me-0 me-sm-0 me-lg-2
                  `}
                    >
                      <div
                        className="d-flex align-items-center justify-content-between "
                        style={{ height: "50px" }}
                      >
                        <input
                          className=" light_bg ps-2 p-3"
                          value={state._name}
                          name="_name"
                          onChange={handleInput}
                          placeholder="Register Name.."
                          style={{
                            outline: "none",
                            border: "0 solid red",
                            borderRadius: "5px",
                            height: "100%",
                            width: "80%",
                          }}
                        />
                        <div
                          className="btn new_blue_bg text-white  ms-2 d-flex justify-content-center align-items-center"
                          style={{
                            // fontSize: "0.8rem",
                            width: "20%",
                            height: "100%",
                          }}
                          onClick={() => {
                            setName(state._name);
                          }}
                        >
                          <p className="p-1">save Name</p>
                        </div>
                      </div>
                      <hr className="my-2"></hr>
                      <p className="">
                        Registered Name: <b>{state._name || "No data"}</b>
                      </p>
                    </div>
                  </div>

                  <div className="col col-12 col-sm-12 col-lg-6 m-0 p-0">
                    <div
                      className={`
                d-flex align-items-center 
                bg-white justify-content-between
                mb-2 mb-sm-2 mb-lg-0
                ms-0 ms-sm-0 ms-lg-2
                h-100
                 p-2  shadow-sm rounded`}
                    >
                      <textarea
                        className=" light_bg ps-2 py-2"
                        placeholder="Create Post...."
                        value={state.post}
                        name="post"
                        onChange={handleInput}
                        style={{
                          outline: "none",
                          border: "0 solid red",
                          width: "80%",
                          borderRadius: "5px",
                          height: "100%",
                        }}
                      />
                      <div
                        className="btn bg-success text-white ms-2 d-flex  justify-content-center align-items-center"
                        style={{
                          // fontSize: "0.8rem",
                          width: "20%",
                          height: "100%",
                        }}
                        onClick={async () => {
                          await createPost(state.post, state._name);
                        }}
                      >
                        <p className="fs-6">Post</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-0 mt-sm-3 mt-lg-0 mx-0 p-0">
                    {floodExperiencesComponent}
                  </div>

                  <TellYourStoryComments
                    parent={state.parent}
                    getChildren={getComments}
                    show={state.showComments}
                    close={closeModals}
                    reactionTypes={reactionTypes}
                    react={react}
                    comment={comment}
                    comments={state.comments}
                    getName={getName}
                  />
                </section>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
}
