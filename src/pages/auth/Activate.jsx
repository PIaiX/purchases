import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import Loader from "../../components/utils/Loader";
import { authActivate } from "../../services/auth";
import { Col, Row } from "react-bootstrap";

const Activate = () => {
  const [key, setKey] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onKey = useCallback((key) => {
    setLoading(true);
    authActivate(key)
      .then(() => {
        NotificationManager.success("Ваш аккаунт подтвержден");

        setLoading(false);
        dispatch(refreshAuth());
        navigate("/")
      })
      .catch((error) => {
        NotificationManager.error(
          typeof error?.response?.data?.error === "string"
            ? error.response.data.error
            : "Неизвестная ошибка"
        )
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader full />;
  }

  return (
    <main>
      <Meta title="Подтверждение почты" />
      <Container>
        <section className="sec-login mb-6">
          <h1 className="h2 text-center">
            Потверждение почты
          </h1>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} xl={5}>
              <div className="wrap">
                <div className="mini">
                  <p className='mb-3'>Введите код, отправленный на указанную электронную почту</p>
                  <Row className='g-3 g-md-4 justify-content-center'>
                    <Col md={4}>
                      <input className='code' type="number" placeholder='0000' value={key} onChange={(e) => { e.target.value.length < 5 && setKey(e.target.value) }} />

                    </Col>
                    <Col md={4}>
                      <button type='button' className='btn-1 h-100 w-100' disabled={!key || key?.length < 4 || loading} onClick={() => onKey(key)}>Отправить</button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </section>

      </Container>
    </main>
  );
};

export default Activate;
