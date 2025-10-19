import express from "express";
import { verifyToken } from "../middlewares/authMiddlewares";
import { 
        addLog,
        getUserProgress, 
        getHabitLogs,
        getMonthlyStats,
        getWeeklyStats
    } from "../controllers/habitLogcontroller";

const router = express.Router();

router.post('/' , verifyToken , addLog);
router.get('/:habit_id' , verifyToken , getHabitLogs);
router.get('/' , verifyToken , getUserProgress);
router.get('/report/weekly' , verifyToken , getWeeklyStats);
router.get('/report/monthly' , verifyToken , getMonthlyStats)


export default router