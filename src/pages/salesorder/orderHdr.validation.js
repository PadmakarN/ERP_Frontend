import * as yup from 'yup';

export const OrderHdrSchema = yup.object({
    buyerID: yup.string().required("Party name is required"),
    BranchID: yup.number().required("Branch name is required"),
    taxclassid: yup.number().required("Tax class is required"),
    address: yup.string().required("Address is required"),
    gstin: yup.string().nullable(),
});