import { createUserAvatarUploadUrl, updateUserAvatar } from "@/services/user";
import { useUserStore } from "@/stores/user";
import { uploadBlob } from "@/utils";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const useAvatarActions = () => {
  const { user } = storeToRefs(useUserStore());

  const avatarFile = ref<File | Blob | null>(null);
  const avatarPreview = ref<string | null>(user.value?.avatarUrl || null);

  const handleAvatarChange = (file: File) => {
    avatarFile.value = file;
    avatarPreview.value = URL.createObjectURL(file);
  };

  const saveAvatar = async () => {
    const { uploadUrl, fileUrl } = await createUserAvatarUploadUrl(
      user.value!.id
    );

    const response = await uploadBlob(uploadUrl, avatarFile.value!);

    if (!response?.ok) {
      throw new Error("Не вдалося завантажити файл на Azure Blob Storage");
    }

    const newAvatarUrl = await updateUserAvatar(user.value!.id, fileUrl);

    return newAvatarUrl;
  };

  return {
    avatarFile,
    avatarPreview,
    handleAvatarChange,
    saveAvatar,
  };
};
