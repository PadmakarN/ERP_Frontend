import Loading from "../../components/common/ProcessLoading";
import BasicInfo from "./sections/BasicInfo";
import BankInfo from "./sections/BankInfo";

const BranchForm = ({ form, setForm, errors, onChange, loading }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BasicInfo
        form={form}
        setForm={setForm}
        errors={errors}
        onChange={onChange}
      />
      <BankInfo form={form} errors={errors} onChange={onChange} />
    </>
  );
};

export default BranchForm;
