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
import { NotificationManager } from "react-notifications";

const Registration = () => {
  const { isAuth } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isAuth) {
      return navigate("/");
    }
  }, [isAuth]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "all", reValidateMode: "onChange" });

  const onSubmit = useCallback((data) => {
    if (data.email) {
      let successDomain = [
        "5ballov.ru",
        "aeterna.ru",
        "aim.com",
        "algxmail.com",
        "ameritech.net",
        "aol.com",
        "att.net",
        "autorambler.ru",
        "bigmir.net",
        "bk.ru",
        "charter.net",
        "clear.net.nz",
        "cox.net",
        "email.it",
        "fastmail.com.au",
        "fastmail.fm",
        "flash.net",
        "fmgirl.com",
        "fotoplenka.ru",
        "free.fr",
        "fromru.com",
        "front.ru",
        "games.com",
        "gmail.com",
        "gmx.de",
        "gmx.net",
        "googlemail.com",
        "hotbox.ru",
        "hotmail.co.nz",
        "hotmail.com",
        "hotmail.ru",
        "hotpop.com",
        "imapmail.org",
        "inbox.ru",
        "interia.pl",
        "km.ru",
        "krovatka.su",
        "land.ru",
        "lenta.ru",
        "libero.it",
        "list.ru",
        "live.com",
        "love.com",
        "mail.ru",
        "mail15.com",
        "mail333.com",
        "megabox.ru",
        "memori.ru",
        "meta.ua",
        "msn.com",
        "myrambler.ru",
        "myrealbox.com",
        "naui.net",
        "newmail.ru",
        "nfmail.com",
        "nightmail.ru",
        "nl.rogers.com",
        "nm.ru",
        "nvbell.net",
        "nxt.ru",
        "o2.pl",
        "olympus.ru",
        "operamail.com",
        "orange.net",
        "pacbell.net",
        "photofile.ru",
        "pisem.net",
        "pochta.com",
        "pochta.ru",
        "pochtamt.ru",
        "pop3.ru",
        "post.ru",
        "pplmail.com",
        "premoweb.com",
        "prodigy.net",
        "qip.ru",
        "rambler.ru",
        "rbcmail.ru",
        "rikt.ru",
        "ro.ru",
        "rocketmail.com",
        "rogers.com",
        "sbcglobal.net",
        "seznam.cz",
        "sibnet.ru",
        "sky.com",
        "sky.ru",
        "skynet.be",
        "smtp.ru",
        "snet.net",
        "softhome.net",
        "startfree.com",
        "su29.ru",
        "swbell.net",
        "talktalk.net",
        "telenet.be",
        "telus.net",
        "tlen.pl",
        "ua.fm",
        "ukr.net",
        "unliminet.de",
        "verizon.net",
        "wans.net",
        "web.de",
        "wow.com",
        "wp.pl",
        "xtra.co.nz",
        "ya.ru",
        "yahoo.ca",
        "yahoo.co.id",
        "yahoo.co.in",
        "yahoo.co.kr",
        "yahoo.co.nz",
        "yahoo.co.th",
        "yahoo.co.uk",
        "yahoo.com",
        "yahoo.com.ar",
        "yahoo.com.au",
        "yahoo.com.br",
        "yahoo.com.cn",
        "yahoo.com.hk",
        "yahoo.com.mx",
        "yahoo.com.my",
        "yahoo.com.ph",
        "yahoo.com.sg",
        "yahoo.com.tw",
        "yahoo.com.vn",
        "yahoo.de",
        "yahoo.dk",
        "yahoo.es",
        "yahoo.fr",
        "yahoo.ie",
        "yahoo.it",
        "yahoo.no",
        "yahoo.pl",
        "yahoo.se",
        "yahoomail.com",
        "yandex.ru",
        "ymail.com",
        "zebra.lt",
        "ziza.ru",
      ];
      let domain = data.email.split("@")[1];
      if (!domain || !successDomain.includes(domain)) {
        NotificationManager.error(
          "Разрешены только популярные почтовые сервисы"
        );
        return false;
      }
    }

    authRegister(data)
      .then(() => {
        NotificationManager.success("Завершите регистрацию, подтвердив почту");
        navigate("/");
      })
      .catch(
        (err) =>
          err &&
          NotificationManager.error(
            err?.response?.data?.error ?? "Неизвестная ошибка при регистрации"
          )
      );
  }, []);

  return (
    <main>
      <Meta title="Регистрация" />
      <Container>
        <section className="sec-login mb-6">
          <h1 className="h2 text-center">Регистрация</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} xl={5}>
              <div className="wrap">
                <form className="midi" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <Input
                      autoFocus
                      type="text"
                      label="Имя пользователя"
                      placeholder="Введите имя пользователя"
                      name="nickname"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите имя пользователя",
                        minLength: {
                          value: 3,
                          message: "Минимально 3 символа",
                        },
                        maxLength: {
                          value: 250,
                          message: "Максимально 250 символов",
                        },
                        pattern: {
                          value: /^[a-z0-9_]+$/,
                          message: "Неверный формат никнейма (Только a-z0-9_)",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Введите Email"
                      name="email"
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Введите Email",
                        minLength: {
                          value: 3,
                          message: "Минимально 3 символа",
                        },
                        maxLength: {
                          value: 250,
                          message: "Максимально 250 символов",
                        },
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Неверный формат Email",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-4">
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
                          value: 6,
                          message: "Минимальное кол-во символов 6",
                        },
                        maxLength: {
                          value: 250,
                          message: "Максимальное кол-во символов 250",
                        },
                        pattern: {
                          value: /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{6,}/g,
                          message:
                            "Пароль должен содержать не менее 6 символов латинского алфавита и цифры",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-4">
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
                          value: 6,
                          message: "Минимальное кол-во символов 6",
                        },
                        maxLength: {
                          value: 250,
                          message: "Максимальное кол-во символов 250",
                        },
                        pattern: {
                          value: /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{6,}/g,
                          message:
                            "Пароль должен содержать не менее 6 символов латинского алфавита и цифры",
                        },
                      }}
                    />
                  </div>
                  <label className="pale-blue mb-3">
                    <input
                      type="checkbox"
                      className="checkbox me-3"
                      {...register("accept", {
                        required:
                          "Примите условия пользовательского соглашения",
                      })}
                    />
                    <span className="fs-09">
                      Принять условия Пользовательского соглашения
                    </span>
                  </label>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                    className="mt-4 mx-auto"
                  >
                    Зарегистрироваться
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Registration;
