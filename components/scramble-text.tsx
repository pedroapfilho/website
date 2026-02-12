"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

type ScrambleTextProps = {
  children: ReactNode;
  /** When to trigger the scramble animation */
  trigger?: "mount" | "hover";
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Interval between scramble steps in ms (lower = faster) */
  interval?: number;
  /** Scramble cycles per character before revealing */
  cycles?: number;
  /** Characters to use for scrambling */
  chars?: string;
  /** Stagger delay between characters starting to resolve (ms) */
  stagger?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
  className?: string;
};

type CharData = {
  char: string;
  index: number;
};

const extractChars = (children: ReactNode): CharData[] => {
  const chars: CharData[] = [];
  let index = 0;

  const traverse = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (typeof child === "string") {
        for (const char of child) {
          chars.push({ char, index });
          index += 1;
        }
      } else if (typeof child === "number") {
        for (const char of String(child)) {
          chars.push({ char, index });
          index += 1;
        }
      } else if (
        isValidElement<{
          children?: ReactNode;
        }>(child)
      ) {
        traverse(child.props.children);
      }
    });
  };

  traverse(children);
  return chars;
};

const buildCharElements = (
  children: ReactNode,
  charRefs: RefObject<(HTMLSpanElement | null)[]>,
  startIndex: { current: number },
): ReactNode => {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      const str = String(child);
      return str.split("").map((char) => {
        const idx = startIndex.current;
        startIndex.current += 1;
        return (
          <span
            key={idx}
            ref={(el) => {
              charRefs.current[idx] = el;
            }}
            className={cn(
              char === " " ? "inline-block w-1" : "inline-block w-[1ch]",
            )}
          >
            {char}
          </span>
        );
      });
    }

    if (
      isValidElement<{
        children?: ReactNode;
      }>(child)
    ) {
      return cloneElement(
        child,
        { ...child.props, key: child.key ?? startIndex.current },
        buildCharElements(child.props.children, charRefs, startIndex),
      );
    }

    return child;
  });
};

const ScrambleText = ({
  children,
  trigger = "mount",
  delay = 0,
  interval = 60,
  cycles = 2,
  chars = DEFAULT_CHARS,
  stagger = 0,
  onComplete,
  className,
}: ScrambleTextProps) => {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animationRef = useRef<{
    timeoutId: number | null;
    rafId: number | null;
  }>({ timeoutId: null, rafId: null });

  const charData = useMemo(() => extractChars(children), [children]);

  const renderedChildren = useMemo(() => {
    charRefs.current = [];
    return buildCharElements(children, charRefs, { current: 0 });
  }, [children]);

  const cleanup = useCallback(() => {
    if (animationRef.current.timeoutId) {
      clearTimeout(animationRef.current.timeoutId);
      animationRef.current.timeoutId = null;
    }
    if (animationRef.current.rafId) {
      cancelAnimationFrame(animationRef.current.rafId);
      animationRef.current.rafId = null;
    }
  }, []);

  const runAnimation = useCallback(() => {
    const refs = charRefs.current;
    if (refs.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    cleanup();

    const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

    // Set initial scrambled state
    charData.forEach(({ char }, i) => {
      if (refs[i]) {
        refs[i].textContent = char === " " ? " " : getRandomChar();
      }
    });

    const startAnimation = () => {
      let tick = 0;
      let lastTime = performance.now();
      const totalTicks = charData.length * cycles;
      const finalTick =
        stagger > 0
          ? totalTicks + ((charData.length - 1) * stagger) / interval
          : totalTicks;

      const animate = (currentTime: number) => {
        const delta = currentTime - lastTime;

        if (delta >= interval) {
          lastTime = currentTime - (delta % interval);

          charData.forEach(({ char }, i) => {
            if (!refs[i]) return;

            if (char === " ") {
              refs[i].textContent = " ";
              return;
            }

            const charStartTick = stagger > 0 ? (i * stagger) / interval : 0;
            const adjustedTick = tick - charStartTick;

            if (adjustedTick / cycles > i) {
              refs[i].textContent = char;
            } else {
              refs[i].textContent = getRandomChar();
            }
          });

          tick += 1;

          if (tick >= finalTick) {
            cleanup();
            charData.forEach(({ char }, i) => {
              if (refs[i]) refs[i].textContent = char;
            });
            onComplete?.();
            return;
          }
        }

        animationRef.current.rafId = requestAnimationFrame(animate);
      };

      animationRef.current.rafId = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      animationRef.current.timeoutId = window.setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }
  }, [charData, delay, interval, cycles, chars, stagger, cleanup, onComplete]);

  const stopAnimation = useCallback(() => {
    cleanup();
    const refs = charRefs.current;
    charData.forEach(({ char }, i) => {
      if (refs[i]) refs[i].textContent = char;
    });
  }, [charData, cleanup]);

  // Run on mount if trigger is "mount"
  useEffect(() => {
    if (trigger === "mount") {
      runAnimation();
      return cleanup;
    }
  }, [trigger, runAnimation, cleanup]);

  const handleMouseEnter = trigger === "hover" ? runAnimation : undefined;
  const handleMouseLeave = trigger === "hover" ? stopAnimation : undefined;

  return (
    <motion.span
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderedChildren}
    </motion.span>
  );
};

export { ScrambleText };
export type { ScrambleTextProps };
