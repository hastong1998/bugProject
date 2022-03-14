import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParse from "html-react-parser";
import { GET_ALL_STATUS_SAGA } from "../../../../redux/constans/Cyberbugs/StatusConst";
import { GET_ALL_PRIORITY_SAGA } from "../../../../redux/constans/Cyberbugs/PriorityConst";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  DELETE_COMMENT,
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT_SAGA,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../../redux/constans/Cyberbugs/TaskConst";

import { Select } from "antd";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../../redux/constans/Cyberbugs/TaskTypeConst";
import { Editor } from "@tinymce/tinymce-react";
export default function ModalCyberBugs() {
  const { taskDetailModal } = useSelector((state) => state.TaskDetailModel);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const [content, setContent] = useState(taskDetailModal.description);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { userLogin } = useSelector((state) => state.UserLoginCyberBugsReducer);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [visibleComment, setVisibleComment] = useState(-1);
  const [visibleAddComment, setVisibleAddComment] = useState(false);
  const renderComment = (item, index) => {
    const jsxCommentContent = ReactHtmlParse(item.commentContent);
    if (visibleComment === index) {
      return (
        <div>
          <Editor
            name="description"
            initialValue={item.commentContent}
            init={{
              selector: "textarea#myTextArea",
              height: 100,
              width: "100%",
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
alignleft aligncenter alignright alignjustify | \
bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content, editor) => {
              setComment(content);
            }}
          />
          <button
            className="btn btn-success"
            onClick={() => {
              dispatch({
                type: HANDLE_CHANGE_POST_SAGA,
                actionType: UPDATE_COMMENT_SAGA,
                contentComment: comment,
                id: item.id,
                taskId: taskDetailModal.taskId,
              });
              setVisibleComment(-1);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setComment("");
              setVisibleComment(-1);
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else {
      return (
        <div>
          {jsxCommentContent}
          <div>
            <span
              className="edit_button"
              onClick={() => {
                setVisibleComment(index);
              }}
            >
              <i className="fa fa-edit" />
            </span>

            <span
              className="del_button"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_SAGA,
                  actionType: DELETE_COMMENT_SAGA,
                  id: item.id,
                  taskId: taskDetailModal.taskId,
                });
              }}
            >
              <i className="fa fa-trash-alt" />
            </span>
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_COMMENT_SAGA,
    });
    return () => {};
  }, []);
  const handleClick = () => {
    dispatch({
      type: HANDLE_CHANGE_POST_SAGA,
      actionType: INSERT_COMMENT_SAGA,
      comment: {
        taskId: taskDetailModal.taskId,
        contentComment: comment,
      },
    });
    setVisibleAddComment(false);
  };

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParse(taskDetailModal.description);

    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });

                setVisibleEditor(!visibleEditor);
              }}
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                });
                // dispatch({
                //   type: CHANGE_TASK_MODAL,
                //   name: "description",
                //   value: historyContent,
                // });
                setVisibleEditor(!visibleEditor);
              }}
              className="btn btn-primary"
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };
  const handleChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE_POST_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name: e.target.name,
      value: e.target.value,
    });
  };
  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                onChange={handleChange}
                value={taskDetailModal.typeId}
              >
                {arrTaskType.map((tp, index) => {
                  return (
                    <option key={index} value={tp.id}>
                      {tp.taskType}
                    </option>
                  );
                })}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">
                    This is an issue of type:
                    {taskDetailModal.taskTypeDetail.taskType}.
                  </p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src={userLogin.avatar} alt={userLogin.avatar} />
                      </div>
                      <div className="input-comment">
                        {visibleAddComment ? (
                          <Editor
                            name="inputComment"
                            init={{
                              selector: "textarea#myTextArea",
                              height: 200,
                              menubar: false,
                              plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                              ],
                              toolbar:
                                "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
                            }}
                            onEditorChange={(content, editor) => {
                              setComment(content);
                            }}
                          />
                        ) : (
                          <div
                            onClick={() => {
                              setVisibleAddComment(true);
                            }}
                            className="inputDiv"
                          >
                            Add a comment ...
                          </div>
                        )}

                        <div className="d-flex justify-content-end">
                          <button
                            onClick={() => {
                              handleClick();
                            }}
                            className="btn btn-success m-2"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      {taskDetailModal.lstComment.map((item, index) => {
                        return (
                          <div className="comment-item mt-2">
                            <div
                              key={index}
                              className="display-comment"
                              style={{ display: "flex" }}
                            >
                              <div className="avatar">
                                <img src={item.avatar} alt={item.avatar} />
                              </div>
                              <div>
                                <p
                                  className="m-0"
                                  style={{
                                    textShadow: "0 0 3px #00ff00",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.name}
                                </p>
                                {renderComment(item, index)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness.map((item, index) => {
                        return (
                          <div key={index} className="col-6  mb-2">
                            <div style={{ display: "flex" }} className="item ">
                              <div className="avatar">
                                <img src={item.avatar} alt={item.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {item.name}
                                <i
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_SAGA,
                                      actionType: "REMOVE_USER_ASSIGN",
                                      userId: item.id,
                                    });
                                    // dispatch({
                                    //   type: "REMOVE_USER_ASSIGN",
                                    //   userId: item.id,
                                    // });
                                  }}
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div
                        className="col-6"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          optionFilterProp="label"
                          style={{ width: "100%" }}
                          name="lstUser"
                          value="+ Add more"
                          className="form-control"
                          onSelect={(value) => {
                            if (value == "0") {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };
                            //dispatchReducer
                            dispatch({
                              type: HANDLE_CHANGE_POST_SAGA,
                              actionType: CHANGE_ASSIGNESS,
                              userSelected,
                            });
                            // dispatch({
                            //   type: CHANGE_ASSIGNESS,
                            //   userSelected,
                            // });
                          }}
                        ></Select>
                      </div>
                    </div>
                  </div>
                  <div className="priority mt-2" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      onChange={handleChange}
                      type="text"
                      value={taskDetailModal.originalEstimate}
                      className="estimate-hours"
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
