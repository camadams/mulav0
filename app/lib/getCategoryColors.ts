export const categoryColors: { [key: string]: { bg: string; text: string } } = {
  Food: { bg: "bg-green-200", text: "text-green-800" },
  Transportation: { bg: "bg-blue-200", text: "text-blue-800" },
  Entertainment: { bg: "bg-purple-200", text: "text-purple-800" },
  Housing: { bg: "bg-yellow-200", text: "text-yellow-800" },
  Health: { bg: "bg-red-200", text: "text-red-800" },
  Other: { bg: "bg-gray-200", text: "text-gray-800" },
};

export const getCategoryColor = (category: string) => {
  return categoryColors[category] || categoryColors.Other;
};
