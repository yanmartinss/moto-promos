import type { Store } from "../../../generated/prisma/client.js";

export interface ScrapedOffer {
  externalId: string;
  store: Store;
  title: string;
  originalPrice: number;
  promotionalPrice: number;
  discountPercent: number;
  imageUrl: string | null;
  affiliateUrl: string;
  coupon?: string;
}

export async function getPromotionsFromMercadoLivre(): Promise<ScrapedOffer[]> {
  return [
    {
      externalId: "MLB123456789",
      store: "MERCADO_LIVRE",
      title: "Pneu Michelin Moto",
      originalPrice: 500,
      promotionalPrice: 300,
      discountPercent: 40,
      imageUrl: null,
      affiliateUrl: "https://teste.com",
    },
  ];
}
