import Button from '@src/components/Button';
import { useAuth } from '@src/hooks/useAuth';
import theme from '@src/theme';
import { CgClose } from 'react-icons/cg';
import ReactModal from 'react-modal';
import { ModalFooter } from '../commonStyle';
import { ModalProps } from '../commonTypes';
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

      <ModalFooter justifyContent="end">
        <div>
          <a className="cancel-button" onClick={handleCloseModal}>
            Cancelar
          </a>
          <Button onClick={signOut} style={{ height: '40px', width: '150px' }}>
            Sair
          </Button>
        </div>
      </ModalFooter>
    </ReactModal>
  );
}
