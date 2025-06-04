export type Record = {
  id: string;
  chatId: string;
  title: string;
  content: string;
  emotion: 'UNSPECIFIED' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'; // 필요 시 다른 감정 추가 가능
  detailEmotion: string;
  tags: string[];
  createdAt: string; // ISO8601 날짜 문자열
};
