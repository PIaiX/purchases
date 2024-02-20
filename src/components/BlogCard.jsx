import React from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/isMobile';
import { getImageURL } from '../helpers/all';

const BlogCard = ({ id, link, title }) => {
  const isMobileLG = useIsMobile('991px');
  const image = getImageURL({ path: link, type: "articles" })
  return (
    <figure className={(isMobileLG) ? 'blog-list-item-mobile' : 'blog-list-item'}>
      <Link className='stretched-link' to={`/blog/${id}`}><img src={image} alt={title} /></Link>
      <h5><Link className='stretched-link' to={`/blog/${id}`}>{title}</Link></h5>
    </figure>
  );
};

export default BlogCard;