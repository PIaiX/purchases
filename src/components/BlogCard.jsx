import React from 'react';
import {Link} from 'react-router-dom';
import useIsMobile from '../hooks/isMobile';

const BlogCard = (props) => {
  const {mobile} = useIsMobile('1109px');

  return (
    <figure className={(mobile) ? 'blog-list-item-mobile' : 'blog-list-item'}>
      <img src={props.img} alt={props.title} />
      <h5><Link className='stretched-link' to="/blog/1">{props.title}</Link></h5>
    </figure>
  );
};

export default BlogCard;