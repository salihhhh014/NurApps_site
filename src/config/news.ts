export interface NewsItem {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  content: {
    ru: string;
    en: string;
  };
  date: string;
  icon: string;
}

export const news: NewsItem[] = [];
