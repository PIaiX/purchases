import React, { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useForm, useWatch } from "react-hook-form";
import { FiCheck, FiEdit, FiMessageCircle, FiShare } from "react-icons/fi";
import { TbHeartHandshake } from "react-icons/tb";
import { NotificationManager } from "react-notifications";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import Joystick from "../../components/svg/Joystick";
import Input from "../../components/utils/Input";
import ReturnTitle from "../../components/utils/ReturnTitle";
import StarRating from "../../components/utils/StarRating";
import Textarea from "../../components/utils/Textarea";
import { editAccount, editAvatar } from "../../services/account";
import { authEditPassword, authEditPhone } from "../../services/auth";
import { setUser } from "../../store/reducers/authSlice";
import { getImageURL } from "../../helpers/all";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    const textField = document.createElement('textarea');
    textField.innerText = `${process.env.REACT_APP_SITE_URL} /trader/${user.id}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCopied(true);
  };
  const handleClose = () => {
    setShowShare(false);
    setCopied(false); // Сбросить статус скопированного текста при закрытии модального окна
  };
  const [avatar, setAvatar] = useState(false);
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

  const onSubmit = useCallback(
    (data) => {
      editAccount(data)
        .then(() => {
          dispatch(setUser({ ...user, about: data.about }));

          if (data.email != user.email || !user.email) {
            navigate("email", { state: { email: data.email } });
          } else {
            NotificationManager.success("Данные успешно обновлены");
          }
        })
        .catch((err) => {
          NotificationManager.error(
            err?.response?.data?.error ?? "Ошибка при сохранении"
          );
        });
    },
    [user]
  );

  const onSubmitPhone = useCallback((data) => {
    if (data.phone == user.phone) {
      return NotificationManager.error(
        "Нельзя сменить номер телефона на существующий"
      );
    }
    authEditPhone(data)
      .then(() => {
        NotificationManager.success("Код отправлен на указанный номер");
        navigate("phone", { state: { phone: data.phone } });
      })
      .catch(
        (err) =>
          err &&
          NotificationManager.error(
            err?.response?.data?.error ?? "Ошибка при сохранении"
          )
      );
  }, []);

  const onSubmitPassword = useCallback((data) => {
    if (data.passwordNew != data.passwordConfirm) {
      return NotificationManager.error("Пароли не совпадают");
    }
    authEditPassword(data)
      .then(() => {
        NotificationManager.success("Пароль успешно обновлен");
      })
      .catch(
        (err) =>
          err &&
          NotificationManager.error(
            err?.response?.data?.error ?? "Ошибка при сохранении"
          )
      );
  }, []);

  const onUploadAvatar = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        editAvatar(formData)
          .then((res) => {
            NotificationManager.success("Аватар успешно изменен");
            res && dispatch(setUser({ ...user, media: res.media }));
          })
          .catch(
            (err) =>
              err &&
              NotificationManager.error(
                err?.response?.data?.error ?? "Ошибка при сохранении"
              )
          );
      }
    },
    [user]
  );
  return (
    <section className="sec-profile mb-6">
      <Meta title="Профиль" />
      <ReturnTitle link="/account" title="Профиль" />
      <div className="d-flex align-items-start mb-5">
        <div className="user flex-1">
          <div className="user-photo">
            <img
              src={
                avatar
                  ? avatar
                  : getImageURL({
                    path: user?.media,
                    size: "mini",
                    type: "user",
                  })
              }
              alt="userphoto"
            />
            <label htmlFor="input-file-upload">
              <input
                type="file"
                id="input-file-upload"
                className="d-none"
                name="file"
                onChange={(e) => onUploadAvatar(e)}
              />
              <FiEdit />
            </label>
          </div>
          <div className="user-main">
            <div className="title">{user?.nickname ?? "Никнейм"}</div>
            <div className="d-flex align-items-center">
              <StarRating value={user?.rating ?? 0} />
              <span className="fs-13 fw-7 ms-2">{user?.rating != null ? parseFloat(user?.rating).toFixed(1) : "0.0"}</span>
            </div>
            <p className="mt-2">
              {user?.createdAt ? moment(user.createdAt).fromNow(1) : ""} на платформе
            </p>
          </div>
          <ul className="user-info">
            <li>
              <div>
                <TbHeartHandshake className="svg" />
                <span>Сделок:</span>
              </div>
              <span>{user?.order ?? 0}</span>
            </li>
            <li>
              <div>
                <Joystick className="path" />
                <span>Лотов:</span>
              </div>
              <span>{user.product}</span>
            </li>
            <li>
              <div>
                <FiMessageCircle className="svg" />
                <span>Отзывов:</span>
              </div>
              <span>{user?.review ?? 0}</span>
            </li>
          </ul>
          <QRCode
            className="qr-code ms-3 ms-xl-5"
            size={100}
            value={`${process.env.REACT_APP_SITE_URL}/trader/${user.id}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <button
          type="button"
          onClick={() => setShowShare(true)}
          className="share-btn ms-2 ms-xl-4"
        >
          <FiShare />
        </button>
      </div>
      <h3 className="mb-3 mb-sm-4">Основное</h3>
      <Row className="g-3 gy-xl-4 mb-md-4">
        {/* <Col xs={6} xxl={6}>
          <Row className="g-3 gy-xl-4">
            <Col md={12} xl={12}>
              <Input
                type="text"
                label="Имя/Ник"
                name="nickname"
                errors={errors}
                defaultValue={form?.nickname}
                register={register}
              />
            </Col>
            <Col md={12} xl={12}>
              <Textarea
                label="О себе"
                name="about"
                errors={errors}
                defaultValue={form?.about}
                register={register}
              />
            </Col>
            <Col md={12} xl={12}>
              <Input
                type="email"
                label="Email"
                name="email"
                errors={errors}
                defaultValue={form?.email}
                register={register}
              />
            </Col>
            <Col md={12} xl={12}>
              <Button
                variant="primary"
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
                className="mb-4"
              >
                Сохранить изменения
              </Button>
            </Col>
          </Row>
        </Col> */}
        <Col xs={6} xxl={6}>
          <Row className="g-3 gy-xl-4">
            <Col md={12}>
              <Input
                autoComplete="new-password"
                mask="7(999)999-99-99"
                label="Номер телефона"
                name="phone"
                errors={errorsPhone}
                defaultValue={form?.phone}
                register={registerPhone}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            {!user?.phone ? (
              <>
                <Col md={12}>
                  <p className="rose fs-09 mt-1">
                    Только верифицированные пользовтаели могут публиковать
                    объявления на бирже Game.
                  </p>
                </Col>
                <Col md={12}>
                  <Button
                    variant="danger"
                    disabled={!isValidPhone}
                    onClick={handleSubmitPhone(onSubmitPhone)}
                  >
                    Пройти верификацию
                  </Button>
                </Col>
              </>
            ) : (
              <Col md={12}>
                <Button
                  variant="primary"
                  disabled={!isValidPhone}
                  onClick={handleSubmitPhone(onSubmitPhone)}
                >
                  Изменить номер телефона
                </Button>
              </Col>
            )}
          </Row>
        </Col>
        <Col md={12}>
          <h3 className="mb-3 mb-sm-4">Изменить пароль</h3>
          <Row className="g-4">
            <Col md={4}>
              <Input
                autoComplete="new-password"
                type="password"
                name="passwordOld"
                label="Старый пароль"
                errors={errorsPassword}
                register={registerPassword}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            <Col md={4}>
              <Input
                autoComplete="new-password"
                type="password"
                name="passwordNew"
                label="Новый пароль"
                errors={errorsPassword}
                register={registerPassword}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
            <Col md={4}>
              <Input
                autoComplete="new-password"
                type="password"
                name="passwordConfirm"
                errors={errorsPassword}
                label="Подтверждение пароля"
                register={registerPassword}
                validation={{ required: "Обязательное поле" }}
              />
            </Col>
          </Row>
          <Button
            variant="primary"
            disabled={!isValidPassword}
            onClick={handleSubmitPassword(onSubmitPassword)}
            className="mt-4"
          >
            Изменить пароль
          </Button>
        </Col>
      </Row>
      <Modal show={showShare} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="mb-3">Поделитесь профилем</h4>
          {copied ? (
            <div className="mb-3 text-success">
              <FiCheck /> Ссылка скопирована!
            </div>
          ) : (
            <div>
              <Input
                onClick={(e) => e.target.select()}
                readOnly
                defaultValue={`${process.env.REACT_APP_SITE_URL}/trader/${user.id}`}
              />
              <Button onClick={handleCopyLink} className="mt-3">Скопировать ссылку</Button>
            </div>
          )
          }
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Profile;
