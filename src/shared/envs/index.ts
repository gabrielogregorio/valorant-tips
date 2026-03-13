const processInvalidCharsInEnvs = (env = ''): string =>
  env
    ?.toString()
    .replace(/[\n\r]/g, '')
    .trim() || '';

export const NEXT_PUBLIC_API_HOST = processInvalidCharsInEnvs(process.env.NEXT_PUBLIC_API_HOST);
export const NEXT_PUBLIC_MODE_RUN = processInvalidCharsInEnvs(process.env.NEXT_PUBLIC_MODE_RUN);
export const SENTRY_TOKEN = processInvalidCharsInEnvs(process.env.SENTRY_TOKEN);
export const NEXT_PUBLIC_SENTRY_IS_ENABLED = process.env.NEXT_PUBLIC_SENTRY_IS_ENABLED === 'true';
export const NEXT_PUBLIC_SENTRY_DSN = processInvalidCharsInEnvs(process.env.NEXT_PUBLIC_SENTRY_DSN);
