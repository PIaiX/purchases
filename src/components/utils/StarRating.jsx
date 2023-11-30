import React from 'react';
import StarIcon from '../svg/StarIcon';

export default function StarRating({ value }) {
  const arr = [1, 2, 3, 4, 5]
  const num = Number(value)
  const numRound = Math.round(Number(value))
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