import React from "react";
import stylefrom from "../LoadingComponent/LoaingComponent.module.css";
import { useSelector } from "react-redux";
export default function LoadingComponent() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  if (isLoading) {
    return (
      <div className={stylefrom.bgLoading}>
        <img src={require("../../../assets/imgLoading/Loader.gif")} />
      </div>
    );
  } else {
    return "";
  }
}
