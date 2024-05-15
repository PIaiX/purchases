import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from '../utils/Input';

const PasswordForm = ({ data, register, handleSubmit, onSubmit, errors, isValid, setValue }) => {
  return (
    <form action="" className='mini' onSubmit={handleSubmit(onSubmit)}>
      {!data.step || data.step === 1 ? (
        <>
          <p className='mb-5'>Введите адрес электронной почты, которую вы вводили при регистрации</p>

          <Row className='g-3 g-md-4'>
            <Col md={8}>
              <Input
                type="email"
                label={'E-mail'}
                name="email"
                placeholder='user@mail.com'
                errors={errors}
                register={register}
                validation={{
                  required: "Введите email",
                  maxLength: {
                    value: 250,
                    message: "Максимально 250 символов",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Неверный формат Email",
                  },
                }}
              />
            </Col>
            <Col md={4}>
              <button type='submit' className='btn-1 h-100 w-100' disabled={!data?.email || data?.email?.length < 4}>Восстановить</button>
            </Col>
          </Row>
        </>
      ) : data.step === 2 ? (
        <>
          <p className='mb-3'>Введите код, отправленный на указанную электронную почту</p>
          <Row className='g-3 g-md-4 justify-content-center'>
            <Col md={4}>
              <input
                className='code'
                type="number"
                placeholder='0000'
                onChange={(e) => setValue("key", e.target.value)}
              />
            </Col>
            <Col md={4}>
              <button type='submit' className='btn-1 h-100 w-100' disabled={!data?.key || data?.key?.length < 4}>Отправить</button>
            </Col>
          </Row>
        </>
      ) : data.step === 3 && (
        <>
          <Row>
            <Col md={12}>
              <Input
                className="mb-2"
                autoComplete="new-password"
                type="password"
                label="Новый пароль"
                placeholder="Придумайте пароль"
                name="password"
                errors={errors}
                register={register}
                validation={{
                  required: "Введите пароль",
                  minLength: {
                    value: 6,
                    message: "Минимальное кол-во символов 6",
                  },
                  maxLength: {
                    value: 250,
                    message: "Максимальное кол-во символов 250",
                  },
                  pattern: {
                    value: /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{6,}/g,
                    message:
                      "Пароль должен содержать не менее 6 символов латинского алфавита и цифры",
                  },
                }}
              />
            </Col>
          </Row>
          {/* <p className='rose fs-08'>Слишком короткий пароль</p>
          <p className='fs-08'>Пароль должен содержать не менее 6 символов, и среди них должны быть заглавные и строчные буквы, цифры, специальные символы (т. е. *, %, &,!)</p> */}

          <Row className='mt-4'>
            <Col md={12}>
              <Input
                autoComplete="new-password"
                className="mb-2"
                type="password"
                label="Подтверждение пароля"
                placeholder="Повторите пароль"
                name="passwordConfirm"
                errors={errors}
                register={register}
                validation={{
                  required: "Введите повторный пароль",
                  minLength: {
                    value: 6,
                    message: "Минимальное кол-во символов 6",
                  },
                  maxLength: {
                    value: 20,
                    message: "Максимально 20 символов",
                  },
                  pattern: {
                    value: /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{6,}/g,
                    message:
                      "Пароль должен содержать не менее 6 символов латинского алфавита и цифры",
                  },
                }}
              />
            </Col>
          </Row>

          <button type='submit' className='btn-1 mt-4 mx-auto' disabled={!isValid}>Сохранить</button>
        </>
      )}
    </form>
  );
};

export default PasswordForm;