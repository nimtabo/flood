import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import PostComponent from "./tellYourStoryPost";

export default function TellYourStoryComments(props: any) {
  let {
    parent,
    getChildren,
    comments: _comments,
    show,
    close,
    reactionTypes,
    react,
    state: _parentState,
    comment,
    getName,
  } = props;

  const [state, setState] = useState({
    comments: _comments,
  });

  const _getChildren = async () => {
    const children = await getChildren();
    setState({ ...state, comments: children });
    return children;
  };

  const showParent = () => {
    if (parent) {
      const uniqueReactions = {} as any;
      parent.reactions.forEach((item: any) => {
        uniqueReactions[item.type]
          ? (uniqueReactions[item.type] += 1)
          : (uniqueReactions[item.type] = 1);
      });

      return (
        <PostComponent
          exp={parent}
          reactionTypes={reactionTypes}
          uniqueReactions={uniqueReactions}
          react={react}
          comment={comment}
          getComments={getChildren}
          getName={getName}
        />
      );
    }
    return <p>Check Internet</p>;
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={close}
      fullscreen
      aria-labelledby="example-modal-sizes-title-lg"
      style={{ margin: "auto" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          <b>
            <div key="aa">
              <p>{parent && parent.body}</p>
              <small className="fw-lighter">: By{parent && parent.from}</small>
            </div>
          </b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className=" p-0 m-0 shadow">{show && showParent()}</div>
        <div className="light_bg mt-3 p-3">
          <h6 className="">Comments</h6>
          <hr className="my-2"></hr>
          {_comments.map((_thread: any, _threadIndex: any) => {
            const uniqueReactions = {} as any;
            _thread.reactions.forEach((item: any) => {
              uniqueReactions[item.type]
                ? (uniqueReactions[item.type] += 1)
                : (uniqueReactions[item.type] = 1);
            });

            return (
              <PostComponent
                key={_threadIndex}
                exp={_thread}
                react={react}
                state={_parentState}
                uniqueReactions={uniqueReactions}
                comment={comment}
                getComments={_getChildren}
              />
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}
