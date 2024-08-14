import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PasswordForm from "../../components/forms/PasswordForm";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { authPasswordRecovery } from "../../services/auth";
import { NotificationManager } from "react-notifications";

const Recovery = () => {
  const navigate = useNavigate()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    reset,
    register,
  } = useForm({
    mode: "all", reValidateMode: "onSubmit", defaultValues: {
      step: 1,
    },
  });
  const [endTimer, setEndTimer] = useState(false);

  const data = useWatch({ control });


  const onSubmit = useCallback((data) => {
    authPasswordRecovery(data)
      .then(() => {
        if (data.step == 1 || data.step == 3) {
          NotificationManager.success(
            data.step == 1
              ? "Код подтверждения отправлен"
              : data.step == 3 && "Пароль успешно изменен"
          );
          if (data.step == 3) {
            navigate("/login/")
          }
        }
        reset({ ...data, step: data.step + 1 });
      })
      .catch((error) => {
        NotificationManager.error(
          typeof error?.response?.data?.error === "string"
            ? error.response.data.error
            : "Неизвестная ошибка"
        )
      });
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
  return (
    <main>
      <Container>
        <section className="sec-password mb-6">
          <h1 className="h2 text-center">Восстановление пароля</h1>
          <Row className="justify-content-center">
            <Col xs={12} xl={5}>
              <div className="wrap">
                <PasswordForm getKey={getKey} endTimer={endTimer} setEndTimer={setEndTimer} data={data} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} isValid={isValid} setValue={setValue} />
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default Recovery;
