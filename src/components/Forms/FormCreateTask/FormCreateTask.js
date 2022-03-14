import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { Select, Radio, Slider } from "antd";
import { useSelector, useDispatch, connect } from "react-redux";
import * as Yup from "yup";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
} from "../../../redux/constans/Cyberbugs/Cyberbugs";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constans/Cyberbugs/TaskTypeConst";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constans/Cyberbugs/PriorityConst";
import { withFormik } from "formik";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constans/Cyberbugs/StatusConst";
import { GET_USER_BY_PROJECTID_SAGA } from "../../../redux/constans/Cyberbugs/UserConst";
const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function FormCreateTask(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const { arrProject } = useSelector((state) => state.ProjectCyberReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const userOption = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });
  const dispatch = useDispatch();
  console.log("arrstatus", arrStatus);
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: "GET_USER_API",
      keyWord: "",
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type: "SET_SUBMIT_CREATE_TASK",
      callBackSubmit: handleSubmit,
    });
    return () => {};
  }, []);
  const [size, setSize] = React.useState("default");

  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const children = [];
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <div className="form-group">
          <p>Project</p>
          <select
            name="projectId"
            onChange={(e) => {
              let { value } = e.target;
              dispatch({
                type: GET_USER_BY_PROJECTID_SAGA,
                idProject: value,
              });
              setFieldValue("projectId", e.target.value);
            }}
            className="form-control"
          >
            {arrProject?.map((project, index) => {
              return (
                <option key={index} value={project.id}>
                  {project.projectName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Task Name</p>
          <input
            name="taskName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>Status</p>
          <select
            name="statusId"
            className="form-control"
            onChange={handleChange}
          >
            {arrStatus.map((item, index) => {
              return (
                <option key={index} value={item.statusId}>
                  {item.statusName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p>Priority</p>
              <select
                onChange={handleChange}
                name="priorityId"
                className="form-control"
              >
                {arrPriority.map((priority, index) => {
                  return (
                    <option key={index} value={priority.priorityId}>
                      {priority.priority}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">
              <p>Task type</p>
              <select
                onChange={handleChange}
                className="form-control"
                name="typeId"
              >
                {arrTaskType.map((taskType, index) => {
                  return (
                    <option key={index} value={taskType.id}>
                      {taskType.taskType}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p>Assignees</p>
              <Select
                mode="multiple"
                size={size}
                options={userOption}
                onSelect={(value) => {}}
                optionFilterProp="label"
                placeholder="Please select"
                defaultValue={[]}
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
                style={{ width: "100%" }}
              >
                {children}
              </Select>
              <div className="row mt-3">
                <div className="col-12">
                  <p>Original Estimate</p>
                  <input
                    onChange={handleChange}
                    type="number"
                    min="0"
                    name="originalEstimate"
                    defaultValue="0"
                    className="form-control"
                    height="30"
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <p>Time tracking</p>

              <Slider
                defaultValue={30}
                value={timeTracking.timeTrackingSpent}
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
              />
              <div className="row">
                <div className="col-6 text-left font-weight-bold">
                  {timeTracking.timeTrackingSpent}h logged
                </div>
                <div className="col-6 text-right font-weight-bold">
                  {timeTracking.timeTrackingRemaining}h remaining
                </div>
              </div>
              <div className="row" style={{ marginTop: 5 }}>
                <div className="col-6">
                  <p>Time spent</p>
                  <input
                    type="number"
                    defaultValue="0"
                    min="0"
                    className="form-control"
                    name="timeTrackingSpent"
                    onChange={(e) => {
                      setTimetracking({
                        ...timeTracking,
                        timeTrackingSpent: e.target.value,
                      });
                      setFieldValue("timeTrackingSpent", e.target.value);
                    }}
                  />
                </div>

                <div className="col-6">
                  <p>Time remaining</p>
                  <input
                    type="number"
                    defaultValue="0"
                    min="0"
                    className="form-control"
                    name="timeTrackingRemaining"
                    onChange={(e) => {
                      setTimetracking({
                        ...timeTracking,
                        timeTrackingRemaining: e.target.value,
                      });
                      setFieldValue("timeTrackingRemaining", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
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
              setFieldValue("description", content);
            }}
          />
        </div>
      </div>
    </form>
  );
}

const frmCreateTask = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    const { arrProject, arrTaskType, arrStatus, arrPriority } = props;
    if (arrProject.length > 0) {
      props.dispatch({
        type: GET_USER_BY_PROJECTID_SAGA,
        idProject: arrProject[0]?.id,
      });
    }
    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      typeId: arrTaskType[0]?.id,
      listUserAsign: [],
    };
  },

  // Custom sync validation

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    props.dispatch({
      type: "CREATE_TASK_SAGA",
      taskObject: values,
    });
  },

  displayName: "createTaskForm",
})(FormCreateTask);

// const { arrProject } = useSelector((state) => state.ProjectCyberReducer);
// const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
// const { arrPriority } = useSelector((state) => state.PriorityReducer);
// const { userSearch } = useSelector(
//   (state) => state.UserLoginCyberBugsReducer
// );
// const { arrStatus } = useSelector((state) => state.StatusReducer);
const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectCyberReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrStatus: state.StatusReducer.arrStatus,
    arrPriority: state.PriorityReducer.arrPriority,
    userSearch: state.UserLoginCyberBugsReducer.userSearch,
  };
};
export default connect(mapStateToProps)(frmCreateTask);
