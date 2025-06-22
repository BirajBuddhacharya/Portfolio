import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import * as utils from './utils';

export async function POST(req: Request) {
  let coverImagePublicId: string | null = null;
  let galleryPublicIds: string[] = [];
  
  try {
    await connectDB();
    const data = await req.formData();
    if (!data) {
      return NextResponse.json({ error: 'No form data provided' }, { status: 400 });
    }

    // Convert FormData to object and validate
    const projectData = utils.formDataToObject(data);
    const validatedData = await utils.validateProjectData(projectData);
    if (validatedData instanceof NextResponse) return validatedData;

    // Upload and validate cover image
    const coverImageResult = await utils.uploadCoverImage(data.get('coverImage'));
    if (coverImageResult instanceof NextResponse) return coverImageResult;
    const { url: coverImageUrl, publicId } = coverImageResult;
    coverImagePublicId = publicId;
    validatedData.coverImage = coverImageUrl;

    // Upload gallery images if provided
    if (data.getAll('gallery').length > 0) {
      const galleryImages = await utils.uploadGalleryImages(data.getAll('gallery'));
      if (galleryImages instanceof NextResponse) return galleryImages;
      validatedData.gallery = galleryImages.map(image => image.url);
      galleryPublicIds = galleryImages.map(image => image.publicId);
    }
    // Create project
    return await utils.createProject(validatedData);
  } catch (error) {
    return await utils.handleError(error, coverImagePublicId, galleryPublicIds);
  }
}