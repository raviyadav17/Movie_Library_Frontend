import React from "react";
import Errorimg from "../../assets/images/error.jpg"
import "./ErrorPage.css";

function ErroPage() {
  return (
    <div className="error-wrap">
      <p className="error-404">404 Not Found</p>
      <img src={Errorimg} alt="404 Not Found"/>
    </div>
  );
}

export default ErroPage;
