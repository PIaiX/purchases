import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { HiBookmark } from 'react-icons/hi';

const BtnAddFav = ({ favo, onFav }) => {
    const [fav, setFav] = useState(favo)

    return (
        <button
            type="button"
            onClick={() => { setFav(!fav), onFav() }}
            className={fav ? 'add-fav active' : 'add-fav'}
        >
            <FiHeart className="fs-13" />
        </button>
    )
}

export default BtnAddFav