import theme from '@src/theme';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import DropzoneContainerProps from './types';

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

export const DownloadTemplateFile = styled.div`
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

  svg {
    font-size: 14px;
    margin-right: 3px;
  }
`;
