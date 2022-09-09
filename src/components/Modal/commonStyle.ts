import theme from '@src/theme';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { RadioBoxProps } from './CreateNewTransactionModal/types';

export const RemoveTransactionContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${transparentize(0.8, '#8C8C8C')};
  padding: 8px;
  font-size: 0.68rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    transition: background-color 0.3s;
    background-color: ${theme.colors.orange[700]};
    color: ${theme.colors.txt};
  }

  a {
    margin-left: 5px;
  }
`;

export const baseCancelButtonStyle = css`
  margin-right: 30px;
  font-size: 0.93rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${theme.colors.orange[700]};
  }
`;

export const ModalFooter = styled.div<{ justifyContent: string }>`
  display: flex;
  justify-content: ${prop => prop.justifyContent};
  align-items: center;
  padding: 10px 20px;
  background-color: ${transparentize('0.7', '#28262E')};

  div {
    display: flex;
    align-items: center;
  }

  .cancel-button {
    margin-right: 30px;
    font-size: 0.93rem;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: ${theme.colors.orange[700]};
    }
  }

  button {
    background: ${theme.colors.orange[700]};
    border-radius: 5px;
    color: ${theme.colors.txt};
    transition: background-color 0.3s;
    display: flex;

    &:hover {
      background-color: ${transparentize(0.3, theme.colors.orange[700])};
      color: ${theme.colors.txt};
    }
  }
`;

const colors = {
  green: theme.colors.green[900],
  red: theme.colors.red[900],
};

export const Content = styled.div`
  padding: 20px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const TransactionTypeContainer = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;

  span {
    display: inline-block;
    margin-right: 15px;
    font-size: 0.93rem;
  }
`;

export const RadioBox = styled.button<RadioBoxProps>`
  height: 50px;
  background-color: ${props =>
    props.isActive
      ? transparentize(0.8, colors[props.activeColor])
      : theme.colors.gray[900]};

  display: flex;
  border: none;
  border-radius: 5px;
  align-items: center;
  justify-content: center;

  color: ${props =>
    props.isActive
      ? transparentize(0.4, theme.colors.txt)
      : theme.colors.gray[700]};

  transition: filter 0.3s;

  &:hover {
    transition: filter 0.3s;
    filter: brightness(0.8);
  }
`;
