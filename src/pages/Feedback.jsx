import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FeedbackForm from '../components/forms/FeedbackForm';

const Feedback = () => {
  return (
    <main>
      <Container>
        <section className='sec-registration mb-6'>
          <h1 className='h2 text-center'>Обратная связь</h1>
          <Row className='justify-content-center'>
            <Col xs={12} xl={8}>
              <FeedbackForm/>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Feedback;