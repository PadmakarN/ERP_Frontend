import ImageUploader from "../../../components/common/ImageUploader";
import FormGrid from "../../../components/common/Form/FormGrid";
import FormSection from "../../../components/common/Form/FormSection";
import {
  User,
} from "lucide-react";

const ProfileInfo=({
    preview,
    onImageChange,
    onImageRemove
})=>{
    return(
        <FormSection title={"Profile Image"} icon={<User size={18}/>}>
            <FormGrid>
                <div className="md:col-span-4">
                <ImageUploader
                 preview={preview}
                 onImageChange={onImageChange}
                  onImageRemove={onImageRemove}
                 />
                 </div>
            </FormGrid>
        </FormSection>

    )
}
export default ProfileInfo;


