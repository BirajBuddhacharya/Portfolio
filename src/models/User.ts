import mongoose, {Schema, Document, Model} from 'mongoose';

export interface IUser extends Document {
    name: string;
    avatar: string;
    username: string;
    access: 'testamonial' | 'admin' | 'user';
    email: string;
    OauthId: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    avatar: { 
        type: String,
        required: true,
    }, 
    username: { 
        type: String,
        required: true,
    },
    access: {
        type: String,
        enum: ['testamonial', 'admin', 'user'],
        default: 'user',
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    }, 
    OauthId: { 
        type: String, 
        required: true,
        unique: true,
    }

})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;