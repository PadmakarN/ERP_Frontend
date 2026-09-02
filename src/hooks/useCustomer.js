import { useState,useEffect } from "react";
import { getCustomers } from "../services/CustomerService";

export const useCustomers=()=>{
    const [customers,setCustomers]= useState([]);

    useEffect(()=>{
        getCustomers().then(setCustomers);
    },[]);
    return {customers};
}