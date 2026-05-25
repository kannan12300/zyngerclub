import type { CartLine } from "@/components/MenuSection";

const WHATSAPP_PHONE = "919207774880";

export function createWhatsAppLink(lines?: CartLine[], total?: number) {
  const hasLines = lines && lines.length > 0;

  if (!hasLines) {
    const message = "Hi Zynger Club\n\nPlease share today's menu and available offers.";
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }

  const orderText = lines
    .map((line) => `- ${line.quantity} × ${line.item.name} = ₹${line.item.price * line.quantity}`)
    .join("\n");
  const message = `Hi Zynger Club\n\nI would like to order:\n\n${orderText}\n\nTotal: ₹${total ?? 0}`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
