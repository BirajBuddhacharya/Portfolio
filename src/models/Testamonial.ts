import { I } from 'framer-motion/dist/types.d-B50aGbjN';
import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface definition
export interface ITestimonial extends Document {
    user_id: mongoose.Types.ObjectId;
    name: string;
    photo: string;
    message: string;
    featured: boolean;
    createdAt: Date;
}

const testimonialSchema: Schema<ITestimonial> = new mongoose.Schema<ITestimonial>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

export default Testimonial;