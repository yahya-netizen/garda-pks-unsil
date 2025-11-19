import { Comment } from "./Comment";

export interface NewsItem {
  id: number;
  berita_title: string;
  excerpt: string;
  content: string;
  berita_image: string;
  author: {
    name: string
  };
  comments: Comment[]
  date: string;
  views: number;
  category: string;
  isFeatured?: boolean;
  created_at: string;
}

export interface NewsPageProps {
  newsItems: NewsItem[];
  hasNextPage: boolean;
}