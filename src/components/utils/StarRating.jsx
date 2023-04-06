import React from 'react';
import StarIcon from '../svg/StarIcon';

export default function StarRating(props) {
  const arr = [1, 2, 3, 4, 5]
  const num = Number(props.rate)
  const numRound = Math.round(Number(props.rate))
  return (
    <div className="star-rating">
      {arr.map((item) => {
        if (item <= num) {
          return <StarIcon className="filled" key={item} />
        } else if (item === numRound) {
          return <StarIcon className="filled" key={item} />
        } else {
          return <StarIcon key={item} />
        }
      })}
    </div>
  )
}