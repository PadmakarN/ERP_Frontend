import React from "react";
import { useOrderHdr } from "./useOrderHdr";
import PageHeader from "../../components/common/PageHeader";
import UserActions from "../../components/usermaster/UserActions";
import AppButton from "../../components/common/AppButton";
import Toast from "../../components/Toast";
import OrderHdrForm from "./OrderHdrForm";

import { useState } from "react";

function OrderHdr({ onClose, id }) {
  const {
    form,
    setForm,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleDelete,
  } = useOrderHdr(id);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const onSave = async () => {
    const result = await handleSubmit();
    setToast({
      show: true,
      message: result.message,
      type: result.success ? "success" : "error",
    });

 

  };
  return(
    <div className="min-h-screen flex flex-col bg-gray-50">
        {/* 🔹 Header + Desktop Actions */}
      <PageHeader
        leftContent={
          <div className="hidden sm:block">
            <UserActions onSave={onSave} onDelete={handleDelete} />
          </div>
        }
        title="Ledger Master"
        rightContent={
          <AppButton
            variant="danger"
            text="X"
            onClick={onClose}
          />
        }
        background="bg-blue-300"
      />

      {/* 🔹 Form Section */}
      <div className="flex-1 px-4 pb-24">
        <div className="bg-white p-4 rounded-xl shadow-sm">

          <OrderHdrForm
            form={form}
            setForm={setForm}
            loading={loading}
            errors={errors}
            onChange={handleChange}
          />

        </div>
      </div>

       {/* 🔹 Mobile Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 md:hidden">
        <UserActions onSave={onSave} onDelete={handleDelete} />
      </div>
      
      {/* 🔹 Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />

    </div>
  ) 
}
export default OrderHdr;
