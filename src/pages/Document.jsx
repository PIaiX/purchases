import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import bgImg from '../assets/imgs/bg/gradient.jpg';
import { Col, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getCert } from '../services/cert';
import Loader from '../components/utils/Loader';
import ReturnLink from '../components/utils/ReturnLink';

const Document = () => {
  const { documentId } = useParams();
  const [certs, setCerts] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getCert({ id: documentId })
      .then((res) => {
        setCerts((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
      })
      .catch(() => setCerts((prev) => ({ ...prev, loading: false })));
  }, []);


  if (certs.loading) {
    return <Loader full />;
  }
  return (
    <main className='account'>
      <img src={bgImg} alt="bgImg" className='account-bg' />
      <Container>
        <section className='rules mb-md-5'>
          <div className='topic  d-flex align-items-baseline mb-5'>
            <ReturnLink link={'/docs'} className="me-4" />
            <h1 className='h2 mb-0'>{certs.title}</h1>
          </div>
          <div className='content' dangerouslySetInnerHTML={{ __html: certs?.content }} />
          {certs?.data && certs.data.map(table => (
            <>
              <h3 className='mb-4'>{table.name}</h3>
              <div className='rules-wrapping mb-5'>
                <div className='rules-wrapping-top'>
                  <Row className='gx-3 gx-md-4 gx-lg-5' xs={2}>
                    <Col><h4 className='mb-0'>Нарушение</h4></Col>
                    <Col><h4 className='mb-0'>Санкции</h4></Col>
                  </Row>
                </div>
                {/* {certs.data.map(row => (
                  < tr >
                    <td dangerouslySetInnerHTML={{ __html: row?.desc1 }} />
                    <td dangerouslySetInnerHTML={{ __html: row?.desc2 }} />
                  </tr>
                ))} */}
                {table?.content?.map(row => (
                  <div className='rules-wrapping-main'>
                    <Row className='gx-3 gx-md-4 gx-lg-5' xs={2}>
                      <Col dangerouslySetInnerHTML={{ __html: row?.desc1 }} />
                      <Col dangerouslySetInnerHTML={{ __html: row?.desc2 }} />
                    </Row>
                    <hr className='mb-0' />
                  </div>
                ))}
              </div>
            </>
          ))}
          {/* <div className='content' dangerouslySetInnerHTML={{ __html: certs?.desc }} /> */}
        </section>
      </Container>
    </main>
  );
};

export default Document;