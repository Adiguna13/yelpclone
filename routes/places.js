const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const PlaceController = require('../controllers/places');
const { validatePlace } = require('../middlewares/validator');
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const {isAuthorPlace} = require('../middlewares/isAuthor');
const upload = require("../config/multer");
const router = express.Router();

//routes
router.route('/')
  .get(wrapAsync(PlaceController.index))
  .post(isAuth, upload.array('image', 5), validatePlace,wrapAsync(PlaceController.store));

router.get("/create", isAuth, PlaceController.create);

router.route('/:id')
  .get(isValidObjectId("/places"),wrapAsync(PlaceController.show))
  .put( isAuth, isAuthorPlace, isValidObjectId("/places"), upload.array('image', 5), validatePlace, wrapAsync(PlaceController.update))
  .delete( isAuth, isAuthorPlace, isValidObjectId("/places"), PlaceController.destroy);

router.get("/:id/edit", isAuth, isAuthorPlace, isValidObjectId("/places"), wrapAsync(PlaceController.edit));

router.delete('/:id/images', wrapAsync(PlaceController.destroyImages))

module.exports = router;
