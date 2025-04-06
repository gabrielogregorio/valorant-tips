'use client';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  console.error('global-error', error);
  return (
    // global-error must include html and body tags
    <html lang="pt-br">
      {/* update do language */}
      <body>
        <h2>Something went wrong!</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
