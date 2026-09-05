import AppInput from "../../../components/common/AppInput";
import FormSection from "../../../components/common/form/FormSection";
import FormGrid from "../../../components/common/form/FormGrid";
import { MapPin } from "lucide-react";
const AddressInfo = ({ form, errors, onChange }) => {
  return (
    <FormSection title="Address Information" icon={<MapPin size={18} />}>
      <FormGrid>
        <div className="md:col-span-12">
          <AppInput
            label="Address"
            name="address"
            rows="2"
            value={form.address}
            onChange={onChange}
            error={errors.address}
            placeholder="Enter Address"
            className="md:col-span-2 xl:col-span-3"
          />
        </div>
         <div className="md:col-span-3">
        <AppInput
          label="City"
          name="city"
          value={form.city}
          onChange={onChange}
          error={errors.city}
          placeholder="Enter City"
        />
        </div>

         <div className="md:col-span-3">
        <AppInput
          label="State"
          name="state"
          value={form.state}
          onChange={onChange}
          error={errors.state}
          placeholder="Enter State"
        />
        </div>

         <div className="md:col-span-3">
        <AppInput
          label="Country"
          name="country"
          value={form.country}
          onChange={onChange}
          error={errors.country}
          placeholder="Enter Country"
        />
        </div>

         <div className="md:col-span-3">
        <AppInput
          label="Pincode"
          name="pin"
          value={form.pin}
          onChange={onChange}
          error={errors.pin}
          placeholder="Enter Pincode"
        />
        </div>
      </FormGrid>
    </FormSection>
  );
};

export default AddressInfo;
