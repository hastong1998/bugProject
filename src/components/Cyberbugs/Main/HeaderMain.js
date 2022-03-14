import React from "react";
import ReactHtmlParser from "html-react-parser";
export default function HeaderMain(props) {
  const { projectDetail } = props;
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li className="breadcrumb-item active" aria-current="page">
            Cyber Board
          </li>
        </ol>
      </nav>
      <h3>{projectDetail.projectName}</h3>
    </div>
  );
}
