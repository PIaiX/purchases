import React, { useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LabeledInput from "../../components/utils/LabeledInput";
import StarRating from "../../components/utils/StarRating";
import Joystick from "../../components/svg/Joystick";
import { TbHeartHandshake } from "react-icons/tb";
import { FiMessageCircle, FiEdit, FiShare } from "react-icons/fi";
import { Link } from "react-router-dom";
import ReturnTitle from "../../components/utils/ReturnTitle";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { useForm, useWatch } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import Meta from "../../components/Meta";
import { Button } from "react-bootstrap";
import { editAccount } from "../../services/account";
import { authActivatePhone, authEditPassword } from "../../services/auth";

const Profile = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: user,
  });

  const {
    register: registerPassword,
    formState: { errors: errorsPassword, isValid: isValidPassword },
    handleSubmit: handleSubmitPassword,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const {
    register: registerPhone,
    formState: { errors: errorsPhone, isValid: isValidPhone },
    handleSubmit: handleSubmitPhone,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const form = useWatch({ control });

  const onSubmit = useCallback((data) => {
    setLoading(true);
    editAccount(data)
      .then(() => {
        dispatch(setUser(data));
        NotificationManager.success("Данные успешно обновлены");
      })
      .catch((err) => err && NotificationManager.error("Ошибка при сохранении"))
      .finally(() => setLoading(false));
  }, []);

  const onSubmitPhone = useCallback((data) => {
    setLoading(true);
    authActivatePhone(data)
      .then(() => {
        NotificationManager.success("Данные успешно обновлены");
      })
      .catch((err) => err && NotificationManager.error("Ошибка при сохранении"))
      .finally(() => setLoading(false));
  }, []);

  const onSubmitPassword = useCallback((data) => {
    setLoading(true);
    authEditPassword(data)
      .then(() => {
        NotificationManager.success("Данные успешно обновлены");
      })
      .catch((err) => err && NotificationManager.error("Ошибка при сохранении"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="sec-profile mb-6">
      <Meta title="Профиль" />
      <ReturnTitle link={"/account"} title={"Профиль"} />
      <div className="d-flex align-items-start mb-5">
        <div className="user flex-1">
          <div className="user-photo">
            <img src="/imgs/user2.jpg" alt="userphoto" />
            <button type="button">
              <FiEdit />
            </button>
          </div>
          <div className="user-main">
            <div className="title">{user?.firstName ?? "Никнейм"}</div>
            <div className="d-flex align-items-center">
              <StarRating rate={5} />
              <span className="fs-13 fw-7 ms-2">5</span>
            </div>
            <p className="mt-2">{user?.about ?? "Напишите о себе"}</p>
          </div>
          <ul className="user-info">
            <li>
              <div>
                <TbHeartHandshake className="svg" />
                <span>Сделок:</span>
              </div>
              <span>0</span>
            </li>
            <li>
              <div>
                <Joystick className="path" />
                <span>Лотов:</span>
              </div>
              <span>0</span>
            </li>
            <li>
              <div>
                <FiMessageCircle className="svg" />
                <span>Отзывов:</span>
              </div>
              <span>0</span>
            </li>
          </ul>
          <QRCode
            className="qr-code ms-3 ms-xl-5"
            size={100}
            value={`http://rush-2play.online/account/${user.id}`}
            viewBox={`0 0 256 256`}
          />
        </div>

        <button type="button" className="share-btn ms-2 ms-xl-4">
          <FiShare />
        </button>
      </div>
      <Row className="mb-md-4">
        <Col xs={12} xxl={10}>
          <h3 className="mb-3 mb-sm-4">Основное</h3>
          <Row className="g-3 gy-xl-4">
            <Col md={6} xl={4}>
              <LabeledInput
                type="text"
                label="Имя/Ник"
                name="firstName"
                errors={errors}
                defaultValue={form?.firstName}
                register={register}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            <Col md={6} xl={4}>
              <LabeledInput
                type="email"
                label="Email"
                name="email"
                errors={errors}
                defaultValue={form?.email}
                register={register}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            <Col md={6} xl={4}>
              <Button
                type="submit"
                variant="primary"
                disabled={!isValid}
                onSubmit={handleSubmit(onSubmit)}
                className="btn-1 mb-4"
              >
                Сохранить изменения
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-3 gy-xl-4">
        <Col md={6}>
          <LabeledInput
            type="tel"
            label="Номер телефона"
            name="phone"
            errors={errorsPhone}
            defaultValue={form?.phone}
            register={registerPhone}
            validation={{ required: "Обязательное поле" }}
          />
        </Col>
        <Col md={6}>
          <p className="rose fs-09">
            Только верифицированные пользовтаели могут публиковать объявления на
            бирже Game.
          </p>
        </Col>
        <Col md={6}>
          <Button
            variant="primary"
            disabled={!isValidPhone}
            onSubmit={handleSubmitPhone(onSubmitPhone)}
            className="btn-3 mb-4"
          >
            Пройти верификацию
          </Button>
        </Col>
        <Col xs={12} xxl={10}>
          <h3 className="mb-3 mb-sm-4">Изменить пароль</h3>
          <Row xs={1} md={2} xl={3} className="g-4">
            <Col>
              <LabeledInput
                type="password"
                name="lastPassword"
                label="Старый пароль"
                errors={errorsPassword}
                register={registerPassword}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            <Col>
              <LabeledInput
                type="password"
                name="newPassword"
                label="Новый пароль"
                errors={errorsPassword}
                register={registerPassword}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            <Col>
              <LabeledInput
                type="password"
                name="confirmNewPassword"
                errors={errorsPassword}
                label="Подтверждение пароля"
                register={registerPassword}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
          </Row>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValidPassword}
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="btn-1 mt-4"
          >
            Изменить
          </Button>
        </Col>
      </Row>
    </section>
  );
};

export default Profile;
