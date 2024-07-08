import "./App.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup.jsx";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout.jsx";
import { Offline } from "react-detect-offline";
import NavbarSinglePage from "./component/NavbarSinglePage/NavbarSinglePage.jsx";
import Winch from "./component/Winch/Winch.jsx";
import Mechanic from "./component/Mechanic/Mechanic.jsx";
import MaintenanceCenters from "./component/MaintenanceCenters/MaintenanceCenters.jsx";
import MechanicDetails from "./component/MechanicDetails/MechanicDetails.jsx";
// import Rating from "./component/Rating/Rating.jsx";
import NotFound from "./component/NotFound/NotFound.jsx";
import WinchCost from "./component/WinchCost/WinchCost.jsx";
import Dashboard from "./component/Dashboard/Dashboard";
import Submittingrate from "./component/submittingrate/submittingrate";
import Mechanics from "./component/mechanics/mechanics";
import Adminlogin from "./component/Adminlogin/Adminlogin.jsx";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <NavbarSinglePage />,
      children: [
        {
          index: true,
          element: <NavbarSinglePage />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "submittingrate",
          element: <Submittingrate></Submittingrate>,
        },
        {
          path: "Dashboard",
          element: <Dashboard></Dashboard>,
        },
        {
          path: "signup",
          element: <Signup></Signup>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: "winch/",
          element: <Winch></Winch>,
        },
        {
          path: "mechanic/",
          element: <Mechanic></Mechanic>,
        },
        {
          path: "Mechanics/",
          element: <Mechanics></Mechanics>,
        },
        {
          path: "maintenance/:phone",
          element: <MaintenanceCenters></MaintenanceCenters>,
        },
        {
          path: "mechanic-details/:mechanicid",
          element: <MechanicDetails></MechanicDetails>,
        },
        { path: "*", element: <NotFound /> },
        {
          
          path: "winchcost",
          element: <WinchCost></WinchCost>,
        },
        {
          
          path: "adminlogin",
          element: <Adminlogin></Adminlogin>,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <Offline>
        <div className="offline">You're currently Offline!</div>
      </Offline>
    </>
  );
}

export default App;
