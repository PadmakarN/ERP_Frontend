import React from "react";

export const useMasterList()=>{
     //edit Record
    const handleEdit = (row) => {
     //console.log("Selected Row :", row);
    const id = row?.[primaryKey];

    if (FormComponent) {
      openModalWin((props) => <FormComponent {...props} id={id} />);
    } else {
      navigate(`/${PageLink}/${row[primaryKey]}`);
    }
  };

  // NEW
  const handleNew = () => {
    if (FormComponent) {
      openModalWin((props) => <FormComponent {...props} data={null} />);
    } else {
      navigate(`/${PageLink}`);
    }
  };

  return{
    handleEdit,
    handleNew
  }
}

