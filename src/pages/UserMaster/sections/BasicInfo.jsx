import AppInput from "../../../components/common/AppInput";
import FormGrid from "../../../components/common/Form/FormGrid";
import FormSection from "../../../components/common/Form/FormSection";
import AppLookup from "../../../components/common/AppLookup/LookupInput";
import {
  User,
} from "lucide-react";
const BasicInfo = ({ form, errors, setForm, onChange }) => {
  return (
    <FormSection title={"User Information"} icon={<User size={18} />}>
      <FormGrid>
        <div className="md:col-span-3">
        <AppInput
          label="UserID"
          name="userid"
          value={form.userid}
          onChange={onChange}
          disabled
        />
        </div>
        <div className="md:col-span-9">
        <AppInput
          label="Username"
          name="username"
          value={form.username}
          onChange={onChange}
          error={errors.username}
          required
        />
        </div>
        <div className="md:col-span-3">
        <AppInput
          label="Email"
          name="emailid"
          value={form.emailid}
          onChange={onChange}
          error={errors.emailid}
          required
        />
        </div>
        <div className="md:col-span-3">
        <AppInput
          label="Mobile No"
          name="mobileno"
          value={form.mobileno}
          onChange={onChange}
          error={errors.mobileno}
        />
        </div>
        <div className="md:col-span-3">
        <AppInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          required
        />
        </div>
        <div className="md:col-span-3">
        <AppLookup
          label="Status"
          name="status"
          value={form.status}
          required
          placeholder="Select Status"
          error={errors.status}
          ajax={false}
          options={[
            {
              label: "Active",
              value: "A",
            },
            {
              label: "Inactive",
              value: "D",
            },
          ]}
          onChange={(val) => {
            setForm((prev) => ({
              ...prev,
              status: val,
            }));
          }}
        />
        </div>
      </FormGrid>
    </FormSection>
  )
}

export default BasicInfo;