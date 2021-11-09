import Joi from "joi";

const validator = (data: any, schema: Joi.ObjectSchema) => {
  const defaultOptions = {
    abortEarly: false,
    stripUnknown: { objects: true },
  };

  const { error, value } = schema.validate(data, defaultOptions);

  if(error) {
    const errors = error.details.reduce((accumulate: any, err: Joi.ValidationErrorItem) => {
      if (err.context?.key) {
        accumulate[err.context.key] = err.message;
      }
      if (err.context?.peers){
        accumulate[err.context.peers.join('-')] = `${err.context.peers.join(' or ')} are required`;
      }

      return accumulate;
    }, {});

    throw new Error(JSON.stringify(errors))
  }

  return value
}

export default validator;