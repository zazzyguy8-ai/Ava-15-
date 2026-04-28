"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-sm font-semibold px-4 py-2 rounded-full"
      style={{ background: "var(--rose-light)", color: "var(--rose-dark)" }}
    >
      🖨 Save / Print
    </button>
  );
}
