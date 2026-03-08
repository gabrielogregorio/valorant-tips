import Link from 'next/link';

type BreadcrumbEntry = {
  label: string;
  href?: string;
};

type BreadcrumbProperties = {
  entries: BreadcrumbEntry[];
};

function BreadcrumbSeparator() {
  return (
    <span aria-hidden="true" className="mx-2 select-none text-white/60">
      {'>'}
    </span>
  );
}

export default function Breadcrumb({ entries }: BreadcrumbProperties) {
  if (!entries.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-content-bg">
      <ol className="mx-auto flex w-full max-w-maxWidthDefault items-center overflow-x-auto px-4 py-3 text-sm text-white max-w-content-desktop">
        {entries.map((entry, index) => {
          const isCurrentPage = index === entries.length - 1;
          const canNavigate = Boolean(entry.href) && !isCurrentPage;

          return (
            <li key={`${entry.label}-${index}`} className="flex min-w-0 items-center whitespace-nowrap">
              {canNavigate ? (
                <Link
                  href={entry.href as string}
                  className="
                    rounded-md px-2 py-1 text-white/90 underline-offset-4
                    transition-colors duration-150
                    hover:bg-secondary hover:text-white hover:underline
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                  ">
                  {entry.label}
                </Link>
              ) : (
                <span aria-current="page" className="truncate px-2 py-1 font-semibold text-white">
                  {entry.label}
                </span>
              )}

              {!isCurrentPage && <BreadcrumbSeparator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
