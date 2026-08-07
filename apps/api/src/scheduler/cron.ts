import cron from "node-cron";
import { checkPromotionsJob } from "../jobs/check-promotion.job.js";

export function startScheduler() {
  cron.schedule("*/10 * * * *", async () => {
    console.log("🔎 Checking promotions...");

    await checkPromotionsJob();
  });
}
