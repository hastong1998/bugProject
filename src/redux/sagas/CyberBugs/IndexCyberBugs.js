import React, { useEffect } from "react";
import ContentMain from "../../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";
export default function IndexCyberBugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const { projectId } = props.match.params;

    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId,
    });
  });

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail}></HeaderMain>

      <InfoMain members={projectDetail.members}></InfoMain>
      <ContentMain projectDetail={projectDetail}></ContentMain>
    </div>
  );
}
