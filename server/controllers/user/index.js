import express, { response } from "express";
import bcrypt from "bcrypt";
import randomstring from "randomstring";
const router = express.Router();

// import validations
import {
  userRegistrationValidations,
  userLoginValidations,
  errorMiddleware,
  taskValidations,
} from "../../middlewares/validations/index.js";

// import model
import User from "../../models/User.js";
import Todo from "../../models/Todo.js";
// import helpers
import sendMail from "../../helpers/sendMail.js";
import sendSMS from "../../helpers/sendSMS.js";
import generateToken from "../../helpers/generateToken.js";
// import verifyToken from "../../middlewares/auth/index.js";

/*
    API EndPoint : /api/user/register
    Method : POST
    Access Type : Public
    Validations : 
    Description : Get user details
*/

router.post(
  "/register",
  userRegistrationValidations(),
  errorMiddleware,
  async (req, res) => {
    try {
      const userData = await User.findOne({ email: req.body.email });

      if (userData) {
        return res.status(401).json({ msg: "User already exists" });
      }
      const finalData = new User(req.body);
      const todos = new Todo({
        user: finalData._id,
      });

      const salt = await bcrypt.genSalt(10);
      finalData.password = await bcrypt.hash(req.body.password, salt);
      finalData.verification.email.token = randomstring.generate();
      finalData.verification.phone.token = randomstring.generate();
      await finalData.save();
      await todos.save();
      await Promise.all([
        sendMail(
          finalData.fullname,
          finalData.email,
          finalData.verification.email.token
        ),
        sendSMS(
          finalData.fullname,
          finalData.phone,
          finalData.verification.phone.token
        ),
      ]);
      res.status(200).json({
        _id: finalData._id,
        name: finalData.name,
        email: finalData.email,
        phone: finalData.phone,
        token: generateToken(finalData._id),
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/*
    API EndPoint : /api/user/verifymail/email/token
    Method : GET
    Access Type : Public
    Validations:
       a: Find user and update verified to true if user token matches
    Description : User Email Verification
*/

router.get("/verifymail/:email/:token", async (req, res) => {
  try {
    let data = await User.findOne({ email: req.params.email });
    if (!data) {
      return res
        .status(404)
        .send(
          "<h2 style='color:red;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid red;'>The user does not exist</h2>"
        );
    }
    if (data.verification.email.token != req.params.token) {
      return res
        .status(404)
        .send(
          "<h2 style='color:red;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid red;'>Invalid Token</h2>"
        );
    }
    if (data.verification.email.verified) {
      return res
        .status(404)
        .send(
          "<h2 style='color:blue;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid red;'>User email already verified</h2>"
        );
    }
    data.verification.email.verified = true;
    await data.save();
    res
      .status(200)
      .send(
        "<h2 style='color:green;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid green;'>Email verification successful!</h2>"
      );
  } catch (error) {
    res.status(500).json({ msg: "Failed login request" });
  }
});

/*
    API EndPoint : /api/user/verifyphone/phone/token
    Method : GET
    Access Type : Public
    Validations:
       a: Find user and update verified to true if user token matches
    Description : User Phone Verification
*/

router.get("/verifyphone/:phone/:token", async (req, res) => {
  try {
    let data = await User.findOne({ phone: req.params.phone });
    if (!data) {
      return res
        .status(404)
        .send(
          "<h2 style='color:red;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid red;'>The user does not exist</h2>"
        );
    }
    if (data.verification.phone.token != req.params.token) {
      return res
        .status(404)
        .send(
          "<h2 style='color:red;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid red;'>Invalid Token</h2>"
        );
    }
    if (data.verification.phone.verified) {
      return res
        .status(404)
        .send(
          "<h2 style='color:blue;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid red;'>User Phone already verified</h2>"
        );
    }
    data.verification.phone.verified = true;
    await data.save();
    res
      .status(200)
      .send(
        "<h2 style='color:green;width:400px;margin:0 auto;background-color:ghostwhite;text-align:center;border:1px solid green;'>Email verification successful!</h2>"
      );
  } catch (error) {
    res.status(500).json({ msg: "Failed login request" });
  }
});

/*
      API EndPoint : /api/users/login
      Method : POST
      Payload : Request.Body - email,password
      Access Type : Public
      Validations : 
          a) Check Valid Email and verify if password is the same
      Description : User Login 
*/
router.post(
  "/login",
  userLoginValidations(),
  errorMiddleware,
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: "Invalid login credentials" });
      }
      let correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword) {
        return res.status(401).json({ msg: "Invalid login credentials" });
      }
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

export default router;
