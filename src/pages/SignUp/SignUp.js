import React, { useState } from "react";
import { withFormik, Formik, validateYupSchema } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { connect } from "react-redux";
import { set, values } from "lodash";
import { SIGN_UP_SAGA } from "../../redux/constans/Cyberbugs/SignUpConst";
function SignUp(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <div
      onSubmit={handleSubmit}
      style={{ height: "100%" }}
      className="d-flex justify-content-center  align-items-center"
    >
      <div>
        <h1 className="text-center mb-5">Sign Up</h1>
        <form>
          <div className="form-row">
            <div className="form-group col-12">
              <label>Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
              />
              <div className="text-danger">{errors.email}</div>
            </div>
            <div className="form-group col-12">
              <label>Password</label>
              <input
                onChange={handleChange}
                name="passWord"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <div className="text-danger">{errors.passWord}</div>
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              onChange={handleChange}
              name="phoneNumber"
              type="tel"
              className="form-control"
              placeholder="Phone number ..."
            />
            <div className="text-danger">{errors.phoneNumber}</div>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter your name ..."
            />
          </div>
          <div className="d-flex justify-content-around">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
            <p>
              Aleady have an account? <br />
              <NavLink to="/login">Log in here</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
const SignUpCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  }),
  handleChange: (e) => {},
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email is in valid!"),
    passWord: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password must have max 32 characters"),
    phoneNumber: Yup.string()
      .min(10, "Phone number must have min 10 characters")
      .max(12, "Phone number must have max 12 characters"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: SIGN_UP_SAGA,
      signUpUser: {
        email: values.email,
        passWord: values.passWord,
        name: values.name,
        phoneNumber: values.phoneNumber,
        history: props.history,
      },
    });
  },
})(SignUp);
export default connect()(SignUpCyberBugsWithFormik);
