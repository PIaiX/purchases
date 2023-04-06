import React from 'react';
import {Link} from 'react-router-dom';

const BlogCard = (props) => {
  return (
    <figure className='blog-list-item'>
      <img src={props.img} alt={props.title} />
      <h5><Link className='stretched-link' to="/blog/1">{props.title}</Link></h5>
    </figure>
  );
};

export default BlogCard;