import React, { useCallback, useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/utils/Input";
import { login } from "../../services/auth";
import Meta from "../../components/Meta";
import { Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { toggleRememberMe } from "../../store/reducers/rememberMeSlice";

const Login = () => {
  const auth = useSelector((state) => state?.auth);
  const [captcha, setCaptcha] = useState(false);
  const navigate = useNavigate();

  const rememberMe = useSelector(state => state.rememberMe.value);
  const handleCheckboxChange = (e) => {
    dispatch(toggleRememberMe(e.target.checked));
  };
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
                    <Input
                      type="login"
                      label="Имя пользователя или Email"
                      name="login"
                      placeholder="Введите имя пользователя или email"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите имя пользователя или email",
                        maxLength: {
                          value: 250,
                          message: "Максимально 250 символов",
                        },
                      }}
                    />
                  </div>
                  <Input
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
                  <div className="mt-4 d-flex align-items-center justify-content-end">
                    {/* <label>
                      <input
                        type="checkbox"
                        className="checkbox me-3"
                        checked={rememberMe}
                        onChange={e => handleCheckboxChange(e)}
                      />
                      <span>Чужой компьютер</span>
                    </label> */}
                    <Link to="/password" className="fw-5">
                      Забыли пароль?
                    </Link>
                  </div>
                  <ReCAPTCHA
                    className="mt-4 d-flex justify-content-center w-100"
                    sitekey={process.env.REACT_APP_CAPTCHA}
                    onChange={(e) => setCaptcha(e)}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!isValid || !captcha}
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
