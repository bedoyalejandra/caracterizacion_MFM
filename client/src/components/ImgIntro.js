import React, { Fragment } from "react";
import Img from "../images/intro.png";
import { Card } from "react-bootstrap";

const ImgIntro = () => {
  return (
    <Fragment>
      <Card className="text-center" style={{ width: "40rem" }}>
          <img src={Img} height="600" />
      </Card>
    </Fragment>
  );
};

export default ImgIntro;
