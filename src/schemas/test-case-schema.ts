import joi from 'joi';

export const testCaseSchema = joi.object( {
    name: joi.string().required(),
    environments: joi.array().items( joi.string() ).required(),
    requireAuth: joi.boolean().required(),
    exec: joi.func().maxArity( 2 ).required(),
} )
