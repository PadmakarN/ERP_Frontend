import AppInput from "../../components/common/AppInput";
import AppLookup from "../../components/common/AppLookup/AppLookup";
import Loading from "../../components/Loading";


const OrderHdrForm = ({ form, setForm, errors, onChange, loading }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInput
          label="OrderID"
          name="orderid"
          value={form.orderid}
          onChange={onChange}
          hidden
        />
        <AppInput
          label="Order No"
          name="orderno"
          value={form.orderno}
          onChange={onChange}
          readOnly
        />
        <AppInput
          label="Order Date"
          name="orderdate"
          value={form.orderdate}
          onChange={onChange}
          type="date"
          error={errors.orderdate}
          required
        />
        <AppInput
          label="Branch Name"
          name="branchname"
          value={form.branchname}
          onChange={onChange}
          error={errors.branchname}
          required
        />
        <AppInput
          label="Customer Name"
          name="customername"
          value={form.customername}
          onChange={onChange}
          error={errors.customername}
          required
        />
        <AppInput
          label="Customer GSTIN"
          name="customergstin"
          value={form.customergstin}
          onChange={onChange}
          error={errors.customergstin}
          required
        />
        <AppLookup
          label="Status"
          name="status"
          value={form.status}
          error={errors.status}
          required
          options={[
            { label: "Active", value: "A" },
            { label: "Deactive", value: "D" },
            { label: "Create", value: "C" },
          ]}
          onChange={(val) =>
            setForm({
              ...form,
              status: val,
            })
          }
        />
      </div>
    </div>
  );
};

export default OrderHdrForm