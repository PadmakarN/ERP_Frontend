import * as yup from "yup";

export const userMasterSchema = yup.object({
  username: yup.string().required("username is required"),

  emailid: yup
    .string()
    .email("invalid email")
    .required("email is required"),

  mobileno: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "len",
      "mobile number must be 10 digits",
      (value) => {
        if (!value) return true; // 👉 empty hai to allow karo
        return /^\d{10}$/.test(value); // 👉 value hai to check karo
      }
    ),

  password: yup
    .string()
    .min(6, "password must be at least 6 characters")
    .required("password is required"),

  status: yup.string().required("status is required"),

  profileimage:yup.mixed().nullable().test("filesize","file size must be less than 2MB",(value)=>{
    if(!value) return true;
    return value.size <=2*1024*1024;
  }).test("filetype","only image files are allowed",(value)=>{
    if(!value) return true;
    return["image/jpeg","image/png","image/gif"].includes(value.type);
  })
});