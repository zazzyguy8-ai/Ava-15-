// Simple in-memory session store — works on Render's persistent server
// Answers are ALSO backed up in Stripe metadata so restarts don't lose data

type Session = { answers: string; paid: boolean; expires: number };
const store = new Map<string, Session>();

function cleanup() {
  const now = Date.now();
  for (const [k, v] of store.entries()) {
    if (v.expires < now) store.delete(k);
  }
}

export function saveSession(id: string, answers: Record<string, string>) {
  cleanup();
  store.set(id, {
    answers: JSON.stringify(answers),
    paid: false,
    expires: Date.now() + 86_400_000, // 24h
  });
}

export function getSession(id: string): Session | null {
  const s = store.get(id);
  if (!s) return null;
  if (s.expires < Date.now()) { store.delete(id); return null; }
  return s;
}

export function markPaid(id: string) {
  const s = store.get(id);
  if (s) store.set(id, { ...s, paid: true });
}
