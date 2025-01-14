import Button from '@src/components/Button';
import DropzoneContentMessage from '@src/components/DropzoneContentMessage';
import FileUploaded from '@src/components/FileUploaded';
import config from '@src/config';
import { createTransactionFile } from '@src/services/axios/CreateTransactionFile';
import {
  useGetAllTransactionsLazyQuery,
  useGetBoxSummaryInfoLazyQuery,
  useGetTransactionInfoLazyQuery,
} from '@src/services/graphql/generated/schema';
import theme from '@src/theme';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';
import { IoMdCloudUpload } from 'react-icons/io';
import ReactLoading from 'react-loading';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { ModalFooter, RemoveTransactionContainer } from '../commonStyle';
import { FileProps, ModalProps } from '../commonTypes';
import {
  Content,
  DownloadTemplateFile,
  DropzoneContainer,
  FileUploadedContainer,
  ModalBody,
} from './style';

export default function UploadFileModal({
  handleCloseModal,
  isVisibleModal,
}: ModalProps) {
  const [file, setFile] = useState<FileProps | File | null>(null);
  const [getAllTransactionsLazyQuery] = useGetAllTransactionsLazyQuery();
  const [getBoxSummaryInfoLazyQuery] = useGetBoxSummaryInfoLazyQuery();
  const [getTransactionInfoLazyQuery] = useGetTransactionInfoLazyQuery();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onDrop = useCallback((acceptedFile: any) => {
    if (!acceptedFile.length) return toast.error('Arquivo não suportado.');
    return setFile(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        'text/csv': ['.csv'],
      },
    });

  function iconColor() {
    if (!isDragActive) return theme.colors.orange[800];
    if (isDragReject) return theme.colors.red[900];
    return theme.colors.green[900];
  }

  function refetchQuerysToUpdateScreen() {
    getTransactionInfoLazyQuery().then(res => res.refetch());
    getBoxSummaryInfoLazyQuery().then(res => res.refetch());
    getAllTransactionsLazyQuery().then(res => res.refetch());
  }

  function handleDownloadTemplateFile() {
    window.location.href = config.aws.templateFileUrl;
  }

  async function onSubmit() {
    try {
      if (!file) return;
      await createTransactionFile(file);
      toast.success('Arquivo salvo com sucesso.');
      setFile(null);
      refetchQuerysToUpdateScreen();
    } catch {
      toast.error('Ocorreu um erro ao salvar o arquivo.');
    }
  }

  return (
    <ReactModal
      isOpen={isVisibleModal}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={handleCloseModal}
      >
        <CgClose size={20} color={theme.colors.gray[700]} />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <h2>Upload de arquivo</h2>
          <div className="divider" />
          <p className="info-drag-and-drop">
            Arraste e solte seu o seu arquivo aqui.
          </p>
          <ModalBody>
            <DropzoneContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              <IoMdCloudUpload size={60} color={iconColor()} />
              <DropzoneContentMessage
                isDragActive={isDragActive}
                isDragReject={isDragReject}
              />
            </DropzoneContainer>
          </ModalBody>
        </Content>

        {!!file && (
          <FileUploadedContainer>
            <FileUploaded name={file.name} size={file.size} />
            <RemoveTransactionContainer onClick={() => setFile(null)}>
              <FaTrash />
              <a>Excluir</a>
            </RemoveTransactionContainer>
          </FileUploadedContainer>
        )}

        <ModalFooter justifyContent="space-between">
          <DownloadTemplateFile onClick={handleDownloadTemplateFile}>
            <AiOutlineCloudDownload />
            <p>Baixar template</p>
          </DownloadTemplateFile>
          <div>
            <a className="cancel-button" onClick={handleCloseModal}>
              Cancelar
            </a>
            <Button
              type="submit"
              disabled={isSubmitting || !file}
              style={{ height: '40px', width: '150px' }}
            >
              {isSubmitting ? (
                <ReactLoading type="spin" height={20} width={20} />
              ) : (
                'Salvar'
              )}
            </Button>
          </div>
        </ModalFooter>
      </form>
    </ReactModal>
  );
}
