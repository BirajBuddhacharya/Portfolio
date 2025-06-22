import { NextRequest, NextResponse } from 'next/server';
import { upload } from '@/src/lib/cloudinary';

export async function POST(req: NextRequest) {
    try {
        // Parse the multipart form data using NextRequest's formData() method
        const formData = await req.formData();
        const file = formData.get('image'); // Assumes the form input name is 'image'

        // Validate the file
        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: 'No file uploaded or invalid file' },
                { status: 400 }
            );
        }

        // upload to Cloudinary
        const imgUrl = (await upload(file)).secure_url;
            
        // Return the uploaded image URL
        return NextResponse.json({ url: imgUrl }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}