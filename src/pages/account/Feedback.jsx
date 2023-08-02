import React, {useState} from 'react';
import { FiEdit } from "react-icons/fi";
import StarRating from '../../components/utils/StarRating';
import NavPagination from '../../components/NavPagination';
import FeedbackLine from '../../components/FeedbackLine';
import PurchaseLine from '../../components/PurchaseLine';
import ReturnTitle from '../../components/utils/ReturnTitle';

const Feedback = () => {
  const [isMyFeedback, setIsMyFeedback] = useState(false);
  return (
    <section className='sec-feedback mb-6'>
      <ReturnTitle link={'/account'} title={'Отзывы'}/>

      <div className="d-xl-flex align-items-stretch justify-content-between">
        <div className='user'>
          <div className="user-photo">
            <img src="/imgs/user2.jpg" alt="userphoto" />
            <button type='button'><FiEdit/></button>
          </div>
          <div className="user-main">
            <div className='title'>Weatherwax</div>
            <div className="d-flex align-items-center">
              <StarRating rate={5}/> 
              <span className='fs-13 fw-7 ms-2'>5</span>
            </div>
          </div>
        </div>
        <ul className='list-unstyled d-flex align-items-stretch ms-xl-5 mt-4 mt-xl-0'>
          <li>
            <button 
              type='button' 
              className={(isMyFeedback)?'btn-2 h-100':'btn-2 h-100 active'}
              onClick={()=>setIsMyFeedback(false)}
            >Отзывы обо мне</button>
          </li>
          <li className='ms-4 ms-xl-5'>
            <button 
              type='button' 
              className={(isMyFeedback)?'btn-2 h-100 active':'btn-2 h-100'}
              onClick={()=>setIsMyFeedback(true)}
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
                <li>
                  <PurchaseLine/>
                </li>
                <li>
                  <PurchaseLine/>
                </li>
                <li>
                  <PurchaseLine/>
                </li>
              </ul>
            </div>
          </div>
          <div className="list-wrapping mt-5">
            <div className="list-wrapping-top">
              <h5 className='fw-6'>Мои отзывы</h5>
            </div>
            <div className="list-wrapping-main p-3">
              <ul className='row row-cols-1 g-4'>
                <li>
                  <FeedbackLine user="Obnyalpodnyal" rate={4.8} text="Всё супер, продавец топ! Быстро и самая хорошая цена!"/>
                </li>
                <li>
                  <FeedbackLine user="Obnyalpodnyal" rate={4.8} text="Всё супер, продавец топ! Быстро и самая хорошая цена!"/>
                </li>
                <li>
                  <FeedbackLine user="Obnyalpodnyal" rate={4.8} text="Всё супер, продавец топ! Быстро и самая хорошая цена!"/>
                </li>
              </ul>
            </div>
            <div className="list-wrapping-bottom">
              <NavPagination/>
            </div>
          </div>
        </>
        :<div className="list-wrapping mt-4 mt-sm-5">
          <div className="list-wrapping-top">
            <h5 className='fw-6'>Всего 193 отзыва</h5>
          </div>
          <div className="list-wrapping-main p-sm-4">
            <ul className='row row-cols-1 g-3'>
              <li>
                <FeedbackLine user="Obnyalpodnyal" rate={4.8} text="Всё супер, продавец топ! Быстро и самая хорошая цена!"/>
              </li>
              <li>
                <FeedbackLine user="Galadriel_90" rate={4.1} text="быстрое и качественное выполнение заказа, спасибо!"/>
              </li>
              <li>
                <FeedbackLine user="Raccoon5" rate={2.8} text="Быстро и чётко,спасибо продавцу"/>
              </li>
              <li>
                <FeedbackLine user="Obnyalpodnyal" rate={4.8} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              </li>
              <li>
                <FeedbackLine user="Galadriel_90" rate={4.1} text="быстрое и качественное выполнение заказа, спасибо!"/>
              </li>
              <li>
                <FeedbackLine user="Raccoon5" rate={2.8} text="Быстро и чётко,спасибо продавцу"/>
              </li>
            </ul>
          </div>
          <div className="list-wrapping-bottom">
            <NavPagination/>
          </div>
        </div>
      }
    </section>
  );
};

export default Feedback;