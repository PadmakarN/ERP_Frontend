import React, { useEffect } from 'react';
import API_URL from '../../Config/apiConfig';
import MstList from '../../components/MasterList/MasterList';
import orderHdr from '../SalesOrder/OrderHdr';
import { useOrderHdr } from '../../pages/SalesOrder/useOrderHdr';

 const OrderHdrList = () => {
 const {fetchAllOrders,loading,error,orders,limit} = useOrderHdr();

  const columns = [
  { key: 'ORDERID', label: 'Order ID' ,show:false},
  { key: 'ORDERNO', label: 'Order NO', show:true },
   { key:'DATE', label:'Date', show:true },
  { key: 'BRANCHNAME', label: 'Branch Name', show:true },
  { key: 'BUYERNAME', label: 'Buyer Name', show:true,width:500},
  { key: 'TOTALQTY', label: 'Total Quantity', show:true,summary:"sum"},
  { key: 'TOTALAMOUNT', label: 'Total Amount', show:true,summary:"sum" },
  { key: 'STATUS', label: 'Status', show:true ,width:150},
];
  //Page or List Title
  const Listtitle="Manage and track customer sales orders";
  const PageLink = 'OrderHdr';
  const Datewise=false;
  const BranchWise=false;
  
  useEffect(() => {
   fetchAllOrders();
}, []);

  return (
 
  <div className="container">
      <MstList
        columns={columns}
        loading={loading}
        data={orders}
        width={columns.with}
        err={error}
        FormComponent={orderHdr}
        onRefresh={() => fetchAllOrders(limit)}
        primaryKey='ORDERID'
        ListTitle="Order List Details"
        Datewise={1}
        BranchWise={1}
        limit={limit}
        fetchAllOrders={fetchAllOrders}
      />
  </div>
  );
};

export default OrderHdrList;