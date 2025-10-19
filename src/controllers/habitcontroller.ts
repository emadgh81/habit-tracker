import  {Response}  from "express";
import { habitSchema } from "../validators/habitValidator";
import { AuthRequest } from "../middlewares/authMiddlewares";
import {
     creatHabit,
     getHabitById,
     getHabitByUser,
     updateHabit,
     deleteHabit
 } from "../models/habitmodel";

 export const addHabit = async (req : AuthRequest , res : Response ) => {
    try {
        const {error} = habitSchema.validate(req.body)
        if (error) return res.status(400).json({message : error.details[0].message})
        
        const {title , description , frequency} = req.body
        const result = await creatHabit({
           user_id : req.user!.id,
           title,
           description,
           frequency
        })
        res.status(201).json({message : `Habit created successfully` , result})
    } catch(err) {
        console.error(err)
        res.status(500).json({message : `Server Error`})
    }
 };

 export const getHabits = async (req : AuthRequest , res : Response ) => {
    try {
        const habits = await getHabitByUser(req.user!.id);
        res.json(habits);
    } catch(err) {
        console.error(err)
        res.status(500).json({message : `Server Error`})
    }
 };

 export const editHabit = async (req :AuthRequest , res : Response) => {
    try {
        const {id } = req.params
        const exsistingHabit = await getHabitById(Number(id) , req.user!.id)
        if (!exsistingHabit) return res.status(404).json({message : `Habit not found`})

        const { title, description, frequency } = req.body;
        await updateHabit({id: Number(id) , user_id : req.user!.id , title, description, frequency})
        res.json({message : `Habit updated successfully`})
    } catch(err) {
        console.error(err)
        res.status(500).json({message : `Server Error`})
    }
 };

 export const removeHabit = async (req : AuthRequest , res : Response) => {
    try {
        const {id} = req.params
        const exsistingHabit = await getHabitById(Number(id) , req.user!.id)
        if (!exsistingHabit) return res.status(404).json({message : `Habit not found`})

        await deleteHabit(Number(id) , req.user!.id) 
        res.json({message : `Habit deleted successfully`})
    } catch(err) {
        console.error(err)
        res.status(500).json({message : `Server Error`})
    }
 }