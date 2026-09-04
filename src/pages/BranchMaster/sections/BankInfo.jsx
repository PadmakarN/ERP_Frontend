import AppInput from "../../../components/common/AppInput";
import FormSection from "../../../components/common/form/FormSection";
import FormGrid from "../../../components/common/form/FormGrid";
import { Banknote } from "lucide-react";

const BankInfo = ({ form, errors, onChange }) => {
  return (
    <FormSection title="Bank Information" icon={<Banknote size={18} />}>
      <FormGrid>
        <div className="md:col-span-4">
        <AppInput
          label="Bank Name"
          name="bank"
          value={form.bank}
          onChange={onChange}
          error={errors.bank}
        />
        </div>
        <div className="md:col-span-4">
        <AppInput
          label="GSTNo"
          name="gst_no"
          value={form.gst_no}
          onChange={onChange}
          error={errors.gst_no}
        />
        </div>
        <div className="md:col-span-4">
        <AppInput
          label="Gst Date"
          name="gst_date"
          type="date"
          value={form.gst_date}
          onChange={onChange}
          error={errors.gate_date}
        />
        </div>
      </FormGrid>
    </FormSection>
  );
};

export default BankInfo;
