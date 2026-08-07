import { bot } from "./bot.js";
import { config } from "./config.js";

async function main(): Promise<void> {
  const me = await bot.telegram.getMe();
  console.log(`Bot conectado: @${me.username}`);

  const message = "Bot conectado e configurado. Pronto para enviar promoções!";
  const sent = await bot.telegram.sendMessage(config.chatId, message);
  console.log(`Mensagem de teste enviada (message_id: ${sent.message_id})`);
}

main()
  .catch((err: unknown) => {
    console.error("Falha ao enviar mensagem de teste:", err);
    process.exit(1);
  });
