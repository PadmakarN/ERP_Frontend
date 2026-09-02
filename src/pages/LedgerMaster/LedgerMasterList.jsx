import MasterList from '../../components/MasterList/MasterList';
import LedgerMaster from './LedgerMaster';
import { useLedgerMaster } from './useLedgerMaster';

const LedgerMasterList = () => {
 const {fetchAllLedgers,loading,error,ledgers,limit,setLimit} = useLedgerMaster();
  const columns = [
  { key: 'LedgerID', label: 'LedgerID' ,show:false},
  { key: 'LedgerName', label: 'Ledger Name', show:true },
  { key: 'GroupName', label:'Group Name', show:true},
  { key: 'Address', label: 'Address', show:true },
  { key: 'City', label: 'City', show:true },
  { key: 'Status', label: 'Status', show:true },
];
  //Page or List Title
  const Listtitle="Ledger List Details";
  const Datewise=false;
  const BranchWise=false;
  
  return (
  <div className="container">
   <MasterList
        columns={columns}
        loading={loading}
        data={ledgers}
        err={error}
        FormComponent={LedgerMaster}         
        onRefresh={fetchAllLedgers}
        primaryKey='LedgerID'       
        ListTitle={Listtitle}
        Datewise={Datewise}
        BranchWise={BranchWise}
        limit={limit}
        setLimit={setLimit}
      />
  </div>
  );
};

export default LedgerMasterList;