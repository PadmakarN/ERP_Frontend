import MasterList from '../../components/MasterList/MasterList';
import BranchMaster from './BranchMaster';
import { useBranchMaster } from './useBranchMaster';

const BranchMasterList = () => {
 const {fetchAllBranches,loading,error,branches,limit,setLimit} = useBranchMaster();
  const columns = [
  { key: 'BranchID', label: 'BranchID' ,show:true},
  { key: 'BranchName', label: 'Branch Name', show:true },
  { key: 'CompanyName', label:'Company Name', show:true},
  { key: 'Address', label: 'Address', show:true },
  { key: 'City', label: 'City', show:true },
  { key: 'Status', label: 'Status', show:true },
];
  //Page or List Title
  const Listtitle="Branch List Details";
  const Datewise=false;
  const BranchWise=false;
  
  return (
  <div className="container">
   <MasterList
        columns={columns}
        loading={loading}
        data={branches}
        err={error}
        FormComponent={BranchMaster}         
        onRefresh={fetchAllBranches}
        primaryKey='BranchID'       
        ListTitle={Listtitle}
        Datewise={Datewise}
        BranchWise={BranchWise}
        limit={limit}
        setLimit={setLimit}
      />
  </div>
  );
};

export default BranchMasterList;