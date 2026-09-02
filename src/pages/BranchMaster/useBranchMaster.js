import { useState, useEffect, useCallback } from "react";
import {useNavigate} from "react-router-dom";
import { useNotification } from "../../components/common/Notification/NotificationContext";
import {
  getaAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "./branchMaster.service";
import { branchMasterSchema } from "./branchMaster.validation";

/* ================= INITIAL FORM ================= */
const INITIAL_FORM = {
  branchid: "",
  branchname: "",
  shortname: "",
  onacid: "",
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

const mapBranchToForm = (data = {}) => ({
  branchid: data.BranchID ?? "",
  branchname: data.BranchName ?? "",
  shortname: data.ShortName ?? "",
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
export const useBranchMaster = (branchid) => {
  /* ================= STATES ================= */
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);
  const notify = useNotification();
  const navigate = useNavigate();
  /* ================= FETCH ALL BRANCHES ================= */
  const fetchAllBranches = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getaAllBranches(limit);
      setBranches(data);
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
    fetchAllBranches();
  }, [fetchAllBranches]);

  /* ================= LOAD BRANCH ================= */
  useEffect(() => {
    if (branchid) {
      loadBranch();
    }
  }, [branchid]);

  const loadBranch = async () => {
    try {
      setLoading(true);
      const response = await getBranchById(branchid);
      const data = response?.data ?? [];
      setForm(mapBranchToForm(data));
    } catch (err) {
      console.log("Fetch to Branch byID:", err);
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
  const refreshBranch = async (branchid) => {
    const response = await getBranchById(branchid);
    const data = response?.data ?? [];
    setForm(mapBranchToForm(data));
  };

  /* ================= HANDLE SUBMIT ================= */

 const handleSubmit = async () => {
  if (loading) return;
  setLoading(true);
  try {
    // ================= VALIDATION =================
    await branchMasterSchema.validate(form, {
      abortEarly: false,
    });
    setErrors({});
    // ================= UPDATE =================
    if (form.branchid) {
      const response = await updateBranch(form.branchid, form);
      console.log("UPDATE RESPONSE:", response);
      if (!response?.data?.BranchID){
        throw new Error(
          response?.message || "Branch ID not returned after update"
        );
      }
      await refreshBranch(response.data?.BranchID);
      notify.success("Branch updated successfully");
      return {
        success: true,
        message: "Branch updated successfully",
      };
    }
    // ================= CREATE =================
    const response = await createBranch(form);
    console.log("CREATE RESPONSE:", response.data);
    await refreshBranch(response.data?.BranchID);
    notify.success("Branch created successfully");
    return {
      success: true,
      message: "Branch created successfully",
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
      if (!form.branchid) {
        return {
          success: false,
          message: "Branch not found",
        };
      }
      setLoading(true);
      console.log("Deleting branch with ID:", form.branchid);
      await deleteBranch(form.branchid);
      notify.delete("Branch deleted successfully");
      console.log("Branch deleted successfully");
      setForm(INITIAL_FORM);
       // Redirect to the branch master list page
       console.log("Navigating to /branchMasterList");
      navigate("/branchMasterList");
      console.log("Navigation complete");
      return {
        success: true,
        message: "Branch deleted successfully",
      };
    } catch (err) {
      console.log("Delete error:", err);
      return {
        success: false,
        message: getErrorMessage(err, "Failed to delete branch"),
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
    branches,
    loading,
    limit,
    setLimit,
    fetchAllBranches,
    handleChange,
    handleSubmit,
    handleDelete,
    loadBranch,
  };
};
