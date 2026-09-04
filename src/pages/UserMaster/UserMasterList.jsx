import React, { useEffect } from "react";
import MstList from "../../components/masterlist/MasterList";
import UserMaster from "./UserMaster";
import { useUserMaster } from "../../hooks/useUserMaster"; 


const UserMasterList = () => {
  const { fetchAllUsers,users,loading,error} = useUserMaster();
  const columns = [
    { key: "UserID", label: "UserID", show:false},
    { key: "UserName", label: "UserName" ,show:true},
    { key: "MobileNo", label: "Mobile" , show:true},
    { key: "EmailID", label: "EmailID" ,show:true},
    { key: "Status", label: "Status",show:true},
  ];
  
  //Page or List Title  
  const Listtitle = "User List Details";
  const PageLink = "userMaster";
  const Datewise = false;
  const BranchWise = false;
  // ✅ Simple data fetch without filters

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container">
      <MstList
        columns={columns}
        loading={loading}
        err={error}
        data={users}
        FormComponent={UserMaster}
        onRefresh={fetchAllUsers}
        primaryKey="UserID"
        ListTitle={Listtitle}
        Datewise={Datewise}
        BranchWise={BranchWise}
      />
    </div>
  );
};

export default UserMasterList;
