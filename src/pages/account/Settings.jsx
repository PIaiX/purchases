import moment from "moment/moment";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useForm, useWatch } from "react-hook-form";
import { GoSignOut } from "react-icons/go";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/utils/Input";
import Loader from "../../components/utils/Loader";
import ReturnTitle from "../../components/utils/ReturnTitle";
import { editAccount, getSessions } from "../../services/account";
import { setUser } from "../../store/reducers/authSlice";
import { customPrice } from "../../helpers/all";
import Meta from "../../components/Meta";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const [sessions, setSessions] = useState({
    items: [],
    loading: true,
  });

  const dispatch = useDispatch();

  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const form = useWatch({ control });

  useLayoutEffect(() => {
    getSessions()
      .then((res) => res && setSessions({ items: res, loading: false }))
      .catch(() => setSessions((data) => ({ ...data, loading: false })));
  }, []);

  const onEditAccount = useCallback((data) => {
    editAccount(data)
      .then(() => {
        dispatch(setUser({ ...user, options: data?.options ?? {} }));
        NotificationManager.success("Данные успешно обновлены");
      })
      .catch((err) => {
        NotificationManager.error(
          err?.response?.data?.error ?? "Ошибка при сохранении"
        );
      });
  }, []);

  useEffect(() => {
    Object.keys(form).length > 0 && handleSubmit(onEditAccount(form));
  }, [form]);

  if (sessions?.loading) {
    return <Loader full />;
  }

  return (
    <section className="mb-6">
      <Meta title="Настройки" />
      <ReturnTitle link="/account" title="Настройки" />
      <div className="list-wrapping mb-4 mb-sm-5">
        <div className="list-wrapping-top p-0">
          <div className="settings-line fw-6">
            <div className="session fs-11">Сессия</div>
            <div className="system fs-11">Система</div>
            <div className="browser fs-11">Браузер</div>
            <div className="ip fs-11">IPv4-адрес</div>
            <div className="region fs-11">Регион</div>
            <div className="btns fs-11"></div>
          </div>
        </div>
        <div className="list-wrapping-main">
          <ul className="g-3 g-md-4 g-xl-0 row row-cols-sm-2 row-cols-xl-1">
            {sessions?.items?.length > 0 &&
              sessions?.items.map((item) => (
                <li>
                  <div className="settings-line">
                    <div className="session">
                      {moment(item.updatedAt).format("DD.MM.YYYY kk:mm")}
                    </div>
                    <div className="system">
                      {item.osName} {item.osVersion}
                    </div>
                    <div className="browser">{item.brand}</div>
                    <div className="ip">{item.ip}</div>
                    <div className="region">Казань</div>
                    <div className="btns">
                      <button type="button">
                        <GoSignOut />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Row>
        <Col sm={8} md={6} xxl={5}>
          <label htmlFor="" className="mb-3">
            <span>Получать уведомления на почту</span>
            <input
              type="checkbox"
              className="switch"
              defaultChecked={!!user?.options?.notificationEmail}
              {...register("options.notificationEmail")}
            />
          </label>
          <label htmlFor="">
            <span>Получать уведомления в Telegram</span>
            <input
              type="checkbox"
              className="switch"
              {...register("options.notificationTelergam")}
            />
          </label>
        </Col>
      </Row>

      <div className="d-xxl-flex align-items-end mt-5">
        <div className="text-center d-sm-flex align-items-center bg-blue white rounded-3 title-font py-2 px-3">
          <span className="fs-18">Доступно для резервирования</span>
          <div className="d-flex align-items-center justify-content-center">
            <span className="fs-18 ms-4">{customPrice(user?.cash)}</span>
          </div>
        </div>
        <div className="flex-1 d-sm-flex align-items-end ms-xxl-4 mt-4 mt-xxl-0">
          <Input
            className="flex-1"
            type="number"
            label="Зарезервировать на балансе"
            placeholder="Введите сумму"
          />
          <button className="w-xs-100 btn-1 mt-3 mt-sm-0 ms-sm-4">
            Зарезервировать
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
