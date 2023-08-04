import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from '../utils/Input';
import InputFileImg from '../utils/InputFileImg';

const FeedbackForm = () => {
  return (
    <form action="">
      <Row className='g-4'>
        <Col md={4}>
          <Input type="text" label={'Имя / ник'} placeholder='Имя'/>
        </Col>
        <Col md={4}>
          <Input type="email" label={'E-mail'} placeholder='user@mail.com'/>
        </Col>
        <Col md={4}>
          <Input 
            type={"select"} 
            label={"Номер заказа"} 
            options={[{value:1, text: 'Другое'}, {value:2, text: 'Другое'}, {value:3, text: 'Другое'}]}
          />
        </Col>
        <Col md={6}>
          <Input 
            type={"select"} 
            label={"Тема"} 
            options={[{value:1, text: 'Другое'}, {value:2, text: 'Другое'}, {value:3, text: 'Другое'}]}
          />
        </Col>
        <Col md={6}>
          <Input 
            type={"select"} 
            label={"Подтема"} 
            options={[{value:1, text: 'Другое'}, {value:2, text: 'Другое'}, {value:3, text: 'Другое'}]}
          />
        </Col>
        <Col md={12}>
          <Input 
            className="mb-3"
            type={"textarea"} 
            label={"Обращение"} 
            rows={3}
            placeholder={"Предоставьте как можно более подробную информацию, приложите необходимые скриншоты."}
          />
          <InputFileImg/>
          <button className='btn-1 mt-4'>Отправить</button>
        </Col>
      </Row>
    </form>
  );
};

export default FeedbackForm;