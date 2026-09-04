import { useLedgerMaster } from "./useLedgerMaster";
import LedgerMasterForm from "../LedgerMaster/LedgerMasterForm";
import FormPage from "../../components/common/Form/FormPage";
import FormHeader from "../../components/common/Form/FormHeader";
import FormActions from "../../components/common/Form/FormActions";
import Toast from "../../components/Toast";

>>>>>>> f6521fd6e4def0ae8c43bac0abb8c759a437fe3d

function LedgerMaster({ onClose, id }) {
  const {
    form,
    setForm,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleDelete,
  } = useLedgerMaster(id);

  // Delete Handler
  const onDelete = async () => {
    window.confirm("Are you sure you want to delete this ledger?") && handleDelete();
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
            title="Ledger Master"
            subtitle="Create / Update Ledger"
            actions={<FormActions onSave={onSave} onDelete={onDelete} />}
            onClose={onClose}
          />
        }
      >
        <LedgerMasterForm
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

export default LedgerMaster;
