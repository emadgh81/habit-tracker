import express from 'express';
import dotenv from 'dotenv';
import { startReminders } from "./utils/reminder";
dotenv.config();

import userRoutes from './routes/userRoutes'
import habitRoutes from './routes/habitRoutes'
import habitLogRoutes from './routes/habitLogRoutes'

const app = express();
startReminders();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/habits', habitRoutes)
app.use('/habit_logs' , habitLogRoutes)


app.get('/' , (req , res) => {
    res.send('Habit tracker API is running!!!!')
});

export default app