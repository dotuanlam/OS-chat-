import React from "react";
import { Button, Image, Row } from "antd";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleButtonBackHome = () => {
    navigate("/");
    return;
  };
  return (
    <div>
      <Row justify="center" span={24}>
        <Image
          preview={false}
          alt="image-page-not-found"
          src="https://i.pinimg.com/originals/cc/2c/0b/cc2c0bae7ddc00fe9164fe1ef968f99e.gif"
        ></Image>
      </Row>
      <Row justify="center" span={24}>
        <Button
          onClick={handleButtonBackHome}
          style={{ width: "20rem" }}
          size="large"
          type="danger"
        >
          Go to Home
        </Button>
      </Row>
    </div>
  );
};

export default PageNotFound;
