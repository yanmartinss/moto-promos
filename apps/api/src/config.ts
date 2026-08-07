import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),
  EVOLUTION_API_URL: z.string().optional(),
  EVOLUTION_API_KEY: z.string().optional(),
  EVOLUTION_INSTANCE: z.string().optional(),
  EVOLUTION_WHATSAPP_ID: z.string().optional(),
  OFFER_DEDUP_DAYS: z.coerce.number().int().positive().default(7),
  MIN_DISCOUNT_PERCENT: z.coerce.number().nonnegative().default(20),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Configuração de ambiente inválida:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsed.data;

const evolution = resolveEvolutionConfig();

export const config = {
  telegram: {
    botToken: env.TELEGRAM_BOT_TOKEN,
    chatId: env.TELEGRAM_CHAT_ID,
  },
  evolution,
  offer: {
    dedupDays: env.OFFER_DEDUP_DAYS,
    minDiscountPercent: env.MIN_DISCOUNT_PERCENT,
  },
};

function resolveEvolutionConfig() {
  const url = env.EVOLUTION_API_URL;
  const apiKey = env.EVOLUTION_API_KEY;
  const instance = env.EVOLUTION_INSTANCE;
  const whatsappId = env.EVOLUTION_WHATSAPP_ID;

  if (!url || !apiKey || !instance || !whatsappId) {
    console.warn("⚠️  Evolution API não configurada — envio WhatsApp desabilitado");
    return null;
  }

  return { url, apiKey, instance, whatsappId };
}
