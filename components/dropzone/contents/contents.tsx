import { Img } from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageNew } from 'usecase/useImageNew';
import styles from './contents.module.scss';

export const Contents = () => {
  // ブラウザ表示用の paths
  const [previewImagePaths, setPreviewImagePaths] = useState<string[]>();
  // upload用の files
  const [files, setFiles] = useState<File[]>();

  const { imageNewHandler } = useImageNew();

  //*********************
  /** 選択された画像を処理 */
  //*********************
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    const dataUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImagePaths(dataUrls);
  };
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [
        '.jpg',
        '.jpeg',
        '.JPG',
        '.JPEG',
        '.jpe',
        '.jfif',
        '.pjpeg',
        '.pjp',
      ],
    },
  });

  const handleClickDelete = () => {
    setPreviewImagePaths([]);
  };

  const handleClickUpload = async () => {
    const formData = buildFormData(files);
    const response = await imageNewHandler(formData);
  };

  const buildFormData = (files?: File[]) => {
    if (!files) {
      return new FormData();
    }
    // DB へアップロードするために、FormData へ append する
    const formData = new FormData();
    files.forEach((file) => formData.append(file.name, file, file.name));
    return formData;
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <>
      <div>
        {errors.map((e) => (
          <p key={e.code}>
            {file.name}は許可された拡張子ではありません{e.message}
          </p>
        ))}
      </div>
    </>
  ));

  return (
    <>
      <div className={styles.contents}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
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
      <div className={styles.contents__button}>
        <button onClick={handleClickDelete}>Delete preview images</button>
      </div>
      <div className={styles.contents__button}>
        <button onClick={handleClickUpload}>Upload images</button>
      </div>
      {fileRejectionItems}
    </>
  );
};
