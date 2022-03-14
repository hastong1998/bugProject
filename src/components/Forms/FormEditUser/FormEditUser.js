import React, { useEffect, useState } from "react";
import { withFormik, Formik, validateYupSchema } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  HANDLE_USER_API,
  UPDATE_USER_SAGA,
} from "../../../redux/constans/Cyberbugs/UserConst";
function FormEditUser(props) {
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  dispatch({
    type: "SET_SUBMIT_EDIT_USER",
    callBackSubmit: handleSubmit,
  });

  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-12">
            <label>User Id</label>
            <input
              onChange={handleChange}
              type="text"
              name="id"
              value={values.id}
              disabled
              className="form-control"
              placeholder="User Id"
            />
          </div>
          <div className="form-group col-12">
            <label>Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={values.email}
              className="form-control"
              placeholder="Email"
            />
            <div className="text-danger">{errors.email}</div>
          </div>
          <div className="form-group col-12">
            <label>
              Password{" "}
              <span>
                (Do api không trả password nên password mặc định khi sửa user
                lại: 123456)
              </span>
            </label>
            <input
              onChange={handleChange}
              name="passWord"
              disabled
              value={values.passWord}
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
            value={values.phoneNumber}
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
            value={values.name}
            onChange={handleChange}
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter your name ..."
          />
        </div>
      </form>
    </div>
  );
}
const editUserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = props;
    console.log("props", props);
    return {
      id: userEdit.id,
      passWord: userEdit.passWord,
      email: userEdit.email,
      name: userEdit.name,
      phoneNumber: userEdit.phoneNumber,
    };
  },

  // Custom sync validation

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
    props.dispatch({
      type: HANDLE_USER_API,
      actionType: UPDATE_USER_SAGA,
      values,
    });
  },

  displayName: "FormEditUser",
})(FormEditUser);
const mapStateToProps = (state) => ({
  userEdit: state.UserManagementReducer.userEdit,
});
export default connect(mapStateToProps)(editUserForm);
