import { useBranchMaster } from "./useBranchMaster";
import BranchMasterForm from "./BranchMasterForm";
import FormPage from "../../components/common/Form/FormPage";
import FormHeader from "../../components/common/Form/FormHeader";
import FormActions from "../../components/common/Form/FormActions";


function BranchMaster({ onClose, id }) {
  const {
    form,
    setForm,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleDelete,
  } = useBranchMaster(id);


  // Delete Handler
  const onDelete = async () => {
    window.confirm("Are you sure you want to delete this branch?") && handleDelete();
  };

  // Save Handler
  const onSave = async () => {
    handleSubmit();
  };
  
  return (
    <>
      <FormPage
        header={
          <FormHeader
            title="Branch Master"
            subtitle="Create / Update Branch"
            actions={<FormActions onSave={onSave} onDelete={onDelete} />}
            onClose={onClose}
          />
        }
      >
        <BranchMasterForm
          form={form}
          setForm={setForm}
          loading={loading}
          errors={errors}
          onChange={handleChange}
        />
      </FormPage>
    </>
  );
}

export default BranchMaster;
