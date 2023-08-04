import React, { useCallback, useLayoutEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import Input from "../../components/utils/Input";
import { authRegister } from "../../services/auth";
import { useForm } from "react-hook-form";

const Registration = () => {
  const { isAuth } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    if (isAuth) {
      return navigate("/");
    }
  }, [isAuth]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "all", reValidateMode: "onSubmit" });

  const onSubmit = useCallback(
    (data) => {
      authRegister(data);
      setShow(!show);
    },
    [show]
  );

  return (
    <main>
      <Meta title="Регистрация" />
      <Container>
        <section className=" mb-6">
          <h1 className="h2 text-center">Регистрация</h1>
          <Row className="d-flex justify-content-center">
            <Col xs={12} xl={6}>
              <form className="midi" onSubmit={handleSubmit(onSubmit)}>
                <Row className="g-4">
                  <Col md={12}>
                    <Input
                      autoFocus
                      type="text"
                      label="Имя/Ник"
                      placeholder="Имя"
                      name="firstName"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите имя",
                        maxLength: {
                          value: 100,
                          message: "Максимально 100 символов",
                        },
                      }}
                    />
                  </Col>
                  <Col md={12}>
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Введите Email"
                      name="email"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите Email",
                        maxLength: {
                          value: 250,
                          message: "Максимально 250 символов",
                        },
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      type="password"
                      label="Пароль"
                      placeholder="Придумайте пароль"
                      name="password"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите пароль",
                        minLength: {
                          value: 4,
                          message:
                            "Минимальный пароль должен состоять из 4-х символов",
                        },
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      type="password"
                      label="Подтверждение пароля"
                      placeholder="Повторите пароль"
                      name="passwordConfirm"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите повторный пароль",
                        minLength: {
                          value: 4,
                          message:
                            "Минимальный пароль должен состоять из 4-х символов",
                        },
                      }}
                    />
                  </Col>
                </Row>
                <p className="mt-2 text-muted fs-09">
                  Пароль должен содержать не менее 6 символов, и среди них
                  должны быть заглавные и строчные буквы, цифры, специальные
                  символы (т. е. *, %, &,!)
                </p>

                <p className="pale-blue mt-3">
                  Нажимая на кнопку “Зарегистрироваться”, вы принимаете условия
                  Пользовательского соглашения и соглашаетесь с Политикой
                  конфиденциальности
                </p>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValid}
                  className="mt-4"
                >
                  Зарегистрироваться
                </Button>
              </form>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Registration;
