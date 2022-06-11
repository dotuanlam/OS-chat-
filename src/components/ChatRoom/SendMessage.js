import React, { useState } from "react";
import { Row, Button, Input, Col } from "antd";
import { auth, db } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { CaretRightOutlined } from "@ant-design/icons";
const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
    e.preventDefault();
    if (message === "") {
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    const messagesFireStore = collection(db, "messages");
    addDoc(messagesFireStore, {
      idMsg: uuidv4(),
      msg: message,
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
      times: new Date(),
    });
    setMessage("");
  };
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Row style={{ backgroundColor: "#eee" }} justify="start" span={24}>
        <Col span={24}>
          <Input
            value={message}
            style={{ padding: "1rem 5rem 1rem 1rem", borderRadius: "2rem" }}
            autoFocus
            onPressEnter={onSubmit}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Messages..."
          />
          <Button
            style={{
              border: "none",
              position: "absolute",
              right: "1rem",
              top: "0.3rem",
              borderRadius: "10rem",
              height: "fit-content",
            }}
            onClick={onSubmit}
          >
            <CaretRightOutlined
              style={{ color: "#0a8af3", fontSize: "2.3rem" }}
            />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SendMessage;
