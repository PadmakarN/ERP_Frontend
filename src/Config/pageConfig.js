import {
  FaHome,
  FaUser,
  FaLock,
  FaMoneyBill,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiCog } from "react-icons/bi";
import {
  AiTwotoneFileExclamation,
  AiFillHeart,
} from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";

// Pages import (example)
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Customer from "../pages/Customer";


export const pagesConfig = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <FaHome />,
    component: Dashboard,
  },
  {
    id: "users",
    name: "Users",
    icon: <FaUser />,
    component: Users,
  },
  {
    id: "customer",
    name: "Customer",
    icon: <MdMessage />,
    component: Customer,
  },
  
];
