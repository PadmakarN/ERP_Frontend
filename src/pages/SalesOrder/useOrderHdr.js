import { useState } from "react";
import {
  getaAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../pages/SalesOrder/orderHdr.services";
import { OrderHdrSchema } from "../../pages/SalesOrder/orderHdr.validation";

export const useOrderHdr = () => {
  const initialForm = {
    orderid: "",
    orderno: "",
    date: "",
    BranchID: "",
    onAcid: "",
    currency: "",
    cf: "",
    buyerID: "",
    buyerAddress: "",
    remarks: "",
    totalamount: "",
    totalqty: "",
    status: "",
  };

  const [form, setForm] = useState(initialForm);
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);

  const loadFormData = (data) => {
    setForm({
      orderid: data?.OrderID || "",
      orderno: data?.OrderNo || "",
      date: data?.OrderDate || "",
      BranchID: data?.BranchID || "",
      onAcid: data?.OnAcID || "",
      currency: data?.Currency || "",
      cf: data?.CF || "",
      buyerID: data?.BuyerID || "",
      buyerAddress: data?.BuyerAddress || "",
      remarks: data?.Remarks || "",
      totalamount: data?.TotalAmount || "",
      totalqty: data?.TotalQty || "",
      status: data?.Status || "",
    });
  };

  // All Orders
  const fetchAllOrders = async (newLimit) => {
    try {
      setLoading(true);

      const finalLimit = newLimit ?? limit;

      if (newLimit) setLimit(newLimit);

      const res = await getaAllOrders(finalLimit);

      setOrders(res.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Single Order
  const fetchOrderById = async (id) => {
    try {
      setLoading(true);

      const res = await getOrderById(id);

      if (res.data) {
        loadFormData(res.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save / Update
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await OrderHdrSchema.validate(form, {
        abortEarly: false,
      });

      setErrors({});

      let res;

      if (form.orderid) {
        res = await updateOrder(form.orderid, form);
      } else {
        res = await createOrder(form);
      }

      // Latest Data Load
      if (res?.data?.OrderID) {
        await fetchOrderById(res.data.OrderID);
      }

      await fetchAllOrders();

      return true;
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};

        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });

        setErrors(validationErrors);
      } else {
        setError(err.message);
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await deleteOrder(id);

      await fetchAllOrders();

      if (form.orderid === id) {
        setForm(initialForm);
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reset
  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
  };

  return {
    form,
    setForm,
    orders,
    loading,
    error,
    errors,
    setErrors,
    limit,
    fetchAllOrders,
    fetchOrderById,
    handleSubmit,
    handleDelete,
    resetForm,
  };
};
