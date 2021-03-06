import React from "react";
import Rating from "../Rating/Rating";
import config from "../config";
import "./BookmarkItem.css";

function deleteBookmarkRequest(bookmarkId, cb) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${config.API_KEY}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => Promise.reject(error));
      }
      return res.text();
    })
    /*.then(data => {
      cb(bookmarkId)
    })*/
    .then((data) => {
      cb(bookmarkId ? JSON.parse(bookmarkId) : {});
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function BookmarkItem(props) {
  return (
    <li className="BookmarkItem">
      <div className="BookmarkItem__row">
        <h3 className="BookmarkItem__title">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className="BookmarkItem__description">{props.description}</p>
      <div className="BookmarkItem__buttons">
     
        <button
          className="BookmarkItem__description"
          onClick={() => deleteBookmarkRequest(props.id, props.onClickDelete)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
};
