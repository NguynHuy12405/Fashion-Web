const GROUP_RULES = {
  "Nam": /(men|shirts?|pants?|suits?|ties?)/i,
  "Nữ": /(women|dresses?|skirts?|blouses?)/i,
  "Trẻ Em": /(kids|children|baby)/i,
  "Mỹ Phẩm": /(beauty|cosmetic|makeup|skincare|fragrance|perfume)/i,
  "Đời Sống": /(home|furniture|kitchen|decor|garden)/i,
  "Thể Thao": /(sport|fitness|outdoor|game|toy)/i,
  "Phụ Kiện": /(accessory|bag|wallet|belt|jewelry|watch)/i,
};

export const groupCategories = (categories = []) => {
  const grouped = {};

  categories.forEach((cat) => {
    const text = `${cat.slug} ${cat.name}`.toLowerCase();
    const group =
      Object.keys(GROUP_RULES).find((key) =>
        GROUP_RULES[key].test(text)
      ) || "Khác";

    grouped[group] ||= [];
    grouped[group].push(cat);
  });

  return grouped;
};
