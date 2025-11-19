import { createClient } from "../supabase/client";


const uploadSingleImage = async (file: File | null) => {
  const supabase = createClient();

  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const {error} = await supabase.storage
    .from("media")
    .upload(filePath, file)

  if (error){
    throw new Error(error.message);
  }

  const publicUrl = supabase.storage
    .from("media")
    .getPublicUrl(filePath).data.publicUrl;

  return publicUrl;
}

export const handleMultipleImagesUpload = async (
  imageFile1: File | null, 
  imageFile2: File | null, 
  imageFile3: File | null
) => {
  const uploadedUrls: string[] = [];
  const errors: string[] = [];
  
  const uploadWithErrorHandling = async (file: File | null, index: number) => {
    if (!file) return;
    
    try {
      const url = await uploadSingleImage(file);
      if (url) uploadedUrls.push(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Image ${index + 1} upload failed: ${message}`);
    }
  };

  await uploadWithErrorHandling(imageFile1, 0);
  await uploadWithErrorHandling(imageFile2, 1);
  await uploadWithErrorHandling(imageFile3, 2);

  if (errors.length > 0 && uploadedUrls.length === 0) {
    throw new Error(errors.join(', '));
  }

  return uploadedUrls;
}