import express from "express";
let router = express.Router();

router.route("/login").post((req, res) => {});
router.route("/sign-up").post((req, res) => {});
router.route("/password-reset").post((req, res) => {});

router.route("/me").get(async (req, res) => {
  try {
    res.status(200).end({
      status: "success",
      data: { userName: "Aelam" },
      msg: "an unexpected error occured"
    });
  } catch (err) {
    res
      .status(500)
      .end({ status: "error", msg: "an unexpected error occured" });
  }
});

export default router;
