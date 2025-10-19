import Joi from 'joi'

export const registerSchema = Joi.object({
    fname: Joi.string().min(2).max(50).required(),
    lname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),    
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),      
})