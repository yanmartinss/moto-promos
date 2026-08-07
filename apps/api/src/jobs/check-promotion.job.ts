import { prisma } from "../lib/prisma.js";
import { dispatchOffer } from "../services/offer-dispatcher.js";
import { getPromotionsFromMercadoLivre } from "../services/scraping/mercado-livre.service.js";

export async function checkPromotionsJob() {
  const promotions = await getPromotionsFromMercadoLivre();

  for (const promotion of promotions) {
    const product = await prisma.product.upsert({
      where: {
        store_externalId: { store: promotion.store, externalId: promotion.externalId },
      },
      create: promotion,
      update: {
        title: promotion.title,
        originalPrice: promotion.originalPrice,
        promotionalPrice: promotion.promotionalPrice,
        discountPercent: promotion.discountPercent,
        imageUrl: promotion.imageUrl,
        affiliateUrl: promotion.affiliateUrl,
        coupon: promotion.coupon ?? null,
      },
    });

    await dispatchOffer(product);
  }
}
