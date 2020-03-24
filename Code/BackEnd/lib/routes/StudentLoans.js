import express from "express";
let router = express.Router();

router
  .route("/student-loans")
  .get((req, res) => {})
  .post((req, res) => {});

router
  .route("/student-loans/:loanID")
  .put((req, res) => {})
  .delete((req, res) => {});

export default router;
