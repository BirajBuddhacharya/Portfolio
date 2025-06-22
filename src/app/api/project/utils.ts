import { ProjectSchema } from '@/src/validation/projectSchema';
import { upload, destroyImage } from '@/src/lib/cloudinary';
import { NextResponse } from 'next/server';
import Project from '@/src/models/Project';

// Utility function to convert FormData to a plain object
export function formDataToObject(formData: FormData) {
    const obj: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
        if (key === 'published') {
            obj[key] = true; // Convert checkbox presence to true
        } else if (formData.getAll(key).length > 1 || ['technologies', 'gallery'].includes(key)) {
            obj[key] = formData.getAll(key); // Handle array fields
        } else {
            obj[key] = value; // Handle single-value fields
        }
    }

    if (!formData.has('published')) {
        obj.published = false;
    }

    return obj;
}

// Validate FormData against Zod schema
export async function validateProjectData(projectData: any) {
    // validate the project data against the Zod schema
    const result = ProjectSchema.safeParse(projectData);
    if (!result.success) {
        return NextResponse.json({ error: 'Invalid data', issues: result.error.issues }, { status: 400 });
    }

    // validate slug uniqueness
    const existingProject = await Project.findOne({ slug: result.data.slug });
    if (existingProject) {
        return NextResponse.json({ error: 'Project with this slug already exists' }, { status: 400 });
    }

    return result.data;
}

// Upload cover image to Cloudinary
export async function uploadCoverImage(coverImage: FormDataEntryValue | null) {
    if (!coverImage || !(coverImage instanceof File)) {
        return NextResponse.json({ error: 'Cover image is required and must be a file' }, { status: 400 });
    }

    const uploadResult = await upload(coverImage);
    return { url: uploadResult.secure_url, publicId: uploadResult.public_id };
}

// Upload gallery images to Cloudinary
export async function uploadGalleryImages(galleryImages: FormDataEntryValue[]) {
    if (!galleryImages || !Array.isArray(galleryImages)) {
        return NextResponse.json({ error: 'Gallery images are required and must be an array' }, { status: 400 });
    }

    const uploadResults = await Promise.all(galleryImages.map(async (image) => {
        if (!(image instanceof File)) {
            throw new Error('Gallery images must be files');
        }
        const uploadResult = await upload(image);
        return { url: uploadResult.secure_url, publicId: uploadResult.public_id };
    }));

    return uploadResults;
}

// Create project in the database
export async function createProject(validatedData: any) {
    const newProject = await Project.create(validatedData);
    return NextResponse.json(newProject, { status: 201 });
}

// Handle errors and Cloudinary cleanup
export async function handleError(error: any, coverImagePublicId: string | null, galleryPublicIds: string[] | null) {
    console.error('Error creating project:', error);

    if (coverImagePublicId) {
        try {
            await destroyImage(coverImagePublicId);
            console.log(`Deleted image with public ID: ${coverImagePublicId} from Cloudinary`);
        } catch (deleteError) {
            console.error('Error deleting image from Cloudinary:', deleteError);
        }
    }

    if (galleryPublicIds) {
        try {
            await Promise.all(galleryPublicIds.map(publicId => destroyImage(publicId)));
            console.log(`Deleted gallery images from Cloudinary`);
        } catch (deleteError) {
            console.error('Error deleting gallery images from Cloudinary:', deleteError);
        }
    }

    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
}