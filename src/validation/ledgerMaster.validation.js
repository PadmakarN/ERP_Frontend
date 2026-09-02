import * as yup from 'yup';

export const ledgerMasterSchema = yup.object({
    ledgername: yup.string().required("ledger name is required"),

    aliasname: yup.string().nullable(),
    groupid: yup.string().required("group name is required"),
    ledgercode: yup.string().nullable(),
    printname: yup.string().nullable(),
    address: yup.string().nullable(),
    city: yup.string().nullable(),
    state: yup.string().nullable(),
    country: yup.string().nullable(),
    pin: yup.string() .nullable()

    .notRequired()
    .test(
      "len",
      "pincode must be 6 digits",
      (value) => {
        if (!value) return true; // 👉 empty hai to allow karo
        return /^\d{6}$/.test(value); // 👉 value hai to check karo
      }
    ),
    mobile: yup
        .string()
        .notRequired()
        .test(
            "len",
            "mobile number must be 10 digits",
            (value) => {
                if (!value) return true; // 👉 empty hai to allow karo
                return /^\d{10}$/.test(value); // 👉 value hai to check karo
            }
        ),
        
    emailid: yup
        .string()
        .email("Invalid email format")
        .nullable(),
    status:yup.string().required("status is required"),
});