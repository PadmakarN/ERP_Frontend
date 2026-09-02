import { useUserMaster } from "../../hooks/useUserMaster";
import UserForm from "../UserMaster/UserMasterForm";
import FormPage from "../../components/common/Form/FormPage";
import FormHeader from "../../components/common/Form/FormHeader";
import FormActions from "../../components/common/Form/FormActions";
import Toast from "../../components/Toast";
import { useState } from "react";

function UserMaster({ onClose, id }) {

  const {
    form,
    setForm,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleDelete,
    handleImageRemove,
    handleImageChange,
    preview,
  } = useUserMaster(id);

  // Toast State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Save Handler
  const onSave = async () => {

  const result = await handleSubmit();
    setToast({
      show: true,
      message: result.message,
      type: result.success ? "success" : "error",
    });
 
};

  // Delete Handler
  const onDelete = async () => {

    const result = await handleDelete();
    setToast({
      show: true,
      message: result.message,
      type: result.success ? "error" : "error",
    });
  };

  return (
   <>
      <FormPage
        header={
          <FormHeader
            title="User Master"
            subtitle="Create / Update UserDetails"
            actions={<FormActions onSave={onSave} onDelete={onDelete} />}
            onClose={onClose}
          />
        }
      >
        <UserForm
          form={form}
          setForm={setForm}
          loading={loading}
          errors={errors}
          onChange={handleChange}
          handleImageChange={handleImageChange}
          handleImageRemove={handleImageRemove}
          preview={preview}
        />
        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
      </FormPage>
    </>
  );
}

export default UserMaster;