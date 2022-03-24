const express = require("express");
const _ = require("lodash");
const { Instrument, validateInstrument } = require("../models/instrument");
const auth = require("../middleware/auth");
const router = express.Router();


router.delete("/:id", auth, async (req, res) => {
  const instrument = await Instrument.findOneAndRemove({
    _id: req.params.id
  });
  if (!instrument)
    return res.status(404).send("The item with the given ID was not found.");
  res.send(instrument);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateInstrument(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let instrument = await Instrument.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!instrument)
    return res.status(404).send("The item with the given ID was not found.");

  instrument = await Instrument.findOne({ _id: req.params.id });
  res.send(instrument);
});

router.get("/search/:filter", auth, async (req, res) => {
  const instruments = await Instrument.find({
    instrumentName: req.params.filter
  });
  if (!instruments)
    return res.status(404).send("No results matching your search found");
  res.send(instruments);
});

router.get("/:id", auth, async (req, res) => {
  const instrument = await Instrument.findOne({
    _id: req.params.id
  });
  if (!instrument)
    return res.status(404).send("The item with the given ID was not found.");
  res.send(instrument);
});

router.get("/", auth, async (req, res) => {
  const instruments = await Instrument.find();
  res.send(instruments);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateInstrument(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let instrument = new Instrument({
    instrumentName: req.body.instrumentName,
    instrumentDescription: req.body.instrumentDescription,
    instrumentBrand: req.body.instrumentBrand,
    instrumentPrice: req.body.instrumentPrice,
    instrumentImage: req.body.instrumentImage
      ? req.body.instrumentImage
      : "https://cdn.pixabay.com/photo/2016/04/12/20/03/colorful-1325271__340.png"
  });

  post = await instrument.save();
  res.send(post);
});

module.exports = router;