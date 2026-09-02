import { useRef } from "react";

const ImageUploader = ({ preview, onImageChange, onImageRemove }) => {
  const fileRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Profile Image</label>

      <div
        onClick={() => fileRef.current.click()}   // 🔥 click open
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
      >
        {!preview ? (
          <div>
            <p className="text-gray-500">Drag & Drop image here</p>
            <p className="text-xs text-gray-400">or click to upload</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="preview"
              className="h-24 w-24 object-cover rounded-lg shadow"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // 🔥 important (click box trigger ना हो)
                onImageRemove();
              }}
              className="text-red-500 text-sm border border-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-white transition"
            >
              X
            </button>
          </div>
        )}

        {/* hidden input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            onImageChange(file);
          }}
        />
      </div>
    </div>
  );
};

export default ImageUploader;