import React from "react";
import { Link } from "react-router-dom";
import { getFromStorage, setInStorage } from "./storage";
function Block(props) {
  //alert(props.name);
  // alert(getFromStorage('id'));

  if (props.name == getFromStorage("username")) {
    return (
      <div>
        <div className="div">
          <p style={{ fontSize: "40px" }}>
            <u>{props.name}</u>
          </p>

          <div style={{ backgroundColor: "white" }}>
            <p style={{ fontSize: "20px" }}>{props.tweet}</p>
          </div>
          <br />

          <Link
            style={{ marginLeft: "78%" }}
            to={{ pathname: "/edit/" + props.item._id }}
          >
            Edit{" "}
          </Link>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              props.delete(props.item._id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="div">
          <p style={{ fontSize: "40px" }}>
            <u>{props.name}</u>
          </p>

          <div style={{ backgroundColor: "white" }}>
            <p style={{ fontFamily: "Helvetica Neue", fontSize: "20px" }}>
              {props.tweet}
            </p>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default Block;