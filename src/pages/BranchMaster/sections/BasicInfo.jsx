import AppInput from "../../../components/common/AppInput";
import FormSection from "../../../components/common/form/FormSection";
import FormGrid from "../../../components/common/form/FormGrid";
import { User } from "lucide-react";
import LookupInput from "../../../components/common/applookup/LookupInput";

const BasicInfo = ({ form, setForm, errors, onChange }) => {
  return (
    <FormSection
      title="Basic Information"
      icon={<User size={18} />}
    >
      <FormGrid>

        {/* =========================
            ROW 1
        ========================== */}

        {/* Branch ID - Small */}
        <div className="md:col-span-2">
          <AppInput
            label="Branch ID"
            name="branchid"
            value={form.branchid}
            onChange={onChange}
            readOnly
          />
        </div>

        {/* Branch Name - Large */}
        <div className="md:col-span-7">
          <AppInput
            label="Branch Name"
            name="branchname"
            value={form.branchname}
            onChange={onChange}
            error={errors.branchname}
            required
          />
        </div>

        {/* Short Name - Small */}
        <div className="md:col-span-3">
          <AppInput
            label="Short Name"
            name="shortname"
            value={form.shortname}
            onChange={onChange}
            error={errors.shortname}
          />
        </div>


        {/* =========================
            ROW 2
        ========================== */}

        {/* Company Name - Large */}
        <div className="md:col-span-6">
          <LookupInput
            label="Company Name"
            name="companyname"
            value={form.companyname}
            onChange={onChange}
            error={errors.companyname}
          />
        </div>

        {/* Currency Code */}
        <div className="md:col-span-3">
          <AppInput
            label="Currency Code"
            name="currencycode"
            value={form.currencycode}
            onChange={onChange}
            error={errors.currencycode}
            required
          />
        </div>
         {/* Inv Prefix */}
        <div className="md:col-span-3">
          <AppInput
            label="Inv Prefix"
            name="invprefix"
            value={form.invprefix}
            onChange={onChange}
            error={errors.invprefix}
            required
          />
        </div>

       
        {/* =========================
            ROW 3
        ========================== */}

        {/* Address */}
        <div className="md:col-span-6">
          <AppInput
            label="Address"
            name="address"
            rows={2}
            value={form.address}
            onChange={onChange}
            error={errors.address}
            required
          />
        </div>

        {/* Remarks */}
        <div className="md:col-span-6">
          <AppInput
            label="Remarks"
            name="remarks"
            rows={2}
            value={form.remarks}
            onChange={onChange}
            error={errors.remarks}
          />
        </div>


        {/* =========================
            ROW 4
        ========================== */}
       
        {/* Pincode */}
        <div className="md:col-span-3">
          <AppInput
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={onChange}
            error={errors.pincode}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-3">
          <AppInput
            label="Place"
            name="place"
            value={form.place}
            onChange={onChange}
            error={errors.place}
          />
        </div>

        <div className="md:col-span-3">
          <AppInput
            label="Contact Person"
            name="contactperson"
            value={form.contactperson}
            onChange={onChange}
            error={errors.contactperson}
          />
        </div>

        <div className="md:col-span-3">
          <AppInput
            label="Contact No"
            name="contactno"
            value={form.contactno}
            onChange={onChange}
            error={errors.contactno}
          />
        </div>

         <div className="md:col-span-6">
          <AppInput
            label="Email ID"
            name="emailid"
            value={form.emailid}
            onChange={onChange}
            error={errors.emailid}
          />
        </div>
         <div className="md:col-span-3">
          <AppInput
            label="Gst StateCode"
            name="gst_statecode"
            value={form.gst_statecode}
            onChange={onChange}
            error={errors.gst_statecode}
          />
        </div>


        {/* Empty space */}
        {/* <div className="hidden md:block md:col-span-3"></div> */}


        {/* =========================
            AUDIT INFORMATION
        ========================== */}

        {/* Created By */}
        <div className="md:col-span-3">
          <AppInput
            label="Created By"
            name="cuid"
            value={form.cuid}
            onChange={onChange}
            error={errors.cuid}
            required
            readOnly
          />
        </div>

        {/* Create Date */}
        <div className="md:col-span-3">
          <AppInput
            label="Create Date"
            name="cdt"
            value={form.cdt}
            onChange={onChange}
            error={errors.cdt}
             readOnly
          />
        </div>

        {/* Update By */}
        <div className="md:col-span-3">
          <AppInput
            label="Update By"
            name="muid"
            value={form.muid}
            onChange={onChange}
            error={errors.muid}
            readOnly
          />
        </div>

        {/* Update Date */}
        <div className="md:col-span-3">
          <AppInput
            label="Update Date"
            type="Date"
            name="mdt"
            value={form.mdt}
            onChange={onChange}
            error={errors.mdt}
          />
        </div>
         {/* Status */}
        <div className="md:col-span-3">
          <LookupInput
            label="Status"
            name="status"
            value={form.status}
            options={[
              {
                label: "Active",
                value: "A",
              },
              {
                label: "DeActive",
                value: "D",
              },
            ]}
            onChange={(val) =>
              setForm({
                ...form,
                status: val,
              })
            }
            required
            error={errors.status}
          />
        </div>

      </FormGrid>
    </FormSection>
    
  );
};

export default BasicInfo;