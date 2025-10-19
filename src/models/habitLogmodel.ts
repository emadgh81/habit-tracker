import Pool from "../config/db";

export interface HabitLog {
    id? : number
    habit_id : number
    user_id : number
    log_date : string
    status : "dane" | "missed"
}

export const addHabitLog = async (log : HabitLog) => {
    const [result] = await Pool.query(
        `INSERT INTO habit_logs (habit_id, user_id, log_date, status) VALUES (?, ?, ?, ?)` ,
        [log.habit_id, log.user_id, log.log_date, log.status]
    )
    return result
};

export const getLogsByHabit = async (habit_id : number , user_id : number ) => {
    const [rows] = await Pool.query(
        `SELECT * FROM habit_logs WHERE habit_id = ? AND user_id = ? ORDER BY log_date DESC`,
        [habit_id , user_id]
    )
    return rows
};

export const getProgress = async (user_id : number) => {
    const [rows] = await Pool.query(
        `SELECT h.title, 
            COUNT(l.id) AS total_logs,
            SUM(l.status = 'done') AS done_count
     FROM habits h
     LEFT JOIN habit_logs l ON h.id = l.habit_id
     WHERE h.user_id = ?
     GROUP BY h.id`,
        [user_id]
    )
    return rows
}

export const getWeeklyReport = async (user_id :number) => {
    const [rows] = await Pool.query(
        `SELECT h.title,
        COUNT(l.id) AS total_logs,
        SUM(l.status = 'done') AS done_count,
        ROUND(SUM(l.status = 'done') / COUNT(l.id) * 100, 1) AS success_rate
 FROM habits h
 LEFT JOIN habit_logs l ON h.id = l.habit_id
 WHERE h.user_id = ? AND l.log_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
 GROUP BY h.id`,
[user_id]
    )
    return rows
};

export const getMonthlyReport = async (user_id : number) => {
    const [rows] = await Pool.query(
        `SELECT h.title,
        COUNT(l.id) AS total_logs,
        SUM(l.status = 'done') AS done_count,
        ROUND(SUM(l.status = 'done') / COUNT(l.id) * 100, 1) AS success_rate
 FROM habits h
 LEFT JOIN habit_logs l ON h.id = l.habit_id
 WHERE h.user_id = ? AND l.log_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
 GROUP BY h.id`,
[user_id]
    )
    return rows
}