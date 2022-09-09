import theme from '@src/theme';
import styled from 'styled-components';

export const ModalBody = styled.div`
  padding: 20px;
  margin-top: 20px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;

  em {
    color: ${theme.colors.orange[700]};
  }
`;
