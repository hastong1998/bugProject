import React from "react";
import { Button, Input } from "antd";

import {
  UserOutlined,
  LockOutlined,
  DownloadOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { withFormik, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { USER_SIGNIN_API } from "../../../redux/constans/Cyberbugs/Cyberbugs";
import { signinCyberbugAction } from "../../../redux/actions/CyberBugsActions";
import { NavLink } from "react-router-dom";
function LoginCyberBugs(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <form onSubmit={handleSubmit} className="container">
      <div
        className="d-flex  flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <div className="mb-5 w-100 d-flex justify-content-end flex-column">
          <p className="m-0">Try other project ? </p>
          <NavLink to="/home"> Press Here</NavLink>
        </div>
        <h3 className="text-center">LOGIN CYBERBUG PROJECT</h3>
        <Input
          name="email"
          onChange={handleChange}
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
        />
        <div className="text-danger">{errors.email}</div>
        <Input
          onChange={handleChange}
          name="password"
          type="password"
          size="large"
          placeholder="Password"
          prefix={<LockOutlined />}
        />
        <div className="text-danger">{errors.password}</div>
        <Button htmlType="submit" size="large">
          Login
        </Button>
        <div className="d-flex  mt-2">
          <Button
            className="mr-3"
            type="primary"
            shape="circle"
            icon={<FacebookOutlined />}
          />
          <Button
            type="primary"
            shape="circle"
            className="mr-3"
            icon={<TwitterOutlined />}
          />
          <div>
            <p>
              Don't have an account? <br />
              <NavLink to="/signup">Create account here</NavLink>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  // Custom sync validation
  handleChange: (e) => {},
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email is in valid!"),
    password: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password must have max 32 characters"),
    phoneNumber: Yup.string()
      .min(10, "Phone number must have min 10 characters")
      .max(12, "Phone number must have max 12 characters"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(signinCyberbugAction(values.email, values.password));
  },

  displayName: "Login CyberBugs",
})(LoginCyberBugs);
export default connect()(LoginCyberBugsWithFormik);
