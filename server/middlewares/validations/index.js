import { body, validationResult } from "express-validator";

function userRegistrationValidations() {
  return [
    body("name", "Enter your full name").isString().notEmpty(),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password should be atleast 6 characters long")
      .notEmpty()
      .isLength({ min: 6 }),
    body("phone", "Enter a valid phone number")
      .isMobilePhone()
      .isLength({ min: 13, max: 13 }),
  ];
}
function userLoginValidations() {
  return [
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter a password").notEmpty().isString(),
  ];
}
function taskValidations() {
  return [
    body("taskname", "Enter a task")
      .isString()
      .notEmpty()
      .isLength({ min: 10 }),
    body("deadline", "Give a deadline").custom((deadline, { req }) => {
      // Server side current date is taken  by default in UTC offset 0
      if (!deadline) {
        throw new Error("Deadline is required");
      }

      let serverPresentDate = new Date();
      let serverduedate = new Date(deadline);

      if (serverduedate < serverPresentDate) {
        throw new Error("Due deadline date cannot be backdated");
      }

      let dueDay =
        Math.round(Date.parse(serverduedate) - Date.parse(serverPresentDate)) /
        (1000 * 60 * 60 * 24);
      let dueMinute =
        Math.round(Date.parse(serverduedate) - Date.parse(serverPresentDate)) /
        (1000 * 60);
      if (dueDay > 30 || dueMinute < 1) {
        throw new Error(
          "Due deadline cant be more than 30 days ahead or less than 1 minutes from now"
        );
      }
      return true;
    }),
  ];
}
function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
}

export {
  userRegistrationValidations,
  errorMiddleware,
  userLoginValidations,
  taskValidations,
};
