import React from 'react'
import {Link} from 'react-router-dom'
import { PiDotsThreeBold } from "react-icons/pi"
import StarIcon from './svg/StarIcon'

const ReviewCard = () => {
  return (
    <div className='review-card'>
        <div className="d-flex flex-column flex-xxl-row-reverse justify-content-between align-items-stretch align-items-xxl-start mb-2">
            <div className='d-flex justify-content-between justify-content-xxl-end align-items-center mb-1 mb-xxl-0'>
                <div className="d-flex align-items-center">
                    <time>14:51</time>
                    <time className='ms-3'>16/03/2023</time>
                </div>
                <button type='button' className='d-flex pale-blue fs-16 ms-3'>
                    <PiDotsThreeBold/>
                </button>
            </div>
            <div className='d-flex align-items-center'>
                <Link to="/trader" className='user'>
                    <img src="imgs/user.jpg" alt="name8user" className='user-photo'/>
                    <span>name8user</span>
                </Link>
                <div className='rating ms-3'>
                    <StarIcon/>
                    <span>4,5</span>
                </div>
            </div>
        </div>
        <div className="text">
            <p>Деньги застряли, но это не вина продавца - решили быстро ситуацию. Спасибо за отличный аккаунт! </p>
        </div>
    </div>
  )
}

export default ReviewCard