"use client";

export default function WhatsAppButton() {
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94760181199";
  const href = `https://wa.me/${num}?text=${encodeURIComponent(
    "Hi FACEZ.lk! I'd like to order:"
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-24 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105 lg:bottom-6"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 003.6 17.7L2 22l4.4-1.5A11 11 0 1020.5 3.5zM12 20.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-2.6.9.9-2.6-.2-.3A8.2 8.2 0 1112 20.2zm4.7-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4 0-.4.2-.6l.4-.5c.1-.1.1-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3 2 3.2 5 4.5c2.5 1.1 3 .9 3.6.8.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3z"/>
      </svg>
    </a>
  );
}
