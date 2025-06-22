import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAnalytics extends Document {
    type: 'page_view' | 'project_view' | 'testimonial_view' | 'contact_form_submission' | 'blog_view';
    user_id?: mongoose.Types.ObjectId;
    view_duration?: number;
    timestamp?: Date;
    ip_address?: string;
    ref_url: string;
}

const AnalyticsSchema: Schema<IAnalytics> = new mongoose.Schema<IAnalytics>({
    type: {
        type: String,
        enum: ['page_view', 'project_view', 'testimonial_view', 'contact_form_submission', 'blog_view'],
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    view_duration: {
        type: Number,
        required: false,
    }, 
    timestamp: {
        type: Date,
        default: Date.now
    }, 
    ip_address: { 
        type: String,
        required: false
    }, 
    ref_url: { 
        type: String,
        required: true
    }
})

const Analytics: Model<IAnalytics> = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
export default Analytics;