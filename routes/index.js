import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import motorcylceRoutes from "./motorCycleRoutes.js";
import partRoutes from "./partRoutes.js"
import maintenanceRoutes from "./maintenanceRoutes.js"

const router = express.Router();

const routes = [
    { path: "/auth", route: authRoutes },
    { path: "/admin", route: adminRoutes },
    { path: "/motorcycles", route: motorcylceRoutes },
    { path: "/parts", route: partRoutes },
    { path: "/maintenance", route: maintenanceRoutes },
];

routes.forEach(({ path, route }) => {
    router.use(path, route)
});

export default router;
