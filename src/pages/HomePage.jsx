import { useNavigate } from 'react-router-dom';
import "./../styles/HomePage.scss";
import { Container, Row, Col, Card } from 'react-bootstrap';
import quiz from '../assets/images/coffee-quiz.png'
import code from '../assets/images/coffee-code.png'
import search from '../assets/images/coffee-search.png'
const HomePage = () => {
  const navigate = useNavigate();

  return (
        <Container className="coffee-options my-4 center">
            <Row className="menu g-4">
                <Col className="menuItem" md={4}>
                    <Card className="option-card shadow-sm" onClick={() => navigate('/quiz')}>
                        <Card.Body>
                            <Card.Title className="option-title">Coffee quiz</Card.Title>
                            <Card.Text className="option-text">This 5 question quiz will craft your ideal cup of coffee to try</Card.Text>
                            <img src={quiz} alt="Coffee quiz" className="option-image" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="menuItem" md={4}>
                    <Card className="option-card shadow-sm" onClick={() => navigate('/sessioncode')}>
                        <Card.Body>
                            <Card.Title className="option-title">Code</Card.Title>
                            <Card.Text className="option-text">Enter the code on your receipt to buy the coffee you tasted</Card.Text>
                            <img src={code} alt="Code" className="option-image" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="menuItem" md={4}>
                    <Card className="option-card shadow-sm" onClick={() => navigate('/find')}>
                        <Card.Body>
                            <Card.Title className="option-title">Find</Card.Title>
                            <Card.Text className="option-text">Browse our coffee collection and choose your favorite</Card.Text>
                            <img src={search} alt="Search" className="option-image" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>  
  );
};

export default HomePage;