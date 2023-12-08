import React, { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import StarRating from '../../components/utils/StarRating';
import NavPagination from '../../components/NavPagination';
import FeedbackLine from '../../components/FeedbackLine';
import PurchaseLine from '../../components/PurchaseLine';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { getReview } from '../../services/review';
import { declOfNum } from '../../helpers/all';
import { useSelector } from 'react-redux';
import Loader from '../../components/utils/Loader';

const Feedback = () => {
  const user = useSelector(state => state.auth?.user);
  const [isMyFeedback, setIsMyFeedback] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const [review, setReview] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getReview({ page: currentPage, authorId: isMyFeedback })
      .then((res) => {
        setReview((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.pagination.currentPage)
      })
      .catch(() => setReview((prev) => ({ ...prev, loading: false })));
  }, [currentPage, isMyFeedback]);
  const totalItems = review?.reviews?.pagination?.totalItems ?? 0;
  const declension = declOfNum(totalItems, ['отзыв', 'отзыва', 'отзывов']);
  if (review.loading) {
    return <Loader full />;
  }
  return (
    <section className='sec-feedback mb-6'>
      <ReturnTitle link={'/account'} title={'Отзывы'} />

      <div className="d-xl-flex align-items-stretch justify-content-between">
        <div className='user'>
          <div className="user-photo">
            <img src="/imgs/user2.jpg" alt="userphoto" />
            <button type='button'><FiEdit /></button>
          </div>
          <div className="user-main">
            <div className='title'>{user.nickname}</div>
            <div className="d-flex align-items-center">
              <StarRating value={user.rating} />
              <span className='fs-13 fw-7 ms-2'>{user.rating}</span>
            </div>
          </div>
        </div>
        <ul className='list-unstyled d-flex align-items-stretch ms-xl-5 mt-4 mt-xl-0'>
          <li>
            <button
              type='button'
              className={(isMyFeedback) ? 'btn-2 h-100' : 'btn-2 h-100 active'}
              onClick={() => setIsMyFeedback(false)}
            >Отзывы обо мне</button>
          </li>
          <li className='ms-4 ms-xl-5'>
            <button
              type='button'
              className={(isMyFeedback) ? 'btn-2 h-100 active' : 'btn-2 h-100'}
              onClick={() => setIsMyFeedback(1)}
            >Мои отзывы</button>
          </li>
        </ul>
      </div>

      {
        (isMyFeedback)
          ? <>
            <div className="list-wrapping mt-5">
              <div className="list-wrapping-top">
                <h5 className='fw-6'>Оставить отзыв</h5>
              </div>
              <div className="list-wrapping-main p-3">
                <ul className='row row-cols-1 row-cols-sm-2 row-cols-xl-1 g-3'>
                  {review?.orders?.length > 0 && review.orders.map((item) => (
                    <li>
                      <PurchaseLine  {...item} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="list-wrapping-bottom">
                {/* <NavPagination totalPages={review?.orders?.pagination?.totalPages} onPageChange={onPageChange1} /> */}
              </div>
            </div>
            <div className="list-wrapping mt-5">
              <div className="list-wrapping-top">
                <h5 className='fw-6'>Мои отзывы</h5>
              </div>
              <div className="list-wrapping-main p-3">
                <ul className='row row-cols-1 g-4'>
                  {review?.reviews?.items?.length > 0 && review.reviews.items.map((item) => (
                    <li>
                      <FeedbackLine  {...item} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="list-wrapping-bottom">
                <NavPagination totalPages={review?.reviews.pagination?.totalPages} onPageChange={onPageChange} />
              </div>
            </div>
          </>
          :
          <div className="list-wrapping mt-4 mt-sm-5">
            {review.loading ? (
              <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                Загрузка отзывов...
              </div>
            ) : (<>
              <div className="list-wrapping-top">
                <h5 className='fw-6'>Всего {totalItems} {declension}</h5>
              </div>
              <div className="list-wrapping-main p-sm-4">
                <ul className='row row-cols-1 g-3'>
                  {review?.reviews?.items?.length > 0 && review.reviews.items.map((item) => (
                    <li>
                      <FeedbackLine  {...item} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="list-wrapping-bottom">
                <NavPagination totalPages={review?.pagination?.totalPages} onPageChange={onPageChange} />
              </div>
            </>)}
          </div>
      }
    </section>
  );
};

export default Feedback;