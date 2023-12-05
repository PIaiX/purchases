import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBreadcrumbs from '../components/NavBreadcrumbs';
import BlogCard2 from '../components/BlogCard2';
import { getArticle } from '../services/article';
import NavPagination from '../components/NavPagination';
import Loader from '../components/utils/Loader';
import { getImageURL } from '../helpers/all';

const Article = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const [articles, setArticles] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getArticle({ id: id, page: currentPage, size: 2 })
      .then((res) => {
        setArticles((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.documents.pagination.currentPage)
      })
      .catch(() => setArticles((prev) => ({ ...prev, loading: false })));
  }, [currentPage, id]);
  if (articles.loading) {
    return <Loader full />;
  }
  const image = getImageURL({ path: articles?.document, type: "articles" })
  return (
    <main>
      <Container>
        <NavBreadcrumbs />

        <section className='page-blog mb-3 mb-sm-4 mb-md-5'>
          <Row className='justify-content-between'>
            <Col xs={12} lg={8} xxl={7}>
              <article>
                <h1>{articles?.document?.title}</h1>
                <img src={image} alt={articles?.document?.title} className='img-fluid' />
                <div dangerouslySetInnerHTML={{ __html: articles?.document?.content }} />
              </article>
            </Col>
            <Col xs={12} lg={4}>
              <Row className='gx-2 gx-sm-4 gy-4 gy-sm-5'>

                <Col xs={12}>
                  <Link to='/blog' className='cognition'><h3 className='fw-7 text-end mb-0'>Познать больше</h3></Link>
                </Col>
                {articles?.documents?.items?.length > 0 && articles.documents.items.map((item) => (

                  <Col xs={6} lg={12}>
                    <BlogCard2 {...item} />
                  </Col>
                ))}
                <div className="list-wrapping-bottom">
                  <NavPagination totalPages={articles?.documents?.pagination?.totalPages} onPageChange={onPageChange} />
                </div>
              </Row>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Article;