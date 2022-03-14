import React from "react";
import { useState } from "react";
import { Prompt } from "react-router-dom";
export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    taiKhoan: "",
    matKhau: "",
    status: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };
    let valid = true;
    for (let key in newUserLogin) {
      if (key !== "status") {
        if (newUserLogin[key].trim() === "") {
          valid = false;
        }
      }
    }
    if (!valid) {
      newUserLogin.status = true;
    } else {
      newUserLogin.status = false;
    }
    setUserLogin(newUserLogin);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      userLogin.taiKhoan === "cyberlearn" &&
      userLogin.matKhau === "cyberlearn"
    ) {
      //thành công chuyển về tranmg trc đó
      //   props.history.goBack();
      props.history.replace("/home");
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Login false");
      return;
    }
  };
  return (
    <form className="container" onSubmit={handleLogin}>
      <div className="form-group">
        <p>Tài Khoản</p>
        <input
          name="taiKhoan"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Mật khẩu</p>
        <input
          name="matKhau"
          type="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success">Đăng nhập</button>
      </div>
      <Prompt
        when={userLogin.status}
        message={(location) => {
          return "Banj cos chacws muon roi khoi trang";
        }}
      />
    </form>
  );
}
