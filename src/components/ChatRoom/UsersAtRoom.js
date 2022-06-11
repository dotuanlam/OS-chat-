import React, { useState, useEffect } from "react";
import { db } from "../FireBase";
import { collection, onSnapshot } from "firebase/firestore";
import { Avatar, Row, Typography } from "antd";
const UsersAtRoom = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersCollection = collection(db, "users");
    const autoLoadUsersAtRoom = onSnapshot(usersCollection, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setUsers(cities);
    });
  }, []);
  const handleShowUsersAtRoom = () => {
    props.setShowUserSAtRoom(false);
    return;
  };
  return (
    <div
      onClick={handleShowUsersAtRoom}
      style={{
        zIndex: "9999999",
        scrollBehavior: "smooth",
        padding: "1rem",
        width: "100%",
        minHeight: "100vh",
        position: "absolute",
        backgroundColor: "rgba(1,1,1,.6)",
      }}
      className="container__user-logined"
    >
      {users.map((item) => (
        <div key={item.uid}>
          <Row
            style={{ marginBottom: "1rem" }}
            span={24}
            justify="start"
            align="middle"
          >
            <Avatar
              style={{ marginRight: "10px" }}
              size={50}
              src={item.photoURL}
            />
            <Typography.Title
              style={{ color: "#eee", overflowWrap: "anywhere" }}
              level={3}
            >
              {item.displayName}
            </Typography.Title>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default UsersAtRoom;
