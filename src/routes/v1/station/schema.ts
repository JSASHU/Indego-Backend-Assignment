import Joi from "@hapi/joi";

export default {
  at: Joi.object().keys({
    at: Joi.date().required(),
  }),
  kioskId: Joi.object().keys({
    kioskId: Joi.number().required(),
  }),
};
