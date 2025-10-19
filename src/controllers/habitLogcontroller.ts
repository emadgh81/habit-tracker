import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddlewares";
import { habitLogSchema } from "../validators/habitLogValidator";
import { getHabitById } from "../models/habitmodel";
import {
         addHabitLog,
         getLogsByHabit,
         getProgress,
         getMonthlyReport,
        getWeeklyReport
    } from "../models/habitLogmodel";


export const addLog = async (req :AuthRequest , res : Response) => {
    try{
        const {error} = habitLogSchema.validate(req.body)
        if (error) return res.status(400).json({message : error.details[0].message})

        const { habit_id, log_date, status } = req.body
        const habit = await getHabitById(habit_id , req.user!.id) 
        if (!habit) return res.status(404).json({message : `Habit not found`})
        
        await addHabitLog ({
            habit_id,
            user_id: req.user!.id,
            log_date,
            status,
        })
        res.status(201).json({message : `Habit log added successfully`})
    } catch (err : any) {
        if (err.code === "ER_DUP_ENTRY")
        return res.status(400).json({message : `Log already exists for this date`})
        console.error(err)
        res.status(500).json({ message: `Server Error` })
    }
};

export const getHabitLogs = async (req: AuthRequest , res : Response) => {
    try{
        const {habit_id} = req.params
        const logs = await getLogsByHabit(Number(habit_id), req.user!.id)
        res.json({logs})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: `Server Error` });
    }
};

export const getUserProgress = async (req : AuthRequest , res : Response) => {
    try{
        const progress = await getProgress(req.user!.id)
        res.json({progress})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: `Server Error` });
    }
};

export const getWeeklyStats = async (req : AuthRequest , res : Response ) => {
    try{
        const report = getWeeklyReport(req.user!.id)
        res.json({report})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: `Server Error` });
    }
};

export const getMonthlyStats = async (req : AuthRequest , res : Response ) => {
    try {
        const report = getMonthlyReport(req.user!.id)
        res.json({report})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: `Server Error` });
    }
}