import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../components/utils/Input';
import NavPagination from '../../components/NavPagination';
import AppealLine from '../../components/AppealLine';
import InputFileImg from '../../components/utils/InputFileImg';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { useForm, useWatch } from 'react-hook-form';
import Select from '../../components/utils/Select';
import Textarea from '../../components/utils/Textarea';
import { createTask, getTasks } from '../../services/task';
import Loader from '../../components/utils/Loader';
import { Col } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const Callback = () => {
  const [cbSection, setCbSection] = useState(1);
  const isSelected = (v) => (v === cbSection ? 'btn-2 active h-100 p-3 p-sm-4' : 'btn-2 h-100 p-3 p-sm-4')
  const [task, setTask] = useState({
    loading: true,
    items: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const { control,
    reset,
    register,
    setValue,
    handleSubmit, } = useForm({
      mode: "all",
      reValidateMode: "onSubmit",
      defaultValues: {
        type: "task",
        loading: false,
      },
    });

  const data = useWatch({ control });
  const getPage = () => {
    getTasks({ type: "task", page: currentPage, size: 10 })
      .then((res) => {
        setTask((prev) => ({
          ...prev,
          loading: false,
          ...res
        }));
      })
      .catch(() => setTask((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    getPage();
  }, [currentPage]);
  const onTask = useCallback(() => {
    if (!data.title) {
      return NotificationManager.error("Напишите тему");
    }
    if (!data.comment) {
      return NotificationManager.error("Поле сообщение не может быть пустым");
    }
    setValue("loading", true)

    createTask({ ...data })
      .then(() => {
        setCbSection(1);
        reset({ ...data, comment: "", title: "", file: null, loading: false })
        getPage();
        NotificationManager.success("Тикет отправлен");

      })
      .catch((err) => {
        reset({ ...data, loading: false })
        NotificationManager.error(
          err?.response?.data?.error ?? "Ошибка при отправке"
        );
      });
  }, [data]);
  if (task.loading) {
    return <Loader full />;
  }
  return (
    <section className='sec-callback mb-3 mb-sm-5'>
      <ReturnTitle link={'/account'} title={'Обратная связь'} />

      <ul className='list-unstyled d-flex justify-content-start mb-4 mb-sm-5'>
        <li>
          <button
            type='button'
            className={isSelected(1)}
            onClick={() => setCbSection(1)}
          >Мои обращения</button>
        </li>
        <li className='ms-3 ms-xxl-5'>
          <button
            type='button'
            className={isSelected(2)}
            onClick={() => setCbSection(2)}
          >Новое обращение</button>
        </li>
      </ul>

      {
        (cbSection === 1)
          ? task?.items?.length > 0 ?
            <div className="list-wrapping mb-4 mb-sm-5">
              <div className="list-wrapping-top">
                <ul className="line-appeal">
                  <li className="subject">Тема</li>
                  <li className="id">ID</li>
                  <li className="status">Статус</li>
                  <li className="date">Дата</li>
                  <li className="btns"></li>
                </ul>
              </div>
              <div className="list-wrapping-main p-sm-3">
                <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-1 g-3'>
                  {task?.items?.length > 0 && task.items.map((item) => (
                    <li>
                      <AppealLine {...item} />
                    </li>

                  ))}

                </ul>
              </div>
              <div className="list-wrapping-bottom">
                <NavPagination totalPages={task?.pagination?.totalPages} onPageChange={onPageChange} />
              </div>
            </div>
            :
            <div className="d-flex align-items-center justify-content-center mt-4">
              <h3>
                Нет обращений
              </h3>
            </div>
          : <div className="row">
            <div className="col-xxl-10">
              <div className="box">
                <form action="">
                  <div className="row g-4 g-md-5">
                    <Col md={6}>
                      <Select
                        value={data.title}
                        title="Выбрать тему"
                        label="Тема"
                        onClick={e => {
                          reset({
                            ...data,
                            title: e.value,
                            subTitle: null,
                          })
                        }}
                        data={[
                          { value: 1, title: "Проблема с платежной системой или выводом средств" },
                          { value: 2, title: "Покупатель не подтверждает сделку" },
                          { value: 3, title: "Возврат средств при отсутствии продавца" },
                          { value: 4, title: "Обращение для снятия ограничений на вывод средств" },
                          { value: 5, title: "Восстановление доступа к учетной записи" },
                          { value: 6, title: "Спорные ситуации / арбитраж" },
                          { value: 7, title: "Жалоба на пользователя" },
                          { value: 8, title: "Персональные данные" },
                          { value: 9, title: "Иные вопросы" },
                        ]}
                      />
                    </Col>
                    <Col md={6}>
                      <Select
                        value={data.subTitle}
                        title="Выбрать подтему"
                        label="Подтема"
                        onClick={e => setValue('subTitle', e.value)}
                        data={[
                          { value: 1, title: "Проблема с платежной системой или выводом средств" },
                          { value: 2, title: "Покупатель не подтверждает сделку" },
                          { value: 3, title: "Возврат средств при отсутствии продавца" },
                          { value: 4, title: "Обращение для снятия ограничений на вывод средств" },
                          { value: 5, title: "Восстановление доступа к учетной записи" },
                          { value: 6, title: "Спорные ситуации / арбитраж" },
                          { value: 7, title: "Жалоба на пользователя" },
                          { value: 8, title: "Персональные данные" },
                          { value: 9, title: "Иные вопросы" },
                        ]}
                      />
                    </Col>
                    <div className="col-md-12">
                      <Textarea
                        className="mb-3"
                        type={"text"}
                        label={"Обращение"}
                        placeholder={'Предоставьте как можно более подробную информацию, приложите необходимые скриншоты.'}
                        defaultValue={data.comment}
                        onChange={e => setValue("comment", e)}
                      />
                      <InputFileImg media={data?.file} setImage={(e) => setValue("file", Array.from(e)[0])} />
                    </div>
                  </div>
                  <button onClick={handleSubmit(onTask)} type='submit' className='btn-1 mt-4 mt-md-5' disabled={data?.loading}>Отправить</button>
                </form>
              </div>
            </div>
          </div>
      }
    </section>
  );
};

export default Callback;