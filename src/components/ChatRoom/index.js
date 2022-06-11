import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../FireBase/index";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import SignOut from "./SignOut";
import { Avatar, Typography, Row, Col, Divider, Button } from "antd";
import SendMessage from "./SendMessage";
import { WechatOutlined } from "@ant-design/icons";
import UsersAtRoom from "./UsersAtRoom";
import "./index.scss";

const ChatRoom = () => {
  const scroll = useRef();
  const [showUserSAtRoom, setShowUserSAtRoom] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const msgCollection = collection(db, "messages");
    const q = query(msgCollection, orderBy("times"), limit(500));
    const autoLoadMessages = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setMessages(cities);
    });
  }, []);

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const autoLoadUsers = onSnapshot(usersCollection, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setUsers(cities);
    });
  }, []);

  const toDateTime = (epoch) => {
    var date = new Date(epoch * 1000);
    return date.toLocaleString();
  };

  const autoScrollToBottom = () => {
    return scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    autoScrollToBottom();
    return () => {};
  });

  const handleShowUserSAtRoom = () => {
    setShowUserSAtRoom(!showUserSAtRoom);
    return;
  };

  return (
    <>
      <Row
        style={{
          position: "fixed",
          zIndex: "10000",
          backgroundColor: "#0a8af3",
          padding: ".5rem",
          width: "100%",
        }}
        align="middle"
        justify="space-between"
        span={24}
      >
        <Col>
          <Row>
            <Typography.Title style={{ color: "#fff" }}>
              OS chat
              <WechatOutlined />
            </Typography.Title>
          </Row>
          <Row justify="start" align="middle">
            <Avatar
              style={{ marginRight: "5px", border: "1px solid #fff" }}
              size={23}
              src={auth.currentUser.photoURL}
            />
            <Typography.Text style={{ color: "#fff", marginRight: "1rem" }}>
              {auth.currentUser.displayName}
            </Typography.Text>
            <Button
              onClick={handleShowUserSAtRoom}
              style={{ backgroundColor: "rgb(10, 138, 243)", border: "none" }}
            >
              <Avatar.Group
                style={{ cursor: "pointer" }}
                maxCount={2}
                maxPopoverTrigger="click"
                size={"small"}
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  cursor: "pointer",
                }}
              >
                {users.map((item) => (
                  <span key={item.uid}>
                    <Avatar src={item.photoURL} />
                  </span>
                ))}
                <Divider />
              </Avatar.Group>
            </Button>
          </Row>
        </Col>
        <SignOut />
      </Row>
      <div className="container-chatbox">
        <div className="container-message">
          {messages.map((item) => (
            <div
              className={
                auth.currentUser.displayName === item.displayName
                  ? "container-chatbox__message-mine"
                  : "container-chatbox__message-other"
              }
              style={{ marginBottom: ".7rem" }}
              key={item.idMsg}
            >
              <Row
                align="middle"
                justify={
                  auth.currentUser.displayName === item.displayName
                    ? "end"
                    : "start"
                }
              >
                <Col>
                  <Avatar
                    style={{ marginRight: "8px", border: "3px solid #fff" }}
                    size={35}
                    src={item.photoURL}
                  />
                </Col>
                <Col>
                  <Typography.Text
                    style={{
                      color:
                        auth.currentUser.displayName === item.displayName
                          ? "gray"
                          : "#eee",
                    }}
                    strong={true}
                  >
                    {item.displayName}
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                wrap={true}
                align="middle"
                justify={
                  auth.currentUser.displayName === item.displayName
                    ? "end"
                    : "start"
                }
              >
                <Typography.Text
                  style={{
                    color:
                      auth.currentUser.displayName === item.displayName
                        ? "#111111"
                        : "#fff",
                    fontSize: "16px",
                  }}
                >
                  {item.msg}
                </Typography.Text>
              </Row>
              <Row
                justify={auth.currentUser.uid === item.uid ? "end" : "start"}
                span={24}
              >
                <Typography.Text
                  style={{
                    color:
                      auth.currentUser.uid === item.uid ? "#afaeae" : "#d5d5d5",
                    fontSize: "12px",
                  }}
                >
                  {toDateTime(item.times.seconds)}
                </Typography.Text>
              </Row>
              <div className="arrow"></div>
            </div>
          ))}
        </div>
      </div>
      <Row
        style={{
          position: "fixed",
          zIndex: "9999",
          bottom: "0rem",
          left: "0",
          right: "0",
        }}
      >
        <SendMessage scroll={scroll} />
      </Row>
      <div ref={scroll}>
        {" "}
        {showUserSAtRoom && (
          <UsersAtRoom setShowUserSAtRoom={setShowUserSAtRoom} />
        )}
      </div>
    </>
  );
};

export default ChatRoom;
