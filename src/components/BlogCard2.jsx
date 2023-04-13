import React from 'react';
import {Link} from 'react-router-dom';

const BlogCard2 = (props) => {
  return (
    <figure className='article-mini'>
      <img src={props.img} alt={props.title} />
      <figcaption>
        <h5><Link className='stretched-link' to="/blog/1">{props.title}</Link></h5>
        <time pubdate>06 марта 2023</time>
      </figcaption>
    </figure>
  );
};

export default BlogCard2;