import { Admin } from "./Admin";
import { Comment } from "./Comment";

export interface NewsItem {
  id: number;
  berita_title: string;
  excerpt: string;
  content: string;
  berita_image: string;
  author: Admin;
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

export interface NewsDetail {
  id: number;
  berita_title: string;
  excerpt: string;
  berita_content: string;
  berita_image: string;
  author: Admin;
  comments: Comment[];
  date: string;
  views: number;
  category: string;
  isFeatured?: boolean;
  created_at: string;
}
