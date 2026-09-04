import { useState, useEffect, useCallback } from "react";
import { useNotification } from "../../components/common/notification/NotificationContext";
import {
  getaAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "./companyMaster.service";
import { companyMasterSchema } from "./companyMaster.validation";

/* ================= INITIAL FORM ================= */
const INITIAL_FORM = {
  onacid: "",
  companyname: "",
  shortname: "",
  currencycode: "",
  invprefix: "",
  address: "",
  remarks: "",
  pincode: "",
  place: "",
  contactperson: "",
  contactno: "",
  emailid: "",
  cuid: "",
  cdt: "",
  muid: "",
  mdt: "",
  status: "",
  bank: "",
  gst_no: "",
  gst_date: "",
};

const mapCompanyToForm = (data = {}) => ({
  companyid: data.CompanyID ?? "",
  companyname: data.CompanyName ?? "",
  State: data.ShortName ?? "",
  onacid: data.OnAcID ?? "",
  currencycode: data.CurrencyCode ?? "",
  invprefix: data.InvPrefix ?? "",
  address: data.Address ?? "",
  remarks: data.Remarks ?? "",
  pincode: data.Pincode ?? "",
  place: data.Place ?? "",
  contactperson: data.ContactPerson ?? "",
  contactno: data.ContactNo ?? "",
  emailid: data.EmailID ?? "",
  gst_statecode:data.Gst_StateCode ?? "",
  cuid: data.CUID ?? "",
  cdt: data.CDT ?? "",
  muid: data.MUID ?? "",
  mdt: data.MDT ?? "",
  status: data.Status ?? "",
  bank: data.Bank ?? "",
  gst_no: data.Gst_No ?? "",
  gst_date: data.Gst_Date ?? "",
});

const getErrorMessage = (err, defaultMessage = "Something went wrong") => {
  return err?.response?.data?.message || err?.message || defaultMessage;
};
export const useCompanyMaster = (companyid) => {
  /* ================= STATES ================= */
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);
  const notify = useNotification();
  /* ================= FETCH ALL COMPANIES ================= */
  const fetchAllCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getaAllCompanies(limit);
      setCompanies(data);
      setError(null);
      return {
        success: true,
        data,
      };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  }, [limit]);
  /* ================= EFFECTS ================= */
  useEffect(() => {
    fetchAllCompanies();
  }, [fetchAllCompanies]);

  /* ================= LOAD COMPANY ================= */
  useEffect(() => {
    if (companyid) {
      loadCompany();
    }
  }, [companyid]);

  const loadCompany = async () => {
    try {
      setLoading(true);
      const response = await getCompanyById(onacid);
      const data = response?.data ?? [];
      setForm(mapBranchToForm(data));
    } catch (err) {
      console.log("Fetch to Company byID:", err);
      const message = getErrorMessage(err);
      setError(message);
      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };
  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  /* ================= HANDLE REFRESH ================= */
  const refreshCompany = async (onacid) => {
    const response = await getCompanyById(onacid);
    const data = response?.data ?? [];
    setForm(mapBranchToForm(data));
  };

  /* ================= HANDLE SUBMIT ================= */

 const handleSubmit = async () => {
  if (loading) return;
  setLoading(true);
  try {
    // ================= VALIDATION =================
    await companyMasterSchema.validate(form, {
      abortEarly: false,
    });
    setErrors({});
    // ================= UPDATE =================
    if (form.onacid) {
      const response = await updateCompany(form.onacid, form);
      console.log("UPDATE RESPONSE:", response);
      if (!response?.data?.OnAcID){
        throw new Error(
          response?.message || "Company ID not returned after update"
        );
      }
      await refreshCompany(response.data?.OnAcID);
      notify.success("Company updated successfully");
      return {
        success: true,
        message: "Company updated successfully",
      };
    }
    // ================= CREATE =================
    const response = await createCompany(form);
    console.log("CREATE RESPONSE:", response.data);
    await refreshCompany(response.data?.OnAcID);
    notify.success("Company created successfully");
    return {
      success: true,
      message: "Company created successfully",
    };
  } catch (err) {
    console.error("Submit error:", err);
    // ================= VALIDATION ERROR =================
    if (err.inner && err.inner.length > 0) {
      const fieldErrors = {};
      err.inner.forEach((e) => {
        fieldErrors[e.path] = e.message;
      });
      setErrors(fieldErrors);
      return {
        success: false,
        message: "Please correct the highlighted fields.",
        errors: fieldErrors,
      };
    }

    // ================= API / SERVER ERROR =================

    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong";
    notify.error(message);
    return {
      success: false,
      message,
    };

  } finally {
    setLoading(false);
  }
};

  /* ================= HANDLE DELETE ================= */
  const handleDelete = async () => {
    try {
      if (!form.onacid) {
        return {
          success: false,
          message: "Company not found",
        };
      }
      setLoading(true);
      console.log("Deleting company with ID:", form.onacid);
      await deleteCompany(form.onacid);
      notify.delete("Company deleted successfully");
      setForm(INITIAL_FORM);
      return {
        success: true,
        message: "Company deleted successfully",
      };
    } catch (err) {
      console.log("Delete error:", err);
      return {
        success: false,
        message: getErrorMessage(err, "Failed to delete company"),
      };
    } finally {
      setLoading(false);
    }
  };
  /* ================= RETURN ================= */
  return {
    form,
    setForm,
    errors,
    error,
    companies,
    loading,
    limit,
    setLimit,
    fetchAllCompanies,
    handleChange,
    handleSubmit,
    handleDelete,
    loadCompany,
  };
};
