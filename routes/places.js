const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const Place = require("../models/place");
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
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
  })
);

router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});

router.post(
  "/",
  isAuth,
  validatePlace,
  wrapAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    await place.save();
    req.flash("success_msg", "Place added successfully");
    res.redirect("/places");
  })
);

router.get(
  "/:id",
  isValidObjectId("/places"),
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id)
      .populate("reviews")
      .populate("author");
    res.render("places/show", { place });
  })
);

router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/edit", { place });
  })
);

router.put(
  "/:id",
  isAuth, isAuthorPlace,
  isValidObjectId("/places"),
  validatePlace,
  wrapAsync(async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    req.flash("success_msg", "Place updated successfully");
    res.redirect(`/places/${req.params.id}`);
  })
);

router.delete("/:id", isAuth, isAuthorPlace, isValidObjectId("/places"), async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Place deleted successfully");
  res.redirect(`/places`);
});

module.exports = router;
