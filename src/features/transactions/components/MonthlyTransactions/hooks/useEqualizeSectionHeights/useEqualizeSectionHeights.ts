import { type RefObject, useEffect, useRef } from 'react';

export const useEqualizeSectionHeights = <T>(
  data: T[] | undefined,
): RefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    const equalizeSectionHeights = () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll('[data-card]'),
      ) as HTMLElement[];

      if (cards.length === 0) return;

      const rows: HTMLElement[][] = [];
      let currentRow: HTMLElement[] = [];
      let currentTop = -1;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (currentTop === -1 || Math.abs(rect.top - currentTop) < 10) {
          currentRow.push(card);
          if (currentTop === -1) currentTop = rect.top;
        } else {
          if (currentRow.length > 0) rows.push(currentRow);
          currentRow = [card];
          currentTop = rect.top;
        }
      });
      if (currentRow.length > 0) rows.push(currentRow);

      rows.forEach((rowCards) => {
        const incomeSections = rowCards.map((card) =>
          card.querySelector('[data-section="income"]'),
        ) as HTMLElement[];
        if (incomeSections.length > 0) {
          const maxHeight = Math.max(
            ...incomeSections.map((s) => s.scrollHeight),
          );
          incomeSections.forEach((s) => {
            s.style.minHeight = `${maxHeight}px`;
          });
        }

        const expensesSections = rowCards.map((card) =>
          card.querySelector('[data-section="expenses"]'),
        ) as HTMLElement[];
        if (expensesSections.length > 0) {
          const maxHeight = Math.max(
            ...expensesSections.map((s) => s.scrollHeight),
          );
          expensesSections.forEach((s) => {
            s.style.minHeight = `${maxHeight}px`;
          });
        }

        const wantsSections = rowCards.map((card) =>
          card.querySelector('[data-section="wants"]'),
        ) as HTMLElement[];
        if (wantsSections.length > 0) {
          const maxHeight = Math.max(
            ...wantsSections.map((s) => s.scrollHeight),
          );
          wantsSections.forEach((s) => {
            s.style.minHeight = `${maxHeight}px`;
          });
        }
      });
    };

    equalizeSectionHeights();
    const resizeObserver = new ResizeObserver(equalizeSectionHeights);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [data]);

  return containerRef;
};
