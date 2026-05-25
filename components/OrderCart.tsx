"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "@/components/MenuSection";
import { createWhatsAppLink } from "@/lib/whatsapp";

type DeliveryType = "Delivery" | "Pickup";
type PaymentMethod = "Cash on Delivery" | "Pay Now" | "Pay at Store";
type Step = "cart" | "checkout" | "success";
type PaymentResult = "cod" | "store" | "razorpay" | "demo";

type OrderCartProps = {
  lines: CartLine[];
  total: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

type Customer = {
  name: string;
  phone: string;
  deliveryType: DeliveryType;
  address: string;
  paymentMethod: PaymentMethod;
};

type RazorpayCheckout = {
  open: () => void;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: "INR";
  name: string;
  description: string;
  handler: () => void;
  prefill: {
    name: string;
    contact: string;
  };
  theme: {
    color: string;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayCheckout;
  }
}

const initialCustomer: Customer = {
  name: "",
  phone: "",
  deliveryType: "Delivery",
  address: "",
  paymentMethod: "Cash on Delivery"
};

const paymentCards: Record<
  PaymentMethod,
  {
    icon: string;
    title: string;
    description: string;
  }
> = {
  "Cash on Delivery": {
    icon: "₹",
    title: "Cash on Delivery",
    description: "Pay when your order arrives."
  },
  "Pay Now": {
    icon: "↗",
    title: "Pay Now",
    description: "Secure online payment."
  },
  "Pay at Store": {
    icon: "🏪",
    title: "Pay at Store",
    description: "Pay directly at Zynger Club during pickup."
  }
};

export default function OrderCart({ lines, total, onIncrement, onDecrement, onRemove, onClear }: OrderCartProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [step, setStep] = useState<Step>("cart");
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [orderId, setOrderId] = useState("");
  const [paymentResult, setPaymentResult] = useState<PaymentResult>("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const canCheckout =
    lines.length > 0 &&
    customer.name.trim().length > 1 &&
    customer.phone.trim().length >= 7 &&
    (customer.deliveryType === "Pickup" || customer.address.trim().length > 4);

  function openCheckout() {
    if (lines.length > 0) {
      setStep("checkout");
      setDrawerOpen(true);
    }
  }

  function createOrder(result: PaymentResult) {
    setPaymentResult(result);
    setOrderId(`ZYNG-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep("success");
    setIsProcessing(false);
  }

  async function placeOrder() {
    if (!canCheckout || isProcessing) return;

    if (customer.paymentMethod === "Cash on Delivery") {
      createOrder("cod");
      return;
    }

    if (customer.paymentMethod === "Pay at Store") {
      createOrder("store");
      return;
    }

    setIsProcessing(true);
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!key) {
      window.setTimeout(() => createOrder("demo"), 650);
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay) {
      window.setTimeout(() => createOrder("demo"), 650);
      return;
    }

    const checkout = new window.Razorpay({
      key,
      amount: total * 100,
      currency: "INR",
      name: "Zynger Club",
      description: `Demo order payment for ${customer.deliveryType}`,
      handler: () => createOrder("razorpay"),
      prefill: {
        name: customer.name,
        contact: customer.phone
      },
      theme: {
        color: "#F97316"
      }
    });

    checkout.open();
    setIsProcessing(false);
  }

  function resetToMenu() {
    setDrawerOpen(false);
    setStep("cart");
  }

  const drawerTitle = step === "cart" ? "Your Cart" : step === "checkout" ? "Order Online Checkout" : "Order Confirmed";

  return (
    <>
      <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-hidden rounded-[1.5rem] border border-orange-200 bg-white shadow-xl shadow-orange-900/12 xl:block">
        <CartPanel
          title="Your Cart"
          lines={lines}
          total={total}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
          onClear={onClear}
          onCheckout={openCheckout}
        />
      </aside>

      {count > 0 ? (
        <button
          type="button"
          aria-label="Open cart"
          onClick={() => {
            setStep("cart");
            setDrawerOpen(true);
          }}
          className="focus-ring fixed bottom-24 right-4 z-40 min-h-12 rounded-full bg-orange-600 px-5 py-3 text-base font-extrabold text-white shadow-xl shadow-orange-900/20 xl:hidden"
        >
          Cart ₹{total}
        </button>
      ) : null}

      {drawerOpen ? (
        <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label={drawerTitle}>
          <button
            type="button"
            aria-label="Close cart drawer"
            className="absolute inset-0 bg-black/45"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-orange-100 px-4 py-4">
              <h3 className="font-display text-3xl uppercase text-[#1F2937]">{drawerTitle}</h3>
              <button
                type="button"
                aria-label="Close cart drawer"
                onClick={() => setDrawerOpen(false)}
                className="focus-ring grid size-11 place-items-center rounded-full bg-orange-100 text-2xl font-black text-orange-800"
              >
                ×
              </button>
            </div>
            <div className="max-h-[calc(88vh-76px)] overflow-y-auto p-4">
              {step === "cart" ? (
                <CartPanel
                  title="Your Cart"
                  lines={lines}
                  total={total}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
                  onClear={onClear}
                  onCheckout={openCheckout}
                  compact
                />
              ) : null}
              {step === "checkout" ? (
                <CheckoutForm
                  customer={customer}
                  setCustomer={setCustomer}
                  lines={lines}
                  total={total}
                  canCheckout={canCheckout}
                  isProcessing={isProcessing}
                  onPay={placeOrder}
                  onBack={() => setStep("cart")}
                />
              ) : null}
              {step === "success" ? (
                <SuccessScreen
                  orderId={orderId}
                  customer={customer}
                  paymentResult={paymentResult}
                  lines={lines}
                  total={total}
                  onBackToMenu={resetToMenu}
                />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {step !== "cart" ? (
        <div className="fixed inset-0 z-[60] hidden place-items-center bg-black/45 p-5 xl:grid" role="dialog" aria-modal="true" aria-label={drawerTitle}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-orange-100 px-6 py-4">
              <h3 className="font-display text-4xl uppercase text-[#1F2937]">{drawerTitle}</h3>
              <button
                type="button"
                aria-label="Close checkout"
                onClick={() => setStep("cart")}
                className="focus-ring grid size-11 place-items-center rounded-full bg-orange-100 text-2xl font-black text-orange-800"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {step === "checkout" ? (
                <CheckoutForm
                  customer={customer}
                  setCustomer={setCustomer}
                  lines={lines}
                  total={total}
                  canCheckout={canCheckout}
                  isProcessing={isProcessing}
                  onPay={placeOrder}
                  onBack={() => setStep("cart")}
                />
              ) : (
                <SuccessScreen
                  orderId={orderId}
                  customer={customer}
                  paymentResult={paymentResult}
                  lines={lines}
                  total={total}
                  onBackToMenu={() => setStep("cart")}
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CartPanel({
  title,
  lines,
  total,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  onCheckout,
  compact
}: OrderCartProps & { title: string; onCheckout: () => void; compact?: boolean }) {
  return (
    <div className={compact ? "" : "flex max-h-[calc(100vh-7rem)] flex-col"}>
      {!compact ? (
        <div className="bg-[#1F2937] p-5 text-white">
          <p className="text-sm font-extrabold uppercase tracking-wide text-orange-200">Order Online</p>
          <h3 className="font-display text-4xl uppercase">{title}</h3>
        </div>
      ) : null}
      <div className="space-y-3 overflow-auto p-0 lg:p-4">
        {lines.length === 0 ? (
          <div className="rounded-2xl bg-orange-50 p-5 text-center">
            <p className="font-display text-3xl uppercase text-[#1F2937]">Start with a crispy pick</p>
            <p className="mt-2 text-base font-semibold text-gray-700">Add menu items, then checkout or send on WhatsApp.</p>
          </div>
        ) : (
          lines.map((line) => (
            <div key={line.item.id} className="rounded-2xl border border-orange-100 bg-orange-50/70 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-extrabold text-[#1F2937]">{line.item.name}</p>
                  <p className="text-sm font-bold text-orange-700">
                    ₹{line.item.price} × {line.quantity} = ₹{line.item.price * line.quantity}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(line.item.id)}
                  aria-label={`Remove ${line.item.name}`}
                  className="focus-ring grid size-10 place-items-center rounded-full bg-white text-xl font-black text-red-600"
                >
                  ×
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onDecrement(line.item.id)}
                  aria-label={`Decrease ${line.item.name}`}
                  className="focus-ring grid size-11 place-items-center rounded-full bg-white text-lg font-extrabold text-orange-700"
                >
                  -
                </button>
                <span className="min-w-10 text-center text-base font-extrabold">{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => onIncrement(line.item.id)}
                  aria-label={`Increase ${line.item.name}`}
                  className="focus-ring grid size-11 place-items-center rounded-full bg-white text-lg font-extrabold text-orange-700"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-orange-100 p-0 pt-4 lg:p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-base font-extrabold text-gray-700">Total</span>
          <span className="font-display text-4xl text-orange-600">₹{total}</span>
        </div>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={onCheckout}
            disabled={lines.length === 0}
            className="focus-ring min-h-12 rounded-full bg-orange-600 px-5 py-3 text-base font-extrabold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Checkout
          </button>
          <a
            href={createWhatsAppLink(lines, total)}
            target="_blank"
            rel="noreferrer"
            className="focus-ring block min-h-12 rounded-full bg-green-600 px-5 py-3 text-center text-base font-extrabold text-white transition hover:bg-green-700"
          >
            Send on WhatsApp
          </a>
          <button
            type="button"
            onClick={onClear}
            disabled={lines.length === 0}
            className="focus-ring min-h-12 rounded-full border-2 border-orange-600 bg-white px-4 py-3 text-base font-extrabold text-orange-700 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutForm({
  customer,
  setCustomer,
  lines,
  total,
  canCheckout,
  isProcessing,
  onPay,
  onBack
}: {
  customer: Customer;
  setCustomer: (customer: Customer) => void;
  lines: CartLine[];
  total: number;
  canCheckout: boolean;
  isProcessing: boolean;
  onPay: () => void;
  onBack: () => void;
}) {
  const allowedPayments: PaymentMethod[] =
    customer.deliveryType === "Delivery" ? ["Cash on Delivery", "Pay Now"] : ["Pay Now", "Pay at Store"];
  const actionText = customer.paymentMethod === "Pay Now" ? "Pay Now" : "Place Order";

  function changeDeliveryType(deliveryType: DeliveryType) {
    setCustomer({
      ...customer,
      deliveryType,
      address: deliveryType === "Pickup" ? "" : customer.address,
      paymentMethod: deliveryType === "Delivery" ? "Cash on Delivery" : "Pay Now"
    });
  }

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl bg-orange-50 p-4">
        <p className="text-sm font-extrabold uppercase tracking-wide text-red-600">Demo ordering system</p>
        <p className="mt-1 text-base font-semibold text-gray-700">
          Pay Now opens Razorpay when a public key exists. Otherwise it uses clearly labeled demo payment mode.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Customer name">
          <input
            value={customer.name}
            onChange={(event) => setCustomer({ ...customer, name: event.target.value })}
            className="field-input"
            placeholder="Enter name"
          />
        </Field>
        <Field label="Phone number">
          <input
            value={customer.phone}
            onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
            className="field-input"
            placeholder="Enter phone"
          />
        </Field>
      </div>

      <Field label="Order type">
        <div className="grid grid-cols-2 gap-2">
          {(["Delivery", "Pickup"] as DeliveryType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => changeDeliveryType(type)}
              className={`focus-ring min-h-12 rounded-2xl px-4 py-3 text-base font-extrabold transition ${
                customer.deliveryType === type ? "bg-orange-600 text-white shadow-lg shadow-orange-600/25" : "border-2 border-orange-200 bg-white text-orange-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </Field>

      {customer.deliveryType === "Delivery" ? (
        <Field label="Delivery address">
          <textarea
            value={customer.address}
            onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
            className="field-input min-h-24 resize-none"
            placeholder="House name, area, landmark"
          />
        </Field>
      ) : null}

      <Field label="Payment method">
        <div className="grid gap-3 md:grid-cols-2">
          {allowedPayments.map((method) => (
            <PaymentCard
              key={method}
              method={method}
              selected={customer.paymentMethod === method}
              onSelect={() => setCustomer({ ...customer, paymentMethod: method })}
            />
          ))}
        </div>
      </Field>

      {customer.deliveryType === "Pickup" && customer.paymentMethod === "Pay at Store" ? (
        <Notice>Please pay at Zynger Club counter during pickup.</Notice>
      ) : null}
      {customer.deliveryType === "Delivery" && customer.paymentMethod === "Cash on Delivery" ? (
        <Notice>Your order will be paid during delivery.</Notice>
      ) : null}
      {customer.paymentMethod === "Pay Now" ? (
        <Notice>Pay Now will use Razorpay if configured, otherwise demo payment mode will be shown after confirmation.</Notice>
      ) : null}

      <OrderSummary lines={lines} total={total} />

      <div className="grid gap-2 md:grid-cols-2">
        <button
          type="button"
          onClick={onBack}
          className="focus-ring min-h-12 rounded-full border-2 border-orange-600 bg-white px-5 py-3 text-base font-extrabold text-orange-700"
        >
          Back to Cart
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={!canCheckout || isProcessing}
          className="focus-ring min-h-12 rounded-full bg-orange-600 px-5 py-3 text-base font-extrabold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : actionText}
        </button>
      </div>
    </div>
  );
}

function PaymentCard({
  method,
  selected,
  onSelect
}: {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}) {
  const card = paymentCards[method];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`focus-ring min-h-28 rounded-2xl border-2 p-4 text-left transition ${
        selected
          ? "scale-[1.01] border-orange-600 bg-orange-50 shadow-[0_0_0_4px_rgba(249,115,22,0.16),0_18px_40px_rgba(234,88,12,0.16)]"
          : "border-orange-100 bg-white hover:border-orange-300"
      }`}
    >
      <span className={`grid size-11 place-items-center rounded-full text-lg font-black ${selected ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700"}`}>
        {card.icon}
      </span>
      <span className="mt-3 block text-lg font-extrabold text-[#1F2937]">{card.title}</span>
      <span className="mt-1 block text-sm font-semibold leading-6 text-gray-700">{card.description}</span>
    </button>
  );
}

function SuccessScreen({
  orderId,
  customer,
  paymentResult,
  lines,
  total,
  onBackToMenu
}: {
  orderId: string;
  customer: Customer;
  paymentResult: PaymentResult;
  lines: CartLine[];
  total: number;
  onBackToMenu: () => void;
}) {
  const isPayNow = customer.paymentMethod === "Pay Now";
  const estimate = customer.deliveryType === "Delivery" ? "Estimated delivery: 35-45 minutes" : "Estimated pickup: 20-25 minutes";

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl bg-green-50 p-5 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-green-600 text-4xl font-black text-white shadow-lg shadow-green-700/20">
          ✓
        </div>
        <p className="mt-4 text-sm font-extrabold uppercase tracking-wide text-green-700">Status: Order placed demo</p>
        <h4 className="mt-2 font-display text-4xl uppercase text-[#1F2937]">{orderId}</h4>
        <p className="mt-2 text-base font-extrabold text-orange-700">{estimate}</p>
        {paymentResult === "demo" ? (
          <p className="mt-3 rounded-xl bg-yellow-100 p-3 text-base font-extrabold text-yellow-900">
            DEMO PAYMENT SUCCESS. Razorpay keys were not found, so this payment was simulated.
          </p>
        ) : null}
        {paymentResult === "razorpay" ? (
          <p className="mt-3 rounded-xl bg-green-100 p-3 text-base font-extrabold text-green-900">Payment successful via Razorpay.</p>
        ) : null}
        {paymentResult === "store" ? (
          <p className="mt-3 rounded-xl bg-orange-100 p-3 text-base font-extrabold text-orange-900">
            Please pay at Zynger Club counter during pickup.
          </p>
        ) : null}
        {paymentResult === "cod" ? (
          <p className="mt-3 rounded-xl bg-orange-100 p-3 text-base font-extrabold text-orange-900">
            Your order will be paid during delivery.
          </p>
        ) : null}
        {isPayNow ? <p className="sr-only">Payment success animation completed.</p> : null}
      </div>

      <OrderSummary lines={lines} total={total} />

      <div className="rounded-2xl border border-orange-100 bg-white p-4">
        <p className="text-sm font-extrabold uppercase tracking-wide text-red-600">Customer details</p>
        <div className="mt-3 grid gap-2 text-base font-semibold text-gray-800">
          <p>Name: {customer.name}</p>
          <p>Phone: {customer.phone}</p>
          <p>Type: {customer.deliveryType}</p>
          {customer.deliveryType === "Delivery" ? <p>Address: {customer.address}</p> : null}
          <p>Payment: {customer.paymentMethod}</p>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="focus-ring min-h-12 rounded-full bg-[#1F2937] px-5 py-3 text-base font-extrabold text-white"
        >
          Download / Print Receipt
        </button>
        <a
          href={createWhatsAppLink(lines, total)}
          target="_blank"
          rel="noreferrer"
          className="focus-ring min-h-12 rounded-full bg-green-600 px-5 py-3 text-center text-base font-extrabold text-white"
        >
          Send on WhatsApp
        </a>
        <a
          href="#menu"
          onClick={onBackToMenu}
          className="focus-ring min-h-12 rounded-full border-2 border-orange-600 bg-white px-5 py-3 text-center text-base font-extrabold text-orange-700"
        >
          Back to Menu
        </a>
      </div>
    </div>
  );
}

function OrderSummary({ lines, total }: { lines: CartLine[]; total: number }) {
  const rows = useMemo(
    () =>
      lines.map((line) => ({
        id: line.item.id,
        name: line.item.name,
        quantity: line.quantity,
        subtotal: line.item.price * line.quantity
      })),
    [lines]
  );

  return (
    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
      <p className="text-sm font-extrabold uppercase tracking-wide text-red-600">Order summary</p>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="flex items-start justify-between gap-3 text-base font-semibold text-[#1F2937]">
            <span>
              {row.quantity} × {row.name}
            </span>
            <span className="font-extrabold">₹{row.subtotal}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-orange-200 pt-3">
        <span className="text-base font-extrabold">Total</span>
        <span className="font-display text-4xl text-orange-600">₹{total}</span>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-base font-extrabold text-[#1F2937]">
      {label}
      {children}
    </label>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl bg-orange-50 p-4 text-base font-extrabold text-orange-900">{children}</div>;
}

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>("script[src='https://checkout.razorpay.com/v1/checkout.js']");
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
