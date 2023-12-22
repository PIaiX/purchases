import React, { useCallback, useState } from 'react';
import Input from '../../components/utils/Input';
import NavPagination from '../../components/NavPagination';
import AppealLine from '../../components/AppealLine';
import InputFileImg from '../../components/utils/InputFileImg';
import ReturnTitle from '../../components/utils/ReturnTitle';
import { useForm, useWatch } from 'react-hook-form';
import Select from '../../components/utils/Select';
import Textarea from '../../components/utils/Textarea';

const Callback = () => {
  const [cbSection, setCbSection] = useState(1);
  const isSelected = (v) => (v === cbSection ? 'btn-2 active h-100 p-3 p-sm-4' : 'btn-2 h-100 p-3 p-sm-4')
  const [games, setGames] = useState({ items: [], loading: true });
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: "onSubmit",
  });
  const data = useWatch({ control })
  const onClick = useCallback((data) => {
    if (!data.category) {
      return NotificationManager.error(
        "Выберите игру"
      )
    }
    if (!data.region && data?.game?.regions?.length > 0) {
      return NotificationManager.error(
        "Выберите регион"
      )
    }
    if (!data.server && data?.servers?.length > 0) {
      return NotificationManager.error(
        "Выберите сервер"
      )
    }
  })
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
          ? <div className="list-wrapping mb-4 mb-sm-5">
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
                <li>
                  <AppealLine id={'15296'} />
                </li>
                <li>
                  <AppealLine id={'15296'} />
                </li>
                <li>
                  <AppealLine id={'15296'} />
                </li>
                <li>
                  <AppealLine id={'15296'} />
                </li>
              </ul>
            </div>
            <div className="list-wrapping-bottom">
              <NavPagination />
            </div>
          </div>
          : <div className="row">
            <div className="col-xxl-10">
              <div className="box">
                <form action="">
                  <div className="row g-4 g-md-5">
                    <div className="col-md-6">
                      <Select
                        value={data.category}
                        title="Тема"
                        onClick={e => {
                          reset({
                            title: data.title,
                            text: data.text,
                            count: data.count,
                            price: data.price,
                            category: e.value,
                            game: games.items[games.items.findIndex(e2 => e2.id === e.value)]
                          })
                        }}
                        data={games.items.map((item) => ({ value: item.id, title: item.title }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <Select
                        value={data.region}
                        title="Подтема"
                        onClick={e => setValue('region', e.value)}
                        data={data?.game?.regions?.map((item) => ({ value: item.id, title: item.title }))}
                      />
                    </div>
                    <div className="col-md-12">
                      <Textarea
                        className="mb-3"
                        type={"text"}
                        label={"Обращение"}
                        placeholder={'Предоставьте как можно более подробную информацию, приложите необходимые скриншоты.'}
                        defaultValue={data.text}
                        onChange={e => setValue("text", e)}
                      />
                      <InputFileImg />
                    </div>
                  </div>
                  <button onClick={handleSubmit(onClick)} type='submit' className='btn-1 mt-4 mt-md-5'>Отправить</button>
                </form>
              </div>
            </div>
          </div>
      }
    </section>
  );
};

export default Callback;