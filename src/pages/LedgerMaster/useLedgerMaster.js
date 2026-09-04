import { useState, useEffect,useCallback } from "react";
import { useNotification } from "../../components/common/notification/NotificationContext";
import {
  getaAllLedgers,
  getLedgerById,
  createLedger,
  updateLedger,
  deleteLedger,
} from "./ledgerMaster.service";
import { ledgerMasterSchema } from "./ledgerMaster.validation";

/* ================= INITIAL FORM ================= */
const INITIAL_FORM = {
  ledgerid: "",
  ledgername: "",
  ledgercode: "",
  groupid: "",
  allias: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pin: "",
  mobile: "",
  email: "",
  status: "",
};

const mapLedgerToForm = (data = {}) => ({
  ledgerid: data.LedgerID ?? "",
  ledgername: data.LedgerName ?? "",
  ledgercode: data.LedgerCode ?? "",
  groupid: data.GroupID ?? "",
  allias: data.Allias ?? "",
  address: data.Address ?? "",
  city: data.City ?? "",
  state: data.State ?? "",
  country: data.Country ?? "",
  pin: data.Pin ?? "",
  mobile: data.Mobile ?? "",
  email: data.Email ?? "",
  status: data.Status ?? "",
});

const getErrorMessage = (err, defaultMessage = "Something went wrong") => {
  return err?.response?.data?.message || err?.message || defaultMessage;
};
export const useLedgerMaster = (ledgerid) => {
  /* ================= STATES ================= */
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [ledgers, setLedgers] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);
  
  const notify = useNotification();

  /* ================= FETCH ALL LEDGERS ================= */
 const fetchAllLedgers = useCallback(async () => {
  try {
    setLoading(true);
    const { data } = await getaAllLedgers(limit);
    setLedgers(data);
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
  fetchAllLedgers();
}, [fetchAllLedgers]);

  /* ================= LOAD LEDGER ================= */
  useEffect(() => {
    if (ledgerid) {
      loadLedger();
    }
  }, [ledgerid]);

  const loadLedger = async () => {
    try {
      setLoading(true);
      const response = await getLedgerById(ledgerid);
      const data = response?.data ?? [];
      setForm(mapLedgerToForm(data));
    } catch (err) {
      console.log("Fetch to Ledger byID:", err);
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
  const refreshLedger =async (ledgerid)=>{
    const response = await getLedgerById(ledgerid);
    const data = response?.data ?? [];
    setForm(mapLedgerToForm(data));
  }

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true);
    try {
      // validation
      await ledgerMasterSchema.validate(form, { abortEarly: false });
      setErrors({});
      /* ========== UPDATE ========== */

      if (form.ledgerid) {
        if(loading) return; // Prevent multiple submissions
        setLoading(true);
        const response = await updateLedger(form.ledgerid, form);
        await refreshLedger(response.data.data.LedgerID);
        notify.success("Ledger updated successfully");
        return {
          success: true,
          message: "Ledger updated successfully",
        };
         
      } else {
        /* ========== CREATE ========== */
        const response = await createLedger(form);
        // console.log("Create response:", response);
        await refreshLedger(response.data.data.LedgerID);
        notify.success("Ledger created successfully");
        return {
          success: true,
          message: "Ledger created successfully",
        };
      }
    } catch (err) {
      console.log("Submit error:", err);
      console.log(err);
      console.log(err.errors); // all errors array
      console.log(err.inner); // detailed field errors

      /* ========== VALIDATION ERROR ========== */

      if (err.inner && err.inner.length > 0) {
        const fieldErrors = {};

        err.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
        return {
          success: false,
          message: `Validation failed {JSON.stringify(fieldErrors)}`,
          errors: fieldErrors,
        };
      }

      /* ========== OTHER ERROR ========== */

      return {
        success: false,
        message:
          err.response?.data?.message || err.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLE DELETE ================= */

  const handleDelete = async () => {
    try {
      if (!form.ledgerid) {
        return {
          success: false,
          message: "Ledger not found",
        };
      }

      setLoading(true);

      await deleteLedger(form.ledgerid);
     notify.delete("Ledger deleted successfully");
      // reset form
      setForm(INITIAL_FORM);

      return {
        success: true,
        message: "Ledger deleted successfully",
      };
    } catch (err) {
      console.log("Delete error:", err);
      return {
        success: false,
        message: getErrorMessage(err, "Failed to delete ledger"),
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
    ledgers,
    loading,
    limit,
    setLimit,
    fetchAllLedgers,
    handleChange,
    handleSubmit,
    handleDelete,
    loadLedger,
  };
};
