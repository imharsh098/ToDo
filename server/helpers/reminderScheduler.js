import { scheduledJobs, scheduleJob } from "node-schedule";
import notification from "./notify.js";
function reminderScheduler(userData, taskData) {
  let { taskname, reminder, _id } = taskData;
  let { fullname, phone } = userData;
  reminder.forEach((stamp, index) => {
    scheduleJob(`${_id}`, stamp, function () {
      console.log("Hi ", fullname, phone, taskname);
      notification(fullname, phone, taskname);
    });
  });
  console.log("Active service workers so far: ", scheduledJobs);
}
function cancelJobs(jobId) {
  if (scheduledJobs[jobId]) {
    scheduledJobs[jobId].cancel();
  }
}
export { reminderScheduler, cancelJobs };
