import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import * as Yup from "yup";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constans/Cyberbugs/Cyberbugs";
function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const dispatch = useDispatch();

  //componentdidmount
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <div>
      <form className="container-fuild" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <p className="font-weight-bold">Project id</p>
              <input
                disabled
                value={values.id}
                className="form-control"
                name="id"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <p className="font-weight-bold">Project name</p>
              <input
                value={values.projectName}
                className="form-control"
                onChange={handleChange}
                name="projectName"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <p className="font-weight-bold">Project Category</p>
              <select
                name="categoryId"
                className="form-control"
                value={values.categoryId}
              >
                {arrProjectCategory?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.projectCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <p className="font-weight-bold">Description</p>
              <Editor
                name="description123"
                initialValue={values.description}
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
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  // Custom sync validation

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    const action = {
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values,
    };
    props.dispatch(action);
  },

  displayName: "EditProjectForm",
})(FormEditProject);
const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});
export default connect(mapStateToProps)(editProjectForm);
