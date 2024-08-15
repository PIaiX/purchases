import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import Loader from "../../components/utils/Loader";
import { authActivate, authNewKeyActivate, checkAuth, logout, refreshAuth } from "../../services/auth";
import { Col, Row } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { Timer } from "../../helpers/all";
import { setUser } from "../../store/reducers/authSlice";

const Activate = () => {
  const [key, setKey] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [endTimer, setEndTimer] = useState(false);
  const status = useSelector((state) => state?.auth?.user?.status);
  const auth = useSelector((state) => state?.auth?.isAuth);
  useEffect(() => {
    if (!auth) {
      return navigate("/");
    }
  }, [auth]);
  useEffect(() => {
    if (status == 1) {
      // return navigate("/account");
    }
  }, [status]);
  const onKey = useCallback((key) => {
    setLoading(true);
    authActivate(key)
      .then(() => {
        checkAuth()
          .then((data) => {
            data && dispatch(setUser(data));
          })
          .catch(() => dispatch(logout()))
        NotificationManager.success("Ваш аккаунт подтвержден")
      })
      .catch((error) => {
        NotificationManager.error(
          typeof error?.response?.data?.error === "string"
            ? error.response.data.error
            : "Неизвестная ошибка"
        );
      })
      .finally(() => setLoading(false));
  }, []);
  const getKey = useCallback(() => {
    setEndTimer(false)
    authNewKeyActivate()
      .then(() => {
        NotificationManager.success("Код подтверждения отправлен повторно");

        setLoading(false);
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
                    <Col md={12}>
                      <input className='code' type="number" placeholder='0000' value={key} onChange={(e) => { e.target.value.length < 5 && setKey(e.target.value) }} />
                      {endTimer ? (
                        <p className="text-center pointer mt-2" onClick={() => getKey()}>
                          <u>Отправить повторно код подтверждения</u>
                        </p>
                      ) : (
                        <p className="text-center">
                          Повторить отправку кода через <Timer onEnd={() => setEndTimer(true)} /> сек
                        </p>
                      )}
                    </Col>
                    <Col md={12}>
                      <button type='button' className='btn-1 h-100 w-100' disabled={!key || key?.length < 4 || loading} onClick={() => onKey(key)}>Отправить</button>
                    </Col>
                    <Col md={12}>
                      <button type='button' className='btn-3 h-100 w-100' onClick={() => dispatch(logout())}>Выйти</button>
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
