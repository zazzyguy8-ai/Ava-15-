"use client";

export function PrintButton() {
  return (
    <button onClick={() => window.print()}
      className="btn-secondary text-xs px-4 py-2">
      Save as PDF
    </button>
  );
}
