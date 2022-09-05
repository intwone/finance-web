import { useAuth } from '@src/hooks/auth/auth';
import theme from '@src/theme';
import { CgClose } from 'react-icons/cg';
import ReactModal from 'react-modal';
import FooterModal from '../FooterModal';
import { ModalProps } from '../types';
import { ModalBody } from './style';

export default function LogoutModal({
  isVisibleModal,
  handleCloseModal,
}: ModalProps) {
  const { signOut } = useAuth();

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

      <ModalBody>Tem certeza que deseja sair?</ModalBody>

      <FooterModal
        closeModalFn={handleCloseModal}
        buttonTitle="Sair"
        actionButton={signOut}
      />
    </ReactModal>
  );
}
