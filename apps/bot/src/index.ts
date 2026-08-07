import { bot } from "./bot.js";

async function main(): Promise<void> {
  const me = await bot.telegram.getMe();
  console.log(`Bot conectado: @${me.username}`);

  bot.launch();
  console.log("Bot rodando (polling)");
}

main().catch((err: unknown) => {
  console.error("Falha ao iniciar o bot:", err);
  process.exit(1);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
