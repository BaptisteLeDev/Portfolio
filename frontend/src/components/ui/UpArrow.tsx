import { Button } from "./button";

export function UpArrow() {
  return (
    <Button
      variant="glass-cream"
      size="icon"
      aria-label="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 opacity-0"
      style={{
        animation: "rise-in linear both",
        animationTimeline: "scroll(root)",
        animationRange: "20vh 40vh",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  );
}
