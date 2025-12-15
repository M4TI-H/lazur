export function useReviewImageUpload() {
  const supabase = useSupabaseClient();
  const uploadLoading = ref<boolean>(false);
  const uploadError = ref<Error | null>(null);
  const imageUrl = ref<string | null>(null);

  const uploadImage = async (file: File) => {
    const filePath = `${file.name}_${Date.now()}`;

    const { error } = await supabase.storage
      .from("item-review-images")
      .upload(filePath, file);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = await supabase.storage
      .from("item-review-images")
      .getPublicUrl(filePath);

    if (data) {
      imageUrl.value = data.publicUrl;
    }

    return data.publicUrl ?? null;
  };

  return { uploadImage, imageUrl, uploadLoading, uploadError };
}
