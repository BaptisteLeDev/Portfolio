import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CodyMood, CodyBrackets } from "./cody";

export interface CodyReactionState {
  mood: CodyMood | null;
  brackets: CodyBrackets | null;
}

interface CodyReactionCtx {
  reaction: CodyReactionState;
  set: (r: CodyReactionState | null) => void;
}

const EMPTY: CodyReactionState = { mood: null, brackets: null };

const Ctx = createContext<CodyReactionCtx>({ reaction: EMPTY, set: () => {} });

export const useCodyReaction = () => useContext(Ctx);

export function CodyReactionProvider({ children }: { children: ReactNode }) {
  const [reaction, setReaction] = useState<CodyReactionState>(EMPTY);
  const set = useCallback((r: CodyReactionState | null) => {
    setReaction(r ?? EMPTY);
  }, []);
  const value = useMemo(() => ({ reaction, set }), [reaction, set]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Bind handlers on interactive elements to broadcast a Cody reaction on hover/focus. */
export function useCodyBroadcast(r: CodyReactionState) {
  const { set } = useCodyReaction();
  return useMemo(
    () => ({
      onMouseEnter: () => set(r),
      onMouseLeave: () => set(null),
      onFocus: () => set(r),
      onBlur: () => set(null),
    }),
    [set, r.mood, r.brackets],
  );
}
