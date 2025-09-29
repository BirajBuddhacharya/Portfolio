export interface BlogPost {
    title: string;
    status: 'Draft' | 'Published' | 'Archived';
    description: string;
    createdAt: string;
    coverImage: string;
    tags: string[];
}