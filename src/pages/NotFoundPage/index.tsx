import GhostImage from '@src/assets/ghost.png';
import Button from '@src/components/Button';
import { useNavigate } from 'react-router-dom';
import { Container, InfoText } from './style';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <InfoText>
        <p className="not-found-status">404</p>
        <p>
          Ooops! <br /> Página não encontrada
        </p>
        <p className="suggest-info">
          Essa página não existe ou foi removida! <br /> Sugerimos que você
          volte para a página home
        </p>

        <Button
          onClick={() => navigate('/transactions')}
          style={{ height: 40 }}
        >
          Ir para a home
        </Button>
      </InfoText>
      <img src={GhostImage} />
    </Container>
  );
}
