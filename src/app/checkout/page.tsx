"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [items, setItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingAddress, setShippingAddress] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState("");

  async function placeOrder() {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${base}/api/orders/guest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        paymentMethod,
        shippingAddress,
        paymentInfo: { reference, payerName: name, payerPhone: phone }
      })
    });
    if (res.ok) {
      alert("Order placed");
    } else {
      alert("Failed to place order");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="font-serif text-2xl">Checkout</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" />
        <input value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Shipping address" className="rounded-md border border-zinc-300 px-3 py-2 text-sm sm:col-span-2" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
          <option value="easypaisa">Easypaisa</option>
          <option value="jazzcash">JazzCash</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="cod">Cash on Delivery</option>
        </select>
        <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Payment reference (optional)" className="rounded-md border border-zinc-300 px-3 py-2 text-sm sm:col-span-2" />
      </div>
      <button onClick={placeOrder} className="rounded-md bg-zinc-900 px-4 py-2 text-white transition hover:scale-[1.02]">Place order</button>
      <p className="text-xs text-zinc-500">Guest checkout is supported. You can create an account later.</p>
    </div>
  );
}
