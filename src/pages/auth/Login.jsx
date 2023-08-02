import React, { useCallback, useLayoutEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LabeledInput from "../../components/utils/LabeledInput";
import { login } from "../../services/auth";
import Meta from "../../components/Meta";
import { Button } from "react-bootstrap";

const Login = () => {
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (auth.isAuth) {
      return navigate("/");
    }
  }, [auth.isAuth]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "all", reValidateMode: "onSubmit" });

  const dispatch = useDispatch();

  const onSubmit = useCallback((data) => {
    dispatch(login(data));
  }, []);

  return (
    <main>
      <Meta title="Авторизация" />
      <Container>
        <section className="sec-login mb-6">
          <h1 className="h2 text-center">Авторизация</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} xl={5}>
              <div className="wrap">
                <form className="mini" onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-center mb-4 mb-sm-5">
                    Введите данные учётной записи
                  </p>
                  <div className="mb-4">
                    <LabeledInput
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="user@mail.com"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите email",
                        maxLength: {
                          value: 250,
                          message: "Максимально 250 символов",
                        },
                      }}
                    />
                  </div>

                  <LabeledInput
                    className="mb-2"
                    label="Пароль"
                    type="password"
                    name="password"
                    errors={errors}
                    placeholder="Введите пароль"
                    register={register}
                    validation={{
                      required: "Введите пароль",
                      minLength: {
                        value: 4,
                        message:
                          "Минимальный пароль должен состоять из 4-ех символов",
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!isValid}
                    className="mt-4 mx-auto"
                  >
                    Войти
                  </Button>
                </form>
                <Link
                  to="/registration"
                  className="mt-3 text-center link d-block"
                >
                  Регистрация
                </Link>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Login;