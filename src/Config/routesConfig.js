import { FaHome, FaUser, FaLock, FaMoneyBill } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiCog } from "react-icons/bi";
import { AiTwotoneFileExclamation, AiFillHeart } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import Dashboard from "../pages/DashboardPage";
import UserMasterList from "../pages/UserMaster/UserMasterList";
import BranchMasterList from "../pages/BranchMaster/BranchMasterList";
import LedgerMasterList from "../pages/LedgerMaster/LedgerMasterList";
import Analytics from "../pages/Analytics";
import Order from "../pages/OrderHdr";
import Profile from "../pages/Profile";
import Billing from "../pages/Billing";
import OrderHdrList from "../pages/SalesOrder/OrderHdrList";

const routes = [
  {
    key: "dashboard",
    name: "Dashboard",
    icon: FaHome,
    component: Dashboard,
  },
  {
    key: "users",
    name: "Users",
    icon: FaUser,
    component: UserMasterList,
  },
  {
    key: "LedgrMaster",
    name: "LedgrMaster",
    icon: MdMessage,
    component: LedgerMasterList,
  },
  {
    key: "products",
    name: "Products",
    icon: BiAnalyse,
    component: Analytics,
  },
  {
    key: "config",
    name: "Configuration",
    icon: AiTwotoneFileExclamation,
    subRoutes: [
      {
        key: "propertymaster",
        name: "Property Master",
        icon: FaUser,
        component: Profile,
      },
      {
        key: "gridreport",
        name: "Grid Report",
        icon: FaMoneyBill,
        component: Billing,
      },
      {
        key: "modulemaster",
        name: "Module Master",
        icon: FaMoneyBill,
        component: Billing,
      },
    ],
  },
  {
    key: "order",
    name: "Order",
    icon: BsCartCheck,
    component: OrderHdrList,
  },
  {
    key: "branchmaster",
    name: "Branch Master",
    icon: BsCartCheck,
    component: BranchMasterList,
  },
  {
    key: "settings",
    name: "Settings",
    icon: BiCog,
    subRoutes: [
      {
        key: "profile",
        name: "Profile",
        icon: FaUser,
        component: Profile,
      },
      {
        key: "billing",
        name: "Billing",
        icon: FaLock,
        component: Billing,
      },
    ],
  },
  {
    key: "saved",
    name: "Saved",
    icon: AiFillHeart,
    component: Dashboard,
  },
];

export default routes;
