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
import { getOrder } from '../../services/order';
import Loader from '../../components/utils/Loader';

const LeaveFeedback = () => {
  const { orderId } = useParams();
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
      orderId
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
  const [order, setOrder] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getOrder({ id: orderId })
      .then((res) => {
        setOrder((prev) => ({
          prev,
          loading: false,
          items: res,
        }))
      })
      .catch(() => setOrder((prev) => ({ ...prev, loading: false })));
  }, []);
  if (order.loading) {
    return <Loader />;
  }
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
              <h5 className='fw-6'>{order?.items?.product?.param?.title} {order?.items?.product?.category?.title}</h5>
            </div>
            <div className="list-wrapping-main p-sm-4">
              <h5 className='fw-6 d-xl-none mb-3'>{order?.items?.product?.param?.title} {order?.items?.product?.category?.title}</h5>
              <ul className='info-list mb-2 mb-sm-4'>
                {order?.items?.product?.server?.title &&
                  <li>
                    <span className='blue me-1'>Сервер</span>
                    <span>{order?.items?.product?.server?.title}</span>
                  </li>
                }
                {order?.items?.product?.region?.title &&
                  < li >
                    <span className='blue me-1'>Регион</span>
                    <span>{order?.items?.product?.region?.title}</span>
                  </li>
                }
                {order?.items?.product?.param?.options && order?.items?.product?.param?.options.map(e => {
                  let name = order.items.product.param.options.find(item => (!item.parent && item.id == e.id));
                  if (!e.parent) {
                    let options = order.items.product.options.find(item => (item.option.parent == name.id));
                    return <li>
                      <span className='blue me-1'>{name.title}</span>
                      <span>{options.option.title}</span>
                    </li>

                  }
                })}

              </ul>
              <p className='gray mb-2'>Описание</p>
              <div>
                <p>{order?.items?.product?.title}</p>
                <p>{order?.items?.product?.desc}</p>
              </div>
            </div>
            <div className="list-wrapping-bottom d-sm-flex justify-content-between align-items-center">
              <div className='box'>
                <span className='gray me-3'>Количество</span>
                <span>{order?.items?.count}</span>
              </div>
              <div className='box'>
                <span className='me-3'>Стоимость</span>
                <span className='me-1'>{order?.items?.total}</span>
                <span>₽</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section >
  );
};

export default LeaveFeedback;