import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useParams } from 'react-router-dom';
import Input from '../../components/utils/Input';
import InputRating from '../../components/utils/InputRating';
import Loader from '../../components/utils/Loader';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { getReviewOne } from '../../services/review';
import StarRating from '../../components/utils/StarRating';
import { useSelector } from 'react-redux';

const FeedbackView = () => {
  const { reviewId } = useParams();
  const userId = useSelector(state => state.auth?.user?.id);
  const [review, setReview] = useState({
    loading: true,
    items: [],
  });
  console.log(review)
  useEffect(() => {
    getReviewOne({ reviewId: reviewId })
      .then((res) => {
        setReview((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
      })
      .catch(() => setReview((prev) => ({ ...prev, loading: false })));
  }, []);

  if (review.loading) {
    return <Loader />;
  }
  return (
    <section className='sec-feedback mb-3 mb-sm-5'>
      <ReturnTitle link={'/account/feedback'} title={'Оставить отзыв'} />
      <Row xs={1} xxl={2} className='gx-xxl-5'>
        <Col>

          <p className='fs-13 mb-3'>Оцените услуги пользователя <Link className='link' to={`/trader/${review?.author?.id}`}>{review?.author?.nickname}</Link></p>
          <StarRating value={review?.value} />
          <p className='fs-13 mb-3 mt-4 mt-sm-5'>{review?.text}</p>

        </Col>
        <Col>
          <div className="list-wrapping mt-5 mt-xxl-0">
            <div className="list-wrapping-top">
              <h5 className='fw-6'>{review?.product?.param?.title} {review?.product?.category?.title}</h5>
            </div>
            <div className="list-wrapping-main p-sm-4">
              <h5 className='fw-6 d-xl-none mb-3'>{review?.product?.param?.title} {review?.product?.category?.title}</h5>
              <ul className='info-list mb-2 mb-sm-4'>
                {review?.product?.server?.title &&
                  <li>
                    <span className='blue me-1'>Сервер</span>
                    <span>{review?.product?.server?.title}</span>
                  </li>
                }
                {review?.product?.region?.title &&
                  < li >
                    <span className='blue me-1'>Регион</span>
                    <span>{review?.product?.region?.title}</span>
                  </li>
                }
                {review?.product?.param?.options && review?.product?.param?.options.map(e => {
                  let name = review.product.param.options.find(item => (!item.parent && item.id == e.id));
                  if (!e.parent) {
                    let options = review.product.options.find(item => (item.option.parent == name.id));
                    return <li>
                      <span className='blue me-1'>{name.title}</span>
                      <span>{options.option.title}</span>
                    </li>

                  }
                })}

              </ul>
              {review?.product?.title &&
                <>
                  <p className='gray mb-2'>Название</p>
                  <div>
                    <p>{review?.product?.title}</p>
                  </div>
                </>
              }
              {review?.product?.desc &&
                <>
                  <p className='gray mb-2'>Описание</p>
                  <div>
                    <p>{review?.product?.desc}</p>
                  </div>
                </>
              }
            </div>
            <div className="list-wrapping-bottom d-sm-flex justify-content-between align-items-center">
              {review?.order?.count &&
                <div className='box'>
                  <span className='gray me-3'>Количество</span>
                  <span>{review?.order?.count}</span>
                </div>
              }
              {userId == review?.author?.id ?
                review?.order?.price && <div className='box'>
                  <span className='me-3'>Стоимость</span>
                  <span className='me-1'>{review?.order?.price}</span>
                  <span>₽</span>
                </div>
                :
                review?.order?.total && <div className='box'>
                  <span className='me-3'>Стоимость</span>
                  <span className='me-1'>{review?.order?.total}</span>
                  <span>₽</span>
                </div>
              }
            </div>
          </div>
        </Col>
      </Row>
    </section >
  );
};

export default FeedbackView;