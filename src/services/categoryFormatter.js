export const formatCategories = (items = []) =>
  items.map((c, i) => ({
    id: c.id ?? i + 1,
    slug: c.slug ?? c,
    name:
      c.name ??
      c.replace(/-/g, " ").replace(/\b\w/g, (s) => s.toUpperCase()),
  }));
