export function getThemeVariables(prefix: string) {
  const styles = getComputedStyle(document.documentElement);

  return Object.fromEntries(
    Array.from(styles)
      .filter((prop) => prop.startsWith(`--${prefix}-`))
      .map((prop) => {
        return [prop.replace(`--${prefix}-`, ''), styles.getPropertyValue(prop).trim()];
      }),
  );
}
