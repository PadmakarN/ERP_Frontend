import MasterList from '../../components/masterlist/MasterList';
import CompanyMaster from './CompanyMaster';
import { useCompanyMaster } from './useCompanyMaster';

const CompanyMasterList = () => {
 const {fetchAllCompanies,loading,error,companies,limit,setLimit} = useCompanyMaster();
  const columns = [
  { key: 'OnAcID', label: 'CompanyID' ,show:false},
  { key: 'CompanyName', label: 'Company Name', show:true },
  { key: 'Address', label: 'Address', show:true },
  { key: 'Status', label: 'Status', show:true },
];
  //Page or List Title
  const Listtitle="Company List Details";
  const Datewise=false;
  const BranchWise=false;
  
  return (
  <div className="container">
   <MasterList
        columns={columns}
        loading={loading}
        data={companies}
        err={error}
        FormComponent={CompanyMaster}         
        onRefresh={fetchAllCompanies}
        primaryKey='OnAcID'     
        ListTitle={Listtitle}
        Datewise={Datewise}
        BranchWise={BranchWise}
        limit={limit}
        setLimit={setLimit}
      />
  </div>
  );
};

export default CompanyMasterList;