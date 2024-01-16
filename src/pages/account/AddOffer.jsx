import React, { useCallback, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm, useWatch } from 'react-hook-form';
import { NotificationManager } from "react-notifications";
import { useParams } from 'react-router-dom';
import Input from '../../components/utils/Input';
import Loader from '../../components/utils/Loader';
import ReturnTitle from '../../components/utils/ReturnTitle';
import Select from '../../components/utils/Select';
import Textarea from '../../components/utils/Textarea';
import { getGames } from '../../services/game';
import { createUserProduct, editUserProduct, getUserProduct } from '../../services/product';

const AddOffer = () => {
  const { id } = useParams();
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
  const [sum, setSum] = useState(0);
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
    if (!data.param && data?.game?.params?.length > 0) {
      return NotificationManager.error(
        "Выберите объект продажи"
      )
    }
    if (data?.options && (!data?.option || data?.options?.filter((option) => option.parent === null).length > data?.option?.length)) {
      return NotificationManager.error(
        "Выберите характеристики продукта"
      )
    }
    if (!data.title) {
      return NotificationManager.error(
        "Введите название объявления"
      )
    }
    if (!data.count) {
      return setValue("count", 1)
    }
    if (!data.price) {
      return NotificationManager.error(
        "Введите цену объявления"
      )
    }
    if (!id) {
      createUserProduct({
        categoryId: data.category,
        region: data.region,
        server: data.server,
        param: data.param,
        option: data.option,
        title: data.title,
        desc: data.text,
        count: data.count,
        price: data.price
      })
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
    }
    else {
      editUserProduct({
        id: data.id,
        categoryId: data.category,
        region: data.region,
        server: data.server,
        param: data.param,
        option: data.option,
        title: data.title,
        desc: data.text,
        count: data.count,
        price: data.price
      })
        .then(() => {
          NotificationManager.success("Лот обновлён");
        })
        .catch(
          (err) =>
            err &&
            NotificationManager.error(
              err?.response?.data?.error ?? "Неизвестная ошибка при отправке"
            )
        );
    }
  }, [])

  useEffect(() => {
    getGames()
      .then((res) => {
        setGames(prev => ({ ...prev, items: res, loading: false }));
      })
      .catch(() => setGames((prev) => ({ ...prev, loading: false })));
  }, []);

  useEffect(() => {
    if (id) {
      getUserProduct({ id: id })
        .then((res) => {
          setValue('id', res.id);
          setValue('category', res.categoryId);
          setValue('game', res.category);
          setValue('region', res.regionId);
          setValue('servers', res.region.servers);
          setValue('server', res.serverId);
          setValue('param', res.paramId);
          setValue('options', res.param.options);
          for (let i = 0; i < res.options.length; i++) {
            setValue(`option[${i}]`, res.options[i].optionId);
          }
          setValue('title', res.title);
          setValue('text', res.desc);
          setValue('count', res.count);
          setValue('price', res.price);
        })

    }
  }, []);

  let i;

  useEffect(() => {
    if (data.region && sum > 1) {
      let serverIndex = data.game.regions.findIndex(e => e.id === data.region)
      let servers = data.game.regions[serverIndex].servers
      reset({
        ...data,
        server: false,
        servers: servers?.length > 0 ? servers : false
      })
    }
    setSum(sum + 1)

  }, [data.region]);

  useEffect(() => {
    if (data.param && sum > 1) {
      let optionsIndex = data.game.params.findIndex(e => e.id === data.param)
      let options = data.game.params[optionsIndex].options
      i = 0;
      reset({
        ...data,
        option: false,
        options: options?.length > 0 ? options : false
      })
    }
    setSum(sum + 1)

  }, [data.param]);
  if (games.loading) {
    return <Loader full />;
  }
  return (
    <section className='mb-3 mb-sm-5'>
      <div className='row'>
        <div className='col-12 col-xxl-11 col-xxxl-10'>
          {!id ?
            <ReturnTitle link={'/account/offers'} title={'Новое объявление'} />
            :
            <ReturnTitle link={'/account/offers'} title={'Изменение объявления'} />
          }
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
                    </Col>
                  )}



                  {data?.game?.regions?.length > 0 && (
                    <Col md={6} >
                      <Select
                        value={data.region}
                        title="Регион"
                        onClick={e => setValue('region', e.value)}
                        data={data.game.regions.map((item) => ({ value: item.id, title: item.title }))}
                      />
                    </Col>
                  )}

                  {data?.servers?.length > 0 && (
                    <Col md={6} >
                      <Select
                        value={data.server}
                        title="Сервер"
                        onClick={e => setValue('server', e.value)}
                        data={data.servers.map((item) => ({ value: item.id, title: item.title }))}
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
                        />
                      </Col>
                    }
                  })}

                  <Col md={12}>
                    <Input
                      type={"title"}
                      label={"Название"}
                      defaultValue={data.title}
                      onChange={e => setValue("title", e)}
                    />
                  </Col>
                  <Col md={12}>
                    <Textarea
                      type={"text"}
                      label={"Описание"}
                      defaultValue={data.text}
                      onChange={e => setValue("text", e)}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type={"text"}
                      label={"Наличие"}
                      defaultValue={data.count}
                      onChange={e => setValue("count", e)}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type={"text"}
                      label={"Цена, ₽ "}
                      defaultValue={data.price}
                      onChange={e => setValue("price", e)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {!id ?
              <button
                type='button'
                className='btn-1 mt-4 mt-sm-5'
                onClick={handleSubmit(onClick)}
              >Опубликовать</button>
              :
              <button
                type='button'
                className='btn-1 mt-4 mt-sm-5'
                onClick={handleSubmit(onClick)}
              >Сохранить изменения</button>
            }
          </form>
        </div>
      </div >
    </section >
  );
};

export default AddOffer;