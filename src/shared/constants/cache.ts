/**
 * Cache revalidation times in seconds
 */
export const CACHE_REVALIDATE_TIMES = {
  ONE_HOUR: 3600,
  SIX_HOURS: 21600,
  TWELVE_HOURS: 43200,
  TWENTY_FOUR_HOURS: 86400, // 24h
  ONE_WEEK: 604800,
} as const;
