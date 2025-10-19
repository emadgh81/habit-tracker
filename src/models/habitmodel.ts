import { promises } from "dns";
import Pool from "../config/db";

export interface Habit {
    id? : number
    user_id : number
    title : string
    description? : string
    frequency : "daily" | "weekly" | "monthly"
    created_at? : Date
};

export const creatHabit = async (habit : Habit) => {
    const [result] = await Pool.query(
        `INSERT INTO habits (user_id , title , description , frequency) VALUES (? , ? , ? , ?)` ,
        [habit.user_id , habit.title , habit.description , habit.frequency ]
    );
    return result
};

export const getHabitByUser = async (user_id : number) : Promise<Habit[]> => {
    const [rows] = await Pool.query(
        `SELECT * FROM habits WHERE user_id = ?` , [user_id]
    )
    return rows as Habit[]
};

export const getHabitById = async (id : number , user_id : number) : Promise<Habit | null> => {
    const [rows] = await Pool.query(
        `SELECT * FROM habits WHERE id = ? AND user_id = ? `, [id , user_id] 
    )
    const habits = rows as Habit[]
    return habits.length > 0 ? habits[0] : null
};

export const updateHabit = async (habit : Habit) => {
    await Pool.query(
        `UPDATE habits SET title = ? , description = ? , frequency = ? WHERE id = ? AND user_id = ?` ,
        [habit.title, habit.description, habit.frequency, habit.id, habit.user_id]
    )
};

export const deleteHabit = async (id : number , user_id: number) => {
    await Pool.query (
        `DELETE FROM habits WHERE id = ? AND user_id = ?` , [id , user_id]
    )
}

