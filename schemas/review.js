const Joi = require("joi");

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    body: Joi.string()
      .trim()
      .min(3)
      .required()
      .custom((value, helpers) => {
        if (value.trim() === "") {
          return helpers.error("string.empty");
        }
        return value;
      }),
  }).required(),
});
