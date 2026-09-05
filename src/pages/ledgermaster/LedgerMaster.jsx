import { useLedgerMaster } from "./useLedgerMaster";
import LedgerMasterForm from "../ledgermaster/LedgerMasterForm";
import FormPage from "../../components/common/form/FormPage";
import FormHeader from "../../components/common/form/FormHeader";
import FormActions from "../../components/common/form/FormActions";

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
