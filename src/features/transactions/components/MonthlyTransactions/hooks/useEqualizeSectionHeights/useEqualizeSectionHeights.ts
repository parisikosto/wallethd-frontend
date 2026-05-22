import {
  type RefCallback,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';

const SECTION_TYPES = ['income', 'expenses', 'wants'] as const;

const getGridRowGroups = (container: HTMLElement): HTMLElement[][] => {
  const cards = Array.from(
    container.querySelectorAll('[data-card]'),
  ) as HTMLElement[];

  if (cards.length === 0) {
    return [];
  }

  const columnCount = Math.max(
    1,
    window.getComputedStyle(container).gridTemplateColumns.split(' ').length,
  );

  const rows: HTMLElement[][] = [];

  for (let i = 0; i < cards.length; i += columnCount) {
    rows.push(cards.slice(i, i + columnCount));
  }

  return rows;
};

const resetSectionHeights = (container: HTMLElement): void => {
  SECTION_TYPES.forEach((sectionType) => {
    container
      .querySelectorAll<HTMLElement>(`[data-section="${sectionType}"]`)
      .forEach((section) => {
        section.style.minHeight = '';
      });
  });
};

const equalizeSectionHeights = (container: HTMLElement): void => {
  resetSectionHeights(container);

  const rows = getGridRowGroups(container);

  rows.forEach((rowCards) => {
    SECTION_TYPES.forEach((sectionType) => {
      const sections = rowCards
        .map((card) =>
          card.querySelector<HTMLElement>(`[data-section="${sectionType}"]`),
        )
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length === 0) {
        return;
      }

      const maxHeight = Math.max(
        ...sections.map((section) => section.scrollHeight),
      );

      sections.forEach((section) => {
        section.style.minHeight = `${maxHeight}px`;
      });
    });
  });
};

export const useEqualizeSectionHeights = <T>(
  data: T[] | undefined,
): RefCallback<HTMLDivElement> => {
  const containerNodeRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const location = useLocation();

  const cancelScheduledEqualize = (): void => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const scheduleEqualize = useCallback((container: HTMLElement) => {
    cancelScheduledEqualize();

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        equalizeSectionHeights(container);
      });
    });
  }, []);

  const disconnectObserver = useCallback((): void => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const setContainerRef = useCallback<RefCallback<HTMLDivElement>>(
    (node) => {
      disconnectObserver();
      cancelScheduledEqualize();

      if (containerNodeRef.current && !node) {
        resetSectionHeights(containerNodeRef.current);
      }

      containerNodeRef.current = node;

      if (!node || !data) {
        return;
      }

      const runEqualize = (): void => {
        scheduleEqualize(node);
      };

      runEqualize();

      const observer = new ResizeObserver(runEqualize);
      observer.observe(node);
      observerRef.current = observer;
    },
    [data, disconnectObserver, scheduleEqualize],
  );

  useLayoutEffect(() => {
    if (containerNodeRef.current && data) {
      scheduleEqualize(containerNodeRef.current);
    }
  }, [data, location.key, scheduleEqualize]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent): void => {
      if (event.persisted && containerNodeRef.current) {
        scheduleEqualize(containerNodeRef.current);
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      disconnectObserver();
      cancelScheduledEqualize();

      if (containerNodeRef.current) {
        resetSectionHeights(containerNodeRef.current);
      }
    };
  }, [disconnectObserver, scheduleEqualize]);

  return setContainerRef;
};
