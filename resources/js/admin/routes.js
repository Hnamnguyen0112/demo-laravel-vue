import Dashboard from "./pages/Dashboard.js";
import Tv from "@material-ui/icons/Tv";

var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: Tv,
        iconColor: "Primary",
        component: Dashboard,
        layout: "/admin",
    }
]
export default routes;
