const UserForm = ({ form, errors, onChange }) => {
  return (
    <div className="space-y-5">
      <input
        name="username"
        value={form.username}
        onChange={onChange}
        placeholder="Enter username"
        className="
          w-full
          p-3
          rounded-lg
          border
          border-slate-300
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          text-slate-800
          dark:text-gray-100
          placeholder:text-slate-400
          dark:placeholder:text-gray-500
          outline-none
          transition-colors
          duration-300
          focus:border-blue-500
          dark:focus:border-blue-400
          focus:ring-2
          focus:ring-blue-500/20
        "
      />

      {errors.username && (
        <p
          className="
            text-sm
            text-red-500
            dark:text-red-400
            transition-colors
            duration-300
          "
        >
          {errors.username}
        </p>
      )}
    </div>
  );
};

export default UserForm;