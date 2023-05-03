import React, {useState} from 'react';
import StarIcon from '../svg/StarIcon';

const InputRating = (props) => {
  const [ratingValue, setRatingValue] = useState(0);
  const isSelected = (v) => (v === ratingValue ? 'active' : '')
  return (
    <div className={'input-rating ' + props.className}>
      <input type="number" name={props.name} value={ratingValue} hidden/>
      <div className="stars">
        <button
          type="button"
          onClick={() => setRatingValue(5)}
          className={isSelected(5)}
        >
          <StarIcon />
        </button>
        <button
            type="button"
            onClick={() => setRatingValue(4)}
            className={isSelected(4)}
        >
            <StarIcon />
        </button>
        <button
            type="button"
            onClick={() => setRatingValue(3)}
            className={isSelected(3)}
        >
            <StarIcon />
        </button>
        <button
            type="button"
            onClick={() => setRatingValue(2)}
            className={isSelected(2)}
        >
            <StarIcon />
        </button>
        <button
            type="button"
            onClick={() => setRatingValue(1)}
            className={isSelected(1)}
        >
            <StarIcon />
        </button>
      </div>
    </div>
  );
};

export default InputRating;