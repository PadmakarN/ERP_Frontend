import {
  Save,
  Trash2,
} from "lucide-react";

import AppButton from "../AppButton";

const FormActions = ({
  onSave,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">

      <AppButton
        variant="success"
        onClick={onSave}
        text={
          <div className="flex items-center gap-2">
            <Save size={12} />
            Save
          </div>
        }
      />

      <AppButton
        variant="danger"
        onClick={onDelete}
        text={
          <div className="flex items-center gap-2">
            <Trash2 size={12} />
            Delete
          </div>
        }
      />

    </div>
  );
};

export default FormActions;