import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from '../../components/utils/Input';
import ReturnTitle from '../../components/utils/ReturnTitle';
import Textarea from '../../components/utils/Textarea';
import { getGames } from '../../services/game';
import Select from '../../components/utils/Select';
import { useForm, useWatch } from 'react-hook-form';
import { useCallback } from 'react';
import { NotificationManager } from "react-notifications";
import { createUserProduct } from '../../services/product';
import Loader from '../../components/utils/Loader';

const AddOffer = () => {
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
  const [category, setCategory] = useState([]);
  const [regions, setRegions] = useState([]);
  const data = useWatch({ control })
  const onClick = useCallback((data) => {
    // if (!data.value || data.value <= 0) {
    //   return NotificationManager.error(
    //     "Укажите оценку"
    //   )
    // }
    createUserProduct({ category: data.category, region: data.region, server: data.server, param: data.param, option: data.option, text: data.text, count: data.count, price: data.price })
      .then(() => {
        NotificationManager.success("Лот создан");
      })
      .catch(
        (err) =>
          err &&
          NotificationManager.error(
            err?.response?.data?.error ?? "Неизвестная ошибка при отправке"
          )
      );
  }, [])

  useEffect(() => {
    getGames()
      .then((res) => {
        setGames(prev => ({ ...prev, items: res, loading: false }));
      })
      .catch(() => setGames((prev) => ({ ...prev, loading: false })));
  }, []);


  useEffect(() => {

    if (data.region) {
      let serverIndex = data.game.regions.findIndex(e => e.id === data.region)
      let servers = data.game.regions[serverIndex].servers

      reset({
        ...data,
        server: false,
        servers: servers?.length > 0 ? servers : false
      })
    }

  }, [data.region]);
  let i;
  useEffect(() => {
    if (data.param) {
      let optionsIndex = data.game.params.findIndex(e => e.id === data.param)
      let options = data.game.params[optionsIndex].options
      i = 0;
      reset({
        ...data,
        option: false,
        options: options?.length > 0 ? options : false
      })
    }

  }, [data.param]);

  if (games.loading) {
    return <Loader full />;
  }
  return (
    <section className='mb-3 mb-sm-5'>
      <div className='row'>
        <div className='col-12 col-xxl-11 col-xxxl-10'>
          <ReturnTitle link={'/account/offers'} title={'Новое объявление'} />

          <form action="" className='add-offer'>
            <Row>
              <Col xs={12} xl={10} xxl={9}>
                <Row className='g-4 g-xl-5'>
                  {games?.items?.length > 0 && (
                    <Col md={6}>
                      <Select
                        value={data.category}
                        title="Игра"
                        onClick={e => {
                          reset({
                            text: data.text,
                            count: data.count,
                            price: data.price,
                            category: e.value,
                            game: games.items[games.items.findIndex(e2 => e2.id === e.value)]
                          })
                        }}
                        // validation={{ required: "Обязательное поле" }}
                        data={games.items.map((item) => ({ value: item.id, title: item.title }))}
                      />
                    </Col>
                  )}



                  {data?.game?.regions?.length > 0 && (
                    <Col md={6} >
                      <Select
                        value={data.region}
                        title="Регион"
                        onClick={e => setValue('region', e.value)}
                        data={data.game.regions.map((item) => ({ value: item.id, title: item.title }))}
                      // validation={{ required: "Обязательное поле" }}
                      />
                    </Col>
                  )}

                  {data.servers && (
                    <Col md={6} >
                      <Select
                        value={data.server}
                        title="Сервер"
                        onClick={e => setValue('server', e.value)}
                        data={data.servers.map((item) => ({ value: item.id, title: item.title }))}
                      // validation={{ required: "Обязательное поле" }}
                      />
                    </Col>
                  )}

                  {data?.game?.params?.length > 0 && (
                    <Col md={6} >
                      <Select
                        value={data.param}
                        title="Что вы продаете?"
                        onClick={e => setValue('param', e.value)}
                        data={data.game.params.map((item) => ({ value: item.id, title: item.title }))}
                      // validation={{ required: "Обязательное поле" }}
                      />
                    </Col>
                  )}

                  {data.options && data.options.map((e, i) => {
                    let options = data.options.filter(item => (item.parent == e.id));
                    let name = data.options.find(item => (!item.parent && item.id == e.id));
                    if (!e.parent) {
                      return <Col md={6} >
                        <Select
                          value={data.option[i]}
                          title={name.title}
                          onClick={e => setValue(`option[${i}]`, e.value)}
                          data={options.map((item) => ({ value: item.id, title: item.title }))}
                        // validation={{ required: "Обязательное поле" }}
                        />
                      </Col>
                    }
                  })}


                  <Col md={12}>
                    <Textarea
                      type={"text"}
                      label={"Описание"}
                      onChange={e => setValue("text", e)}
                    // validation={{ required: "Обязательное поле" }}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type={"text"}
                      label={"Наличие"}
                      onChange={e => setValue("count", e)}
                    // validation={{ required: "Обязательное поле" }}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type={"text"}
                      label={"Цена, ₽ "}
                      onChange={e => setValue("price", e)}

                    // validation={{ required: "Обязательное поле" }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <button
              type='button'
              className='btn-1 mt-4 mt-sm-5'
              onClick={handleSubmit(onClick)}
            // disabled={!isValid}
            >Опубликовать</button>
          </form>
        </div>
      </div >
    </section >
  );
};

export default AddOffer;