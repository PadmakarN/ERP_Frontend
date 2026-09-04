import ImageUploader from "../../components/common/ImageUploader";
import BasicInfo from "./sections/BasicInfo";
import ProfileInfo from "./sections/Profileinfo";

const UserForm = ({
  form,
  setForm,
  errors,
  onChange,
  loading,
  preview,
  onImageChange,
  onImageRemove,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BasicInfo
        form={form}
        setForm={setForm}
        errors={errors}
        onChange={onChange}
      />
      {/* 🔥 Image */}
      <ProfileInfo
      preview={preview}
      onImageChange={onImageChange}
      onImageRemove={onImageRemove}
      />
    </div>
  );
};

export default UserForm;
