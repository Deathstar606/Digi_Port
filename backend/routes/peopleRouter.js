const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const People = require('../models/people');
//var authenticate = require('../authenticate');

const PeopleRouter = express.Router();

PeopleRouter.use(bodyParser.json());

PeopleRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, async (req, res, next) => {
    try {
        const cloth = await People.find(req.query)
        .lean();
        res.status(200).json(cloth);
    } catch (error) {
        next(error);
    }
})
.post(cors.corsWithOptions, /* authenticate.verifyUser, */ async (req, res) => {
  const peopleItem = req.body;
  console.log(peopleItem);
  try {

    const hasEmptyField = Object.values(peopleItem).some(
      (value) => value === '' || value === null || value === undefined
    );

    if (hasEmptyField) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newPeople = await People.create(peopleItem);

    res.status(201).json({
      message: "Case added successfully.",
      data: newPeople,
    });
  } catch (error) {
    console.error("Error adding People", error);
    res.status(500).json({
      message: "Internal server error while adding people.",
      error: error.message,
    });
  }
});

PeopleRouter.route("/:deleteId")
    .options(cors.corsWithOptions, /* authenticate.verifyUser, */ (req, res) => res.sendStatus(200))
    .delete(cors.cors, async (req, res, next) => {
        try {
            // Find the service by ID
            const peopleID = await People.findById(req.params.deleteId);
            if (!peopleID) {
                return res.status(404).json({ error: `Person ${req.params.deleteId} not found` });
            }

            await People.findByIdAndRemove(req.params.deleteId);

            res.status(200).json({ message: "People Has Been Removed" });
        } catch (error) {
            next(error);
        }
    }
)
.put(cors.cors, async (req, res, next) => {
    try {
      const { name, designation, description } = req.body;

      if (!name || !description|| !designation) {
        return res.status(400).json({ error: "Both name and description are required." });
      }

      const updatedPeople = await People.findByIdAndUpdate(
        req.params.deleteId,
        { name, designation, description },
        { new: true, runValidators: true }
      );

      if (!updatedPeople) {
        return res.status(404).json({ error: `Case ${req.params.deleteId} not found` });
      }

      res.status(200).json({
        message: "Case updated successfully",
        updatedPeople,
      });
    } catch (error) {
      next(error);
    }
});

module.exports = PeopleRouter;