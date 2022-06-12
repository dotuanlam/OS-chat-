import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Typography, Image } from "antd";
import { GooglePlusOutlined, FacebookOutlined } from "@ant-design/icons";
import { db } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../FireBase";
import "./index.scss";

const Signin = () => {
  const navigate = useNavigate();
  const handleFacebookSignIn = () => {
    const fbProvider = new FacebookAuthProvider();
    signInWithPopup(auth, fbProvider)
      .then((res) => {
        if (res?.user) {
          const details = getAdditionalUserInfo(res);
          if (details.isNewUser === true) {
            const { uid, displayName, photoURL } = auth.currentUser;
            const usersInfor = collection(db, "users");
            addDoc(usersInfor, {
              uid: uid,
              displayName: displayName,
              photoURL: photoURL,
            });
          }
          navigate("/");
          return;
        } else {
          navigate("/Signin");
        }
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  };
  const handleGoogleSignIn = () => {
    const ggProvider = new GoogleAuthProvider();
    signInWithPopup(auth, ggProvider)
      .then((res) => {
        if (res?.user) {
          const details = getAdditionalUserInfo(res);
          if (details.isNewUser === true) {
            const { uid, displayName, photoURL } = auth.currentUser;
            const usersInfor = collection(db, "users");
            addDoc(usersInfor, {
              uid: uid,
              displayName: displayName,
              photoURL: photoURL,
            });
          }

          navigate("/");
          return;
        } else {
          navigate("/Signin");
        }
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  };

  return (
    <div className="Signin">
      <Row justify="center" style={{ height: 200, width: "100%" }}>
        <Col xs={23} sm={15} md={10} lg={10} xxl={8} xl={8}>
          <Typography.Title style={{ textAlign: "center", color: "#1890ff" }}>
            OS chat
          </Typography.Title>
          <Row justify="center">
            <Image
              style={{ borderRadius: 50 }}
              alt="avatar-oschat"
              height={100}
              width={150}
              src="https://i.pinimg.com/736x/44/16/3d/44163ddc3a29ffa7e7af66732956304b.jpg"
            />
          </Row>
          <Button
            onClick={handleGoogleSignIn}
            type="danger"
            style={{
              width: "100%",
              marginBottom: 5,
              marginTop: 10,
              overflow: "auto",
            }}
          >
            Đăng nhập bằng tài khoản Google <GooglePlusOutlined />
          </Button>
          <Button
            onClick={handleFacebookSignIn}
            type="primary"
            style={{ width: "100%" }}
          >
            Đăng nhập bằng tài khoản Facebook <FacebookOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Signin;
