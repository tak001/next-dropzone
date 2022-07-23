import { ImagePostResponse } from 'entity/dropzone/imagePost';
import baseHttpClient from 'infrastructure/httpClient';

export const useImageNew = () => {
  const imageNewHandler = async (formData: FormData) => {
    // TODO: 簡易的なレイヤーのためちゃんとした設計にする
    const response = await baseHttpClient.post<ImagePostResponse>(
      `/api/image`,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );

    return response?.data;
  };

  return {
    imageNewHandler,
  };
};
