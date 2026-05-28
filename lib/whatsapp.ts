import type { CartLine } from "@/data/menu";
import { siteInfo } from "@/data/site";

export function createWhatsAppLink(lines?: CartLine[], total?: number) {
  const hasLines = lines && lines.length > 0;

  if (!hasLines) {
    const message = `Hi ${siteInfo.name}\n\nPlease share today's menu and available offers.`;
    return `https://wa.me/${siteInfo.whatsappPhone}?text=${encodeURIComponent(message)}`;
  }

  const orderText = lines
    .map((line) => `- ${line.quantity} x ${line.item.name} = Rs ${line.item.price * line.quantity}`)
    .join("\n");
  const message = `Hi ${siteInfo.name}\n\nI would like to order:\n\n${orderText}\n\nTotal: Rs ${total ?? 0}`;

  return `https://wa.me/${siteInfo.whatsappPhone}?text=${encodeURIComponent(message)}`;
}
