import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import { array } from "yup/lib/locale";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constans/Cyberbugs/Cyberbugs";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
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
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
    return () => {};
  }, []);
  const handleEditorChange = (e) => {
    setFieldValue("description", e.target.getContent());
  };

  return (
    <div className="container">
      <h3>Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            initialValue="<p>Initial content</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
            }}
            onChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>

        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}
const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },

  // Custom sync validation

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values,
    });
  },

  displayName: "CreateProjectFormik",
})(CreateProject);
const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};
export default connect(mapStateToProps)(createProjectForm);
