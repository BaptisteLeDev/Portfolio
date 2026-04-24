import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { staggerChild, staggerParent } from "@/lib/motion-variants";

interface Props {
  open: boolean;
  onClose: () => void;
  links: { to: string; label: string }[];
}

export function MobileMenu({ open, onClose, links }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-bg flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex h-16 items-center justify-end px-4">
            <button className="font-mono text-sm" aria-label="Fermer" onClick={onClose}>
              [close]
            </button>
          </div>
          <motion.ul
            className="flex flex-1 flex-col items-center justify-center gap-8"
            variants={staggerParent}
            initial="initial"
            animate="animate"
          >
            {links.map((l) => (
              <motion.li key={l.to} variants={staggerChild}>
                <Link to={l.to} onClick={onClose} className="font-display text-5xl font-black">
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
