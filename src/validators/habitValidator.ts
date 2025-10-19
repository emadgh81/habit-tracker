import Joi from "joi";

export const habitSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().allow(""),
    frequency: Joi.string().valid("daily", "weekly", "monthly").required(),
})