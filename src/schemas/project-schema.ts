import joi from 'joi';

export const projectSchema = joi.object({
    name: joi.string().required(),
    url: joi.string().uri().required(),
    skipTestCase: joi.array().items(joi.string()),
    environment: joi.string().required(),
    loginScript: joi.func()
})
