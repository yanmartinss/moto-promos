import { prisma } from "./lib/prisma.js";
import { startScheduler } from "./scheduler/cron.js";

async function bootstrap() {
  try {
    await prisma.$connect();

    console.log("✅ Connected to database");

    startScheduler();

    console.log("⏰ Scheduler started");
  } catch (error) {
    console.error("❌ Error starting application", error);

    await prisma.$disconnect();
    process.exit(1);
  }
}

bootstrap();
