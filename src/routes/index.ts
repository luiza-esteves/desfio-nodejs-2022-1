import { Router } from 'express';
import listRoutes from "./listRoutes";
import taskRoutes from "./taskRoutes";


const router = Router();

router.use('/list',listRoutes);
router.use('/task',taskRoutes);



export { listRoutes,taskRoutes, router };