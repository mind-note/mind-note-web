export const emotionColors: { [key: string]: string } = {
  angry: "#FF0000",
  sad: "#D7128E",
  joy: "#FFB800",
  bored: "#2F32FA",
  anxiety: "#15C7B2",
  etc: "#999999",
};

export const emotionNames: { [key: string]: string } = {
  angry: "화남",
  sad: "슬픔",
  joy: "기쁨",
  bored: "지루함",
  anxiety: "불안",
  etc: "기타",
};

export const emotionIcons: { [key: string]: string } = {
  angry: "😡",
  sad: "😢",
  joy: "😄",
  bored: "🥱",
  anxiety: "😰",
  etc: "❓", // 혹은 `/placeholder.png`
};

// TailwindCSS 색상으로도 만들고 싶다면:
export const emotionBgColors: { [key: string]: string } = {
  angry: "bg-[#FF0000]",
  sad: "bg-[#D7128E]",
  joy: "bg-[#FFB800]",
  bored: "bg-[#2F32FA]",
  anxiety: "bg-[#15C7B2]",
  etc: "bg-[#999999]",
};
