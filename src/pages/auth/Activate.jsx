import React, { useLayoutEffect } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";

const Activate = () => {
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (auth.isAuth) {
      return navigate("/");
    }
  }, [auth.isAuth]);

  return (
    <main>
      <Meta title="Авторизация" />
      <Container>
        <section className="sec-login mb-6">
          <h1 className="h2 text-center">Вы успешно подтвердили почту</h1>
          <Link to="/account" className="btn btn-primary">Перейти в профиль</Link>
        </section>
      </Container>
    </main>
  );
};

export default Activate;
