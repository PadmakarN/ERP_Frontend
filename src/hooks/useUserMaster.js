import { useState, useEffect } from "react";
import {
  getAllUsers,
  getUserById,
  saveUserMaster,
  updateUserMaster,
  deleteUserMaster,
} from "../services/userMaster.service";
import { userMasterSchema } from "../validation/userMaster.validation";
import API_URL from "../config/apiConfig";

export const useUserMaster = (userid) => {
  // 🧱 initial form
  const initialForm = {
    userid: "",
    username: "",
    emailid: "",
    mobileno: "",
    password: "",
    status: "",
    image: null,
  };

  // 🧠 states
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  /* ================= FETCH ALL USERS ================= */ 
  
  const fetchAllUsers = async () => {
    try{
      setLoading(true);
      const { data } = await getAllUsers();
      setUsers(data);
      setError(null);
      return {
        success: true,
        data,
      };  
    } catch (err) {
      console.log("Fetch all users error:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
      return {
        success: false,
        message: err.response?.data?.message || err.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  }; 



  /* ================= LOAD USER ================= */
  useEffect(() => {
    if (userid) loadUser();
  }, [userid]);

  const loadUser = async () => {
    try {
      setLoading(true);

      const { data } = await getUserById(userid);
      
console.log("USER DATA:", data);
console.log("DATABASE STATUS:", data.Status);
      setForm({
        userid: data.UserID || "",
        username: data.UserName || "",
        emailid: data.EmailID || "",
        mobileno: data.MobileNo || "",
        password: data.Password || "",
        status: data.Status || "",
        image: data.ProfileImage || null,
      });

      if (data.ProfileImage) {
        setPreview(`${API_URL}/uploads/UserMaster/${data.ProfileImage}`);
      } else {
        setPreview(null);
      }
    } catch (err) {
      console.log("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // error clear karo
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ================= IMAGE ================= */
  const handleImageChange = (file) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreview(null);

    setForm((prev) => ({
      ...prev,
      image: null,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      // ✅ validation
      await userMasterSchema.validate(form, { abortEarly: false });

      setLoading(true);

      if (form.userid) {
        await updateUserMaster(form.userid, form, image);
        return{
          success: true,
          message: "User updated successfully",
        }
      } else {
        const response = await saveUserMaster(form, image);
        const data = response?.data.data??[];
        setForm({
          userid: data.UserID || "",
          username: data.UserName || "",
          emailid: data.EmailID || "",
          mobileno: data.MobileNo || "",
          password: data.Password || "",
          status: data.Status || "",
          image: data.ProfileImage || null,
        });
      
        if (data.ProfileImage) {
          setPreview(`${API_URL}/uploads/UserMaster/${data.ProfileImage}`);
        } else {
          setPreview(null);
        }

        return {
          success: true,
          message: "User created successfully",
        };
      }
    } catch (err) {

      if (err.inner && err.inner.length > 0) {
        const fieldErrors = {};

        err.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });

        setErrors(fieldErrors);
        return {
          success: false,
          message: "Validation failed",
        };
      } else {
        console.log("Other error:", err);
        return {
          success: false,
          message: err.response?.data?.message || err.message || "Something went wrong",
        };
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!form.userid) return{
      success: false,
      message: "User not found",
    };

    try {
      setLoading(true);
      await deleteUserMaster(form.userid);
      setForm(initialForm);
      setPreview(null);
      return {
        success: true,
        message: "User deleted successfully",
      };
    } catch (err) {
      console.log("Delete error:", err);
      return {
        success: false,
        message: "Failed to delete user",
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
    preview,
    loading,
    setImage,
    fetchAllUsers,
    users,
    handleImageChange,
    handleImageRemove,
    handleChange,
    handleSubmit,
    handleDelete,
  };
};
