import React, { useCallback, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { Link, useLocation } from "react-router-dom";
import Input from "../../components/utils/Input";
import ReturnTitle from "../../components/utils/ReturnTitle";
import { authEditEmail } from "../../services/auth";

const EmailVerification = () => {
  const { state } = useLocation();

  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const form = useWatch({ control });

  useEffect(() => state && reset(state), [state]);

  const onSubmit = useCallback(
    (data) => {
      authEditEmail(data)
        .then(() => {
          setValue("count", form?.count ? form.count + 1 : 1);
          NotificationManager.success("Письмо отправлено на указанную почту");
        })
        .catch((err) => {
          NotificationManager.error(
            err?.response?.data?.error ?? "Ошибка при отправке"
          );
        });
    },
    [form]
  );

  return (
    <section className="mb-3 mb-sm-5">
      <ReturnTitle
        link="/account/profile"
        title="Изменение электронной почты"
      />
      <h2 className="d-none d-lg-block">Изменение электронной почты</h2>
      {form?.email?.length > 0 ? (
        <>
          <Row className="g-3 mb-3">
            <Col md={8}>
              <Input
                type="email"
                label="Email"
                name="email"
                errors={errors}
                defaultValue={form?.email}
                register={register}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            <Col md={4}>
              <Button
                variant="primary"
                onClick={() => handleSubmit(onSubmit)}
                className="h-100 w-100"
                disabled={!isValid || form?.count > 0}
              >
                Подтвердить
              </Button>
            </Col>
          </Row>

          <button
            type="button"
            onClick={() => handleSubmit(onSubmit)}
            disabled={!form?.count || form?.count === 0 || form?.count > 1}
            className="mt-4 total-black"
          >
            Отправить письмо повторно
          </button>

          <Link to="/" className="d-block link-2 mt-3">
            Возникли проблемы?
          </Link>
        </>
      ) : (
        <p>Нет данных для отправки письма</p>
      )}
    </section>
  );
};

export default EmailVerification;
