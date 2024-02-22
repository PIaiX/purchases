import React, { useCallback, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { Link, useLocation } from "react-router-dom";
import Input from "../../components/utils/Input";
import ReturnTitle from "../../components/utils/ReturnTitle";
import { authEditPhone } from "../../services/auth";
import { setUser } from "../../store/reducers/authSlice";
import { useSelector } from "react-redux";
import Meta from "../../components/Meta";

const PhoneVerification = () => {
  const { state } = useLocation();
  const { user } = useSelector((items) => items.auth);

  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const form = useWatch({ control });

  useEffect(() => {
    state && reset(state);
  }, [state]);

  const onSubmit = useCallback(
    (data) => {
      authEditPhone({ ...data, step: 2 })
        .then(() => {
          setValue("step", 3);
          setUser({ ...user, phone: data.phone });
          NotificationManager.success("Номер телефона успешно изменен");
        })
        .catch((err) => {
          NotificationManager.error(
            err?.response?.data?.error ?? "Ошибка при при смене номера телефона"
          );
        });
    },
    [form]
  );

  return (
    <section className="mb-3 mb-sm-5">
      <Meta title="Изменение номера телефона" />
      <ReturnTitle link="/account/trader" title="Изменение номера телефона" />
      <h2 className="d-none d-lg-block">Изменение номера телефона</h2>
      {form?.phone?.length > 0 ? (
        <>
          <Row
            className={
              "g-3 mb-3 " +
              (!form?.step || form?.step === 1 ? "d-flex" : "d-none")
            }
          >
            <Col md={8}>
              <Input
                className="code"
                mask="9999"
                placeholder="0000"
                name="key"
                minLength={4}
                maxLength={4}
                errors={errors}
                defaultValue={form?.key}
                register={register}
              />
            </Col>
            <Col md={4}>
              <Button
                variant="primary"
                onClick={handleSubmit(onSubmit)}
                className="h-100 w-100"
                disabled={!isValid}
              >
                Подтвердить
              </Button>
            </Col>
          </Row>
          {form?.step == 3 ? (
            <p>Номер телефона успешно изменен</p>
          ) : (
            <>
              {/* <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!form?.count || form?.count === 0 || form?.count > 1}
                className="mt-4 total-black"
              >
                Отправить код повторно
              </button> */}

              <Link to="/" className="d-block link-2 mt-3">
                Возникли проблемы?
              </Link>
            </>
          )}
        </>
      ) : (
        <p>Нет данных для отправки сообщения</p>
      )}
    </section>
  );
};

export default PhoneVerification;
