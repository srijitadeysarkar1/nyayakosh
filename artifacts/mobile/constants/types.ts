export interface Section {
  no: string;
  title: string;
  keywords: string[];
  summary: string;
}

export interface Law {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

export interface NewsItem {
  id: number;
  date: string;
  category: string;
  title: string;
  summary: string;
  tag: string;
  tagColor: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}
