import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import NavBreadcrumbs from '../components/NavBreadcrumbs';
import BlogCard2 from '../components/BlogCard2'
import { getArticles } from '../services/article';
import NavPagination from '../components/NavPagination';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const [articles, setArticles] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getArticles({ page: currentPage, size: 2 })
      .then((res) => {
        setArticles((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.pagination.currentPage)
      })
      .catch(() => setArticles((prev) => ({ ...prev, loading: false })));
  }, [currentPage]);
  return (
    <main>
      <Container>
        <NavBreadcrumbs />

        <section className='page-blog mb-3 mb-sm-4 mb-md-5'>
          <h1 className='mb-3 mb-sm-4 mb-md-5'>Новости биржи игровых ценностей</h1>
          <ul className='list-unstyled row row-cols-2 row-cols-lg-3 gx-2 gx-sm-4 gy-4 gy-sm-5'>
            {articles?.items?.length > 0 && articles.items.map((item) => (
              <li>
                <BlogCard2 {...item} />
              </li>
            ))}
          </ul>
          <div className="list-wrapping-bottom">
            <NavPagination totalPages={articles?.pagination?.totalPages} onPageChange={onPageChange} />
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Blog;