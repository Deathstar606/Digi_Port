const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");

const Cases = require("../models/case");
var authenticate = require("../authenticate");

const CaseRouter = express.Router();

CaseRouter.use(bodyParser.json());

CaseRouter.route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, async (req, res, next) => {
    try {
      const cloth = await Cases.find(req.query).lean();
      res.status(200).json(cloth);
    } catch (error) {
      next(error);
    }
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    const caseItem = req.body;

    try {
      const hasEmptyField = Object.values(caseItem).some(
        (value) => value === "" || value === null || value === undefined
      );

      if (hasEmptyField) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newCase = await Cases.create(caseItem);

      res.status(201).json({
        message: "Case added successfully.",
        data: newCase,
      });
    } catch (error) {
      console.error("Error adding case:", error);
      res.status(500).json({
        message: "Internal server error while adding case.",
        error: error.message,
      });
    }
  });

CaseRouter.route("/:deleteId")
  .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) =>
    res.sendStatus(200)
  )
  .delete(cors.cors, async (req, res, next) => {
    try {
      // Find the service by ID
      const caseID = await Cases.findById(req.params.deleteId);
      if (!caseID) {
        return res
          .status(404)
          .json({ error: `Case ${req.params.deleteId} not found` });
      }

      await Cases.findByIdAndRemove(req.params.deleteId);

      res.status(200).json({ message: "Case Has Been Removed" });
    } catch (error) {
      next(error);
    }
  })
  .put(cors.cors, authenticate.verifyUser, async (req, res, next) => {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Both name and description are required." });
      }

      const updatedCase = await Cases.findByIdAndUpdate(
        req.params.deleteId,
        { name, description },
        { new: true, runValidators: true }
      );

      if (!updatedCase) {
        return res
          .status(404)
          .json({ error: `Case ${req.params.deleteId} not found` });
      }

      res.status(200).json({
        message: "Case updated successfully",
        updatedCase,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = CaseRouter;
