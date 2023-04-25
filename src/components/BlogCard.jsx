import React from 'react';
import {Link} from 'react-router-dom';
import useIsMobile from '../hooks/isMobile';

const BlogCard = (props) => {
  const {isMobile} = useIsMobile('1109px');

  return (
    <figure className={(isMobile) ? 'blog-list-item-mobile' : 'blog-list-item'}>
      <img src={props.img} alt={props.title} />
      <h5><Link className='stretched-link' to="/blog/1">{props.title}</Link></h5>
    </figure>
  );
};

export default BlogCard;