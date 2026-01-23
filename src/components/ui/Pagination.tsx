"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showPages = 5; // Max pages to show
    
    if (totalPages <= showPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav 
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Paginacion"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() => canGoPrev && onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="flex h-10 w-10 items-center justify-center rounded-2 border border-border bg-surface text-muted transition-all duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
        aria-label="Pagina anterior"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span 
                key={`ellipsis-${index}`}
                className="px-2 text-500 text-muted"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={[
                "flex h-10 min-w-10 items-center justify-center rounded-2 border px-3 text-500 font-600 transition-all duration-200",
                isActive
                  ? "border-accent bg-accent text-white shadow-[0_0_12px_rgba(197,139,90,0.25)]"
                  : "border-border bg-surface text-muted hover:border-accent hover:text-accent"
              ].join(" ")}
              aria-label={`Ir a pagina ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="flex h-10 w-10 items-center justify-center rounded-2 border border-border bg-surface text-muted transition-all duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
        aria-label="Pagina siguiente"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
}
