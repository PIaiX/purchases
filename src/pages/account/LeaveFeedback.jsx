import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';
import InputRating from '../../components/utils/InputRating';
import Input from '../../components/utils/Input';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { editReview } from '../../services/review';
import { NotificationManager } from "react-notifications";
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

const LeaveFeedback = () => {
  const { productId } = useParams();
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      productId
    }
  });

  const onClick = useCallback((data) => {
    if (!data.value || data.value <= 0) {
      return NotificationManager.error(
        "Укажите оценку"
      )
    }
    editReview(data)
      .then(() => {
        NotificationManager.success("Отзыв отправлен");
      })
      .catch(
        (err) =>
          err &&
          NotificationManager.error(
            err?.response?.data?.error ?? "Неизвестная ошибка при отправке"
          )
      );
  }, [])

  return (
    <section className='sec-feedback mb-3 mb-sm-5'>
      <ReturnTitle link={'/account/feedback'} title={'Оставить отзыв'} />
      <Row xs={1} xxl={2} className='gx-xxl-5'>
        <Col>

          <p className='fs-13 mb-3'>Оцените услуги пользователя <Link className='link' to="/">Obnyalpodnyal</Link></p>
          <InputRating className="mb-4 mb-sm-5" onChange={e => setValue('value', e)} />
          <Input type='textarea' rows={5} label={'Отзыв'} placeholder={'Расскажите подробнее о сделке'} name="text" register={register} />
          <button type='button' className='btn-1 mt-4' onClick={handleSubmit(onClick)}>Оценить</button>

        </Col>
        <Col>
          <div className="list-wrapping mt-5 mt-xxl-0">
            <div className="list-wrapping-top">
              <h5 className='fw-6'>Аккаунты ArcheAge</h5>
            </div>
            <div className="list-wrapping-main p-sm-4">
              <h5 className='fw-6 d-xl-none mb-3'>Аккаунты ArcheAge</h5>
              <ul className='info-list mb-2 mb-sm-4'>
                <li>
                  <span className='blue me-1'>Сервер</span>
                  <span>Airin + Blackbird</span>
                </li>
                <li>
                  <span className='blue me-1'>Регион</span>
                  <span>Free</span>
                </li>
                <li>
                  <span className='blue me-1'>Уровень</span>
                  <span>88</span>
                </li>
                <li>
                  <span className='blue me-1'>Раса</span>
                  <span>Эльф</span>
                </li>
                <li>
                  <span className='blue me-1'>Профессия</span>
                  <span>Архимаг</span>
                </li>
              </ul>
              <p className='gray mb-2'>Описание</p>
              <div>
                <p>Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты)
                  <br />88 уровеньСкриншоты аккаунта по ссылке: https://imgur.com/a/qOAzOUN
                  <br />Аккаунт с релиза<br />54 шестизвездочных операторов
                </p>
                <p>На аккаунте присутствуют все вышедшие коллабные операторы. Присутствует весь пул коллаба с R6 Siege227к орундума, 833 апельсина</p>
              </div>
            </div>
            <div className="list-wrapping-bottom d-sm-flex justify-content-between align-items-center">
              <div className='box'>
                <span className='gray me-3'>Количество</span>
                <span>1</span>
              </div>
              <div className='btn-5 w-xs-100 mt-2 mt-sm-0'>
                <span className='fw-6'>Стоимость</span>
                <span className='ms-3 ms-xxxl-5'>1 086,97</span>
                <span className='rouble ms-2'>₽</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default LeaveFeedback;