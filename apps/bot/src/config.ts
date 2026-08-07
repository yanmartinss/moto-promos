import "dotenv/config";

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!botToken) {
  throw new Error("TELEGRAM_BOT_TOKEN não configurado");
}

if (!chatId) {
  throw new Error("TELEGRAM_CHAT_ID não configurado");
}

export const config = {
  botToken,
  chatId,
};
