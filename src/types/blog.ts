export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  author?: string;
  excerpt?: string;
}