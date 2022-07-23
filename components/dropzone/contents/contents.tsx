import { Img } from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { useProfileImageNew, useProfileImageDelete } from 'usecase/profile';
// import { ProfileEditFormInput } from './types/form';
import styles from './contents.module.scss';

export const Contents = () => {
  const onDrop = (acceptedFiles: File[]) => {
    const blobUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImagePaths(blobUrls);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  // ブラウザ表示用の paths
  const [previewImagePaths, setPreviewImagePaths] = useState<string[]>();

  return (
    <>
      <div className={styles.contents}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} accept="image/*" />
          <p>
            Drag and drop some image files here, or click to select image files
          </p>
        </div>
      </div>
      {previewImagePaths &&
        previewImagePaths.map((image, i) => (
          <div key={i}>
            <Img src={image} />
          </div>
        ))}
    </>
  );
};
