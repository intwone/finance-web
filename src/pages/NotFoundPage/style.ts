import theme from '@src/theme';
import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0 150px 0 150px;

  img {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 1025px) {
    padding: 0 80px 0 80px;
  }

  @media (max-width: 769px) {
    padding: 0 40px 0 40px;

    img {
      width: 200px;
      height: 200px;
    }
  }

  @media (max-width: 426px) {
    text-align: center;

    img {
      display: none;
    }
  }
`;

export const InfoText = styled.div`
  .not-found-status {
    font-size: 150px;
    color: ${theme.colors.orange[700]};
  }

  .suggest-info {
    margin-top: 10px;
    color: ${transparentize(0.3, theme.colors.gray[700])};
  }

  button {
    padding: 20px;
    background: ${theme.colors.orange[700]};
    border-radius: 5px;
    color: ${theme.colors.txt};
    transition: background-color 0.3s;
    margin-top: 20px;
    display: flex;

    &:hover {
      background-color: ${transparentize(0.3, theme.colors.orange[700])};
      color: ${theme.colors.txt};
    }

    @media (max-width: 426px) {
      width: 100%;
    }
  }
`;
