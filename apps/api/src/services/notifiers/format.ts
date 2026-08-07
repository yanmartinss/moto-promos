import type { Offer } from "./types.js";

function formatPrice(value: unknown): string {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatPriceCompact(value: unknown): string {
  const amount = Number(value);
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function formatDiscount(discount: number): string {
  return `${Number.isInteger(discount) ? discount : discount.toFixed(1)}%`;
}

function storeLabel(store: string): string {
  return store
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatTelegramCaption(offer: Offer): string {
  const lines = [
    `🛒 ${offer.title}`,
    `💰 ${formatPriceCompact(offer.promotionalPrice)}`,
  ];

  if (offer.coupon) {
    lines.push(`🔥 Cupom: ${offer.coupon}`);
  }

  lines.push(`🔗 ${offer.affiliateUrl}`);
  lines.push("📢 anúncio");

  return lines.join("\n");
}

export function formatWhatsAppCaption(offer: Offer): string {
  const discount = Number(offer.discountPercent);

  const lines = [
    `*${offer.title}*`,
    "",
    `🔥 ~~${formatPrice(offer.originalPrice)}~~ → *${formatPrice(offer.promotionalPrice)}*`,
    `💰 Desconto: *${formatDiscount(discount)}*`,
    `🛒 Loja: *${storeLabel(offer.store)}*`,
  ];

  if (offer.coupon) {
    lines.push(`🔥 Cupom: *${offer.coupon}*`);
  }

  lines.push("", `🛒 Compre agora: ${offer.affiliateUrl}`);

  return lines.join("\n");
}
