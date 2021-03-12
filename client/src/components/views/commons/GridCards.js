import React from "react";
import { Col } from "antd";

function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              src={props.image}
              alt={props.movieName}
              style={{ width: "100%", height: "auto" }}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            src={props.image}
            alt={props.characterName}
            style={{ width: "100%", height: "auto" }}
          />
          {props.characterName}
        </div>
      </Col>
    );
  }
}

export default GridCards;
