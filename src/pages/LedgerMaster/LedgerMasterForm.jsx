import AppInput from "../../components/common/AppInput";
import Loading from "../../components/common/ProcessLoading";
import BasicInfo from "./sections/BasicInfo";
import AddressInfo from "./sections/AddressInfo";
import ContactInfo from "./sections/ContactInfo";

const LedgerForm = ({ form, setForm, errors, onChange, loading }) => {
  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
   <>
  {/* Hidden Fields */}
  <AppInput type="hidden" name="ledgercode" value={form.ledgercode} />
  <AppInput type="hidden" name="allias" value={form.allias} />
  <AppInput type="hidden" name="printname" value={form.printname} />

  <BasicInfo
    form={form}
    setForm={setForm}
    errors={errors}
    onChange={onChange}
  />

  <AddressInfo
    form={form}
    errors={errors}
    onChange={onChange}
  />

  <ContactInfo
    form={form}
    setForm={setForm}
    errors={errors}
    onChange={onChange}
  />
</>
  );
};

export default LedgerForm;
