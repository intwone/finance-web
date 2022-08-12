import theme from '@src/theme';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 120px;
  margin-top: 30px;
`;

export const AddTransactionContainer = styled.div`
  button + button {
    margin-left: 3px;
  }

  button:nth-child(1) {
    border-radius: 5px 0 0 5px;
  }

  button:last-child {
    border-radius: 0px 5px 5px 0px;
  }
`;

export const RegisterInformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  strong {
    color: ${theme.colors.orange[700]};
  }

  .last-transaction {
    font-size: 0.81rem;
  }
`;

export const TransactionsContainer = styled.div`
  article + article {
    margin-top: 15px;
  }
`;

export const Content = styled.div`
  padding: 0 0 30px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  svg {
    margin-top: 100px;
    height: 35px;
    width: 35px;
  }
`;
