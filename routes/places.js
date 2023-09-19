const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const PlaceController = require('../controllers/places');
const { placeSchema } = require("../schemas/place");
const ErrorHandler = require("../utils/ErrorHandler");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const {isAuthorPlace} = require('../middlewares/isAuthor');
const router = express.Router();

//validasi
const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
};

//routes

router.route('/')
  .get(wrapAsync(PlaceController.index))
  .post(isAuth,validatePlace,wrapAsync(PlaceController.store));

router.get("/create", isAuth, PlaceController.create);

router.route('/:id')
  .get(isValidObjectId("/places"),wrapAsync(PlaceController.show))
  .put( isAuth, isAuthorPlace, isValidObjectId("/places"), validatePlace, wrapAsync(PlaceController.update))
  .delete( isAuth, isAuthorPlace, isValidObjectId("/places"), PlaceController.destroy);

router.get("/:id/edit", isAuth, isAuthorPlace, isValidObjectId("/places"), wrapAsync(PlaceController.edit));



module.exports = router;
