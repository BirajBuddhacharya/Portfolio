import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    tags?: string[]; 
    coverImage: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    description: string;
}

const blogSchema: Schema<IBlog> = new mongoose.Schema<IBlog>({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    coverImage: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;