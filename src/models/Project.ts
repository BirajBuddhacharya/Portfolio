import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    title: string, 
    slug: string, 
    shortDescription: string,
    description: string, 
    technologies?: string[],
    coverImage: string,
    gallery?: string[],
    github?: string, 
    liveDemo?: string,
    published: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const projectSchema: Schema<IProject> = new mongoose.Schema<IProject>({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        default: [],
    },
    coverImage: {
        type: String,
        required: true,
    },
    gallery: {
        type: [String],
        default: [],
    },
    github: {
        type: String,
        required: false,
    },
    liveDemo: {
        type: String,
        required: false,
    },
    published: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;