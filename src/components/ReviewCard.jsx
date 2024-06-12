import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PiDotsThreeBold } from "react-icons/pi"
import StarIcon from './svg/StarIcon'
import { getImageURL } from '../helpers/all'
import moment from 'moment'

const ReviewCard = ({ createdAt, text, author, id }) => {
    const [clampOff, setClampOff] = useState(false);

    const toggleClamp = () => {
        setClampOff(!clampOff);
    };
    const image = getImageURL({ path: author?.media, type: "user", size: "mini" })
    return (
        <div className='review-card'>
            <div className="d-flex flex-column flex-xxl-row-reverse justify-content-between align-items-stretch align-items-xxl-start mb-2">
                <div className='d-flex justify-content-between justify-content-xxl-end align-items-center mb-1 mb-xxl-0'>
                    <div className="d-flex align-items-center">
                        <time>{moment(createdAt).format("kk:mm")}</time>
                        <time className='ms-3'>{moment(createdAt).format("DD.MM.YYYY")}</time>
                    </div>
                    <button type='button' className='d-flex pale-blue fs-16 ms-3'>
                        <PiDotsThreeBold />
                    </button>
                </div>
                <div className='d-flex align-items-center'>
                    <Link to={`/trader/${author.id}`} className='user'>
                        <img src={image} alt="name8user" className='user-photo' />
                        <span>{author.nickname}</span>
                    </Link>
                    <div className='rating ms-3'>
                        <StarIcon />
                        <span>{author?.rating != null ? parseFloat(author?.rating).toFixed(1) : "0.0"}</span>
                    </div>
                </div>
            </div>
            <div className="text">
                <p className={clampOff ? 'clamp-off' : ''} onClick={toggleClamp}>{text}</p>
            </div>
        </div>
    )
}

export default ReviewCard