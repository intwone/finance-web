import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@src/components/Button';
import Input from '@src/components/Input';
import { StringHelper } from '@src/helpers/StringHelper';
import {
  GetAllTransactionsDocument,
  GetBoxSummaryInfoDocument,
  GetTransactionInfoDocument,
  useUpdateTransactionMutation,
} from '@src/services/graphql/generated/schema';
import theme from '@src/theme';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import {
  Content,
  ModalBody,
  ModalFooter,
  RadioBox,
  RemoveTransactionContainer,
  TransactionTypeContainer,
} from '../commonStyle';
import { ModalProps } from '../commonTypes';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { schema } from './schema';
import { FormProps } from './types';

export default function EditTransactionModal({
  transaction,
  isVisibleModal,
  handleCloseModal,
}: ModalProps) {
  const [value, setValue] = useState('');
  const [type, setType] = useState<string | null | undefined>('');
  const [isVisibleConfirmDeleteModal, setIsVisibleConfirmDeleteModal] =
    useState(false);

  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid, errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [updateTransactionMutation, { loading }] =
    useUpdateTransactionMutation();

  useEffect(() => {
    setType(transaction?.type);
  }, [transaction?.type]);

  function handleShowConfirmDeleteModal() {
    setIsVisibleConfirmDeleteModal(prev => !prev);
  }

  async function onSubmit({ category, title, value }: FormProps) {
    try {
      const valueFormatted = StringHelper.removeMask(String(value));
      await updateTransactionMutation({
        variables: {
          id: transaction?.id,
          data: { category, title, type, value: valueFormatted },
        },
        refetchQueries: [
          { query: GetAllTransactionsDocument },
          { query: GetTransactionInfoDocument },
          { query: GetBoxSummaryInfoDocument },
        ],
      });
      toast.success('Transação atualizada com sucesso.');
    } catch {
      toast.error('Ocorreu um erro ao atualizar a transação.');
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
          <h2>Editar transação</h2>
          <div className="divider" />

          <ModalBody>
            <Input
              type="text"
              id="title"
              register={register}
              error={errors.title}
              defaultValue={transaction?.title}
              placeholder="Digite o título da transação"
            />

            <Input
              type="string"
              id="value"
              register={register}
              error={errors.value}
              defaultValue={StringHelper.currencyMask(
                String(transaction?.value),
              )}
              placeholder="Digite o valor da transação"
              onChange={e => {
                e.target.value = StringHelper.currencyMask(e.target.value);
                setValue(e.target.value);
              }}
            />

            <TransactionTypeContainer>
              <RadioBox
                type="button"
                onClick={() => setType('income')}
                isActive={type === 'income'}
                activeColor="green"
              >
                <span>Entrada</span>
                <BsArrowUpCircle color={theme.colors.green[900]} size={20} />
              </RadioBox>

              <RadioBox
                type="button"
                onClick={() => setType('outcome')}
                isActive={type === 'outcome'}
                activeColor="red"
              >
                <span>Saída</span>
                <BsArrowDownCircle color={theme.colors.red[900]} size={20} />
              </RadioBox>
            </TransactionTypeContainer>

            <Input
              type="text"
              id="category"
              register={register}
              error={errors.category}
              defaultValue={transaction?.category}
              placeholder="Digite a categoria da transação"
            />
          </ModalBody>
        </Content>

        <ModalFooter justifyContent="space-between">
          <RemoveTransactionContainer
            onClick={() => handleShowConfirmDeleteModal()}
          >
            <FaTrash />
            <a>Excluir</a>
          </RemoveTransactionContainer>

          <div>
            <a className="cancel-button" onClick={handleCloseModal}>
              Cancelar
            </a>
            <Button
              type="submit"
              disabled={loading || !isDirty || !isValid || value === '0,00'}
              style={{ height: '40px', width: '150px' }}
            >
              {loading ? (
                <ReactLoading type="spin" height={20} width={20} />
              ) : (
                'Salvar'
              )}
            </Button>
          </div>
        </ModalFooter>
      </form>

      {isVisibleConfirmDeleteModal && (
        <ConfirmDeleteModal
          transaction={transaction}
          isVisibleModal={isVisibleConfirmDeleteModal}
          handleCloseModal={handleShowConfirmDeleteModal}
        />
      )}
    </ReactModal>
  );
}
