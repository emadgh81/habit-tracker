import Joi from "joi";

export const habitLogSchema = Joi.object({
    habit_id: Joi.number().integer().required(),
    log_date: Joi.date().required(),
    status: Joi.string().valid("done", "missed").required()
})