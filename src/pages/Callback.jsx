import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import Loader from '../components/utils/Loader';
import Select from '../components/utils/Select';
import Textarea from '../components/utils/Textarea';
import { titles } from '../helpers/titles';
import { createTask, createTaskEmail, getTasks } from '../services/task';
import InputFileImg from '../components/utils/InputFileImg';
import Input from '../components/utils/Input';

const Callback = () => {
  const [task, setTask] = useState({
    loading: true,
    items: [],
  });

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

  const onTask = useCallback(() => {
    if (!data.email) {
      return NotificationManager.error("Заполните Email");
    }
    if (!data.title) {
      return NotificationManager.error("Выберите тему");
    }
    if (!data.comment) {
      return NotificationManager.error("Поле сообщение не может быть пустым");
    }
    setValue("loading", true)

    createTaskEmail({ ...data })
      .then(() => {
        reset({ ...data, comment: "", title: "", file: null, loading: false })
        NotificationManager.success("Тикет отправлен");

      })
      .catch((err) => {
        NotificationManager.error(
          err?.response?.data?.error ?? "Ошибка при отправке"
        );
      });
  }, [data]);

  return (
    <Container>
      <main>
        <div className='callback'>
          <div className="box">
            <div className='new-callback'>
              <form action="">
                <div className="row g-4 g-md-5">
                  <Col md={12}>
                    <Input
                      value={data.email}
                      title="Введите email"
                      label="Email"
                      defaultValue={data.email}
                      onChange={e => setValue("email", e)}
                      On
                    />
                  </Col>
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
                      data={titles}
                    />
                  </Col>
                  <Col md={6}>
                    <Select
                      value={data.subTitle}
                      title="Выбрать подтему"
                      label="Подтема"
                      onClick={e => setValue('subTitle', e.value)}
                      data={titles}
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
      </main >
    </Container >
  );
};

export default Callback;