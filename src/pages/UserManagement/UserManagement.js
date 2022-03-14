import React, { useEffect, useState } from "react";
import { Popover, Table } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_SAGA,
  GET_ALL_USER_SAGA,
  HANDLE_USER_API,
  SET_USER_EDIT,
  UPDATE_USER_SAGA,
} from "../../redux/constans/Cyberbugs/UserConst";
import FormEditUser from "../../components/Forms/FormEditUser/FormEditUser";

export default function UserManagement() {
  const [keyWord, setKeyWord] = useState("");
  useEffect(() => {
    dispatch({
      actionType: GET_ALL_USER_SAGA,
      type: HANDLE_USER_API,
      keyWord,
    });
    return () => {};
  }, []);
  const listUser = useSelector((state) => state.UserManagementReducer.listUser);
  const { userLogin } = useSelector((state) => state.UserLoginCyberBugsReducer);

  const dispatch = useDispatch();
  const handleOnchange = (e) => {
    setKeyWord(e.target.value);
    dispatch({
      type: GET_ALL_USER_SAGA,

      keyWord,
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              onClick={() => {
                dispatch({
                  type: "OPEN_FORM_EDIT_USER",
                  ComponentContentDrawer: <FormEditUser />,
                });
                dispatch({
                  type: SET_USER_EDIT,
                  userEdit: {
                    id: record.userId,
                    passWord: "123456",
                    email: record.email,
                    name: record.name,
                    phoneNumber: record.phoneNumber,
                  },
                });
              }}
              className="btn btn-primary mr-3"
            >
              <i className="fa fa-user-edit" />
            </button>
            <Popover
              placement="top"
              title={<span>Delete User</span>}
              content={
                <div>
                  <p>Are you sure to delete this user</p>
                  <button
                    onClick={() => {
                      dispatch({
                        actionType: DELETE_USER_SAGA,
                        type: HANDLE_USER_API,
                        id: record.userId,
                      });
                    }}
                    className="btn btn-danger mr-2"
                  >
                    Yes
                  </button>
                </div>
              }
              trigger="click"
            >
              <button className="btn btn-danger">
                <i className="fa fa-trash-alt" />
              </button>
            </Popover>
          </div>
        );
      },
    },
  ];

  function onChange(pagination, filters, sorter, extra) {}

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end">
        <div className="d-flex">
          <p style={{ fontWeight: "bold", fontSize: "25px" }}>
            Xin Chào!{" "}
            <span
              style={{
                textShadow: "0px 2px 7px #f00",
                color: "Red",

                fontWeight: "bold",
              }}
            >
              {userLogin.name}
            </span>
            <img
              className="ml-2"
              style={{ borderRadius: "50%" }}
              src={userLogin.avatar}
              alt={userLogin.avatar}
            />
          </p>
        </div>
      </div>
      <div className="mb-5">
        <NavLink style={{ fontSize: 25 }} to="/signUp">
          Create User
        </NavLink>
        <div className="d-flex ">
          <input className="form-control" onChange={handleOnchange}></input>
          <button
            onClick={() => {
              dispatch({
                type: GET_ALL_USER_SAGA,
                keyWord,
              });
            }}
            className="btn btn-success"
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={listUser} onChange={onChange} />
      </div>
    </div>
  );
}
