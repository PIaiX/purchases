import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageURL } from '../helpers/all';

const BlogCard2 = ({ id, media, title, createdAt }) => {
  const date = createdAt ? moment(createdAt).format("DD MMMM YYYY") : null
  const image = getImageURL({ path: media, type: "news" })
  return (
    <figure className='article-mini'>
      <Link className='stretched-link' to={`/blog/${id}`}><img src={image} alt={title} /></Link>

      <figcaption>
        <h5><Link className='stretched-link' to={`/blog/${id}`}>{title}</Link></h5>
        <time>{date}</time>
      </figcaption>
    </figure>
  );
};

export default BlogCard2;