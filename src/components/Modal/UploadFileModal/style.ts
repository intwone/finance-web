import theme from '@src/theme';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { baseArchorButtonStyle, baseCancelButtonStyle } from '../style';

export const Content = styled.div`
  padding: 20px;

  p {
    font-size: 0.75rem;
  }

  .info-drag-and-drop {
    margin-top: 35px;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.75rem;
    text-align: center;

    span {
      color: ${theme.colors.orange[700]};
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  background-color: ${transparentize('0.7', '#28262E')};
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  a {
    ${baseCancelButtonStyle}
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

interface DropzoneContainerProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

const isDragActive = css`
  border-color: ${theme.colors.green[900]};
  background-color: ${transparentize(0.95, theme.colors.green[900])};
`;

const isDragReject = css`
  border-color: ${theme.colors.red[900]};
  background-color: ${transparentize(0.95, theme.colors.red[900])};
`;

export const DropzoneContainer = styled.div<DropzoneContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 30px;
  border: 2px dashed ${theme.colors.orange[700]};
  cursor: pointer;

  div {
    margin-top: 50px;

    strong {
      color: ${theme.colors.orange[700]};
    }
  }

  ${props => props.isDragActive && isDragActive}
  ${props => props.isDragReject && isDragReject}
`;

export const FileUploadedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 20px 20px;
`;

export const RemoveTransactionContainer = styled.div`
  ${baseArchorButtonStyle}

  a {
    margin-left: 5px;
  }
`;

export const DownloadTemplateFile = styled.div`
  ${baseArchorButtonStyle}

  svg {
    font-size: 14px;
    margin-right: 3px;
  }
`;
