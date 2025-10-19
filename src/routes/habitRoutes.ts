import express from "express";
import { verifyToken } from "../middlewares/authMiddlewares";
import {
     addHabit,
     getHabits,
     editHabit,
     removeHabit
} from "../controllers/habitcontroller";

const router = express.Router()

router.post('/' , verifyToken , addHabit);
router.get('/' , verifyToken , getHabits);
router.put('/:id' , verifyToken , editHabit);
router.delete('/:id' , verifyToken , removeHabit);


export default router