import AppInput from "../../../components/common/AppInput";
import FormSection from "../../../components/common/form/FormSection";
import FormGrid from "../../../components/common/form/FormGrid";
import {Phone} from "lucide-react";
import LookupInput from "../../../components/common/AppLookup/LookupInput";
const ContactInfo = ({
  form,
  setForm,
  errors,
  onChange,
}) => {
  console.log(form.GroupID,form.groupname)
  return (
    <FormSection title="Contact Information" icon={<Phone size={18} />}>

      <FormGrid>
        
        <div className="md:col-span-3">
        <AppInput
          label="Mobile Number"
          name="mobile"
          value={form.mobile}
          onChange={onChange}
          error={errors.mobile}
          placeholder="Enter Mobile Number"
        />
        </div>

        {/* Future Fields */}
         <div className="md:col-span-3">
        <AppInput
          label="Email"
          name="email"
          value={form.email}
          onChange={onChange}
          error={errors.email}
          placeholder="Enter Email"
        />
        </div>

        <div className="md:col-span-3">
        <AppInput
          label="Website"
          name="website"
          value={form.website}
          onChange={onChange}
          error={errors.website}
          placeholder="Enter Website"
        />
        </div>
         
        <div className="md:col-span-3">
        <LookupInput
          label="Status"
          value={form.status}
          required
          options={[
            { label: "Active", value: "A" },
            { label: "InActive", value: "D" },
          ]}
          onChange={(val) =>
            setForm({...form, status: val,})
          }
        />
        </div>
      </FormGrid>

    </FormSection>
  );
};

export default ContactInfo;