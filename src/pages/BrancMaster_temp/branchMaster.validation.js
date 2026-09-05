import * as yup from 'yup';

export const branchMasterSchema = yup.object({
    branchname: yup.string().required("Branch name is required"),
    branchcode: yup.string().nullable(),
    currencycode: yup.string().required("Currency code is required"),
    address: yup.string().required("Address is required"),
    shortname: yup.string()
    .nullable()
    .test(
      "shortname-length",
      "Short name must be exactly 3 characters",
      (value) => {
        if (!value) return true; 
        return value.length === 3;
      }
    ),
    pincode: yup.string()
    .nullable()
    .test(
      "pincode-length",
      "Pincode must be 6 digits",
      (value) => {
        if(!value) return true; // 👉 if empty then allow
        return value.length===6; // 👉 if value then check
      }
    ),
    emailid: yup.string()
    .nullable()
     .email("Invalid email format"),
});