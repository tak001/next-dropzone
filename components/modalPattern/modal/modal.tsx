import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import styles from './modal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectImages: (acceptedFiles: File[]) => void;
};

export const ImageModal = ({ isOpen, onClose, selectImages }: Props) => {
  //************************************
  /** 選択された画像を処理するイベントを通知 */
  //************************************
  const onDrop = (acceptedFiles: File[]) => {
    selectImages(acceptedFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClickOk = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className={styles.modal__header}>画像の選択</ModalHeader>
        <ModalBody className={styles.modal__body}>
          <div className={styles.modal__contents}>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} accept="image/*" />
              <p>
                Drag and drop some image files here, or click to select image
                files
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Box className={styles.modal__footer}>
            <button onClick={handleClickOk}>OK</button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
