// components/UserActions.jsx
const UserActions = ({ onSave, onDelete }) => {
  return (
    <div className="flex justify-center gap-4">
      <button onClick={onSave} className="px-6 py-3 bg-green-600 text-white rounded-lg">
        Save
      </button>
      <button onClick={onDelete} className="px-6 py-3 bg-red-600 text-white rounded-lg">
        Delete
      </button>
    </div>
  );
};

export default UserActions;