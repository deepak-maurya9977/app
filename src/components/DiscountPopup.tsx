import { useEffect, useState, useRef } from 'react';

export default function DiscountPopup() {
  const [html, setHtml] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    // fetch raw html from public folder
    fetch('/ecommittra_discount_popup_v2.html')
      .then((r) => r.text())
      .then((t) => {
        if (!mounted) return;
        setHtml(t);
        // small delay so page paints first
        setTimeout(() => setShow(true), 300);
      })
      .catch(() => {
        // fallback: don't show if fetch fails
      });

    return () => { mounted = false; };
  }, []);

  // Robust close handling: listen at document level (capture phase)
  // and support Escape key. This ensures clicks on the SVG/path
  // correctly trigger closing even if event propagation is unusual.
  useEffect(() => {
    if (!html) return;

    const clickHandler = (ev: MouseEvent) => {
      const target = ev.target as Element | null;
      if (!target) return;
      // If the clicked element is inside the close button, close.
      if (target.closest('[aria-label="Close popup"]')) {
        ev.stopPropagation();
        setShow(false);
      }
    };

    const keyHandler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setShow(false);
      }
    };

    document.addEventListener('click', clickHandler, true);
    document.addEventListener('keydown', keyHandler);

    return () => {
      document.removeEventListener('click', clickHandler, true);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [html]);

  if (!show || !html) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
