import AppInput from "../../../components/common/AppInput";
// import AppSelect from "../../../components/common/AppSelect";
import AppLookup from "../../../components/common/AppLookup/AppLookup";
import FormSection from "../../../components/common/Form/FormSection";
import FormGrid from "../../../components/common/Form/FormGrid";
import { User } from "lucide-react";
import LookupInput from "../../../components/common/AppLookup/LookupInput";

const BasicInfo = ({ form, setForm, errors, onChange }) => {
  return (
    <FormSection title="Basic Information" icon={<User size={18} />}>
      <FormGrid>
        <div className="md:col-span-3">
        <AppInput
          label="Ledger ID"
          name="ledgerid"
          value={form.ledgerid}
          onChange={onChange}
          readOnly
        />
        </div>
         <div className="md:col-span-6">
        <AppInput
          label="Ledger Name"
          name="ledgername"
          value={form.ledgername}
          onChange={onChange}
          error={errors.ledgername}
          required
        />
        </div>
         <div className="md:col-span-3">
        <LookupInput
          label="Group"
          name="groupid"
          value={form.groupid}
          options={[
            { label: "Creditors", value: 15 },
            { label: "Debtors", value: 16 },
          ]}
          onChange={(val) =>
            setForm({...form, groupid: val,})
          }
          required
          error={errors.groupid}
        />
        </div>
        
      </FormGrid>
    </FormSection>
  );
};

export default BasicInfo;
