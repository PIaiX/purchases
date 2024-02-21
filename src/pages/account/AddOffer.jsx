import React, { useCallback, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm, useWatch } from 'react-hook-form';
import { NotificationManager } from "react-notifications";
import { useNavigate, useParams } from 'react-router-dom';
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
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      count: 1,
      status: 1,
    },
  });

  const data = useWatch({ control });
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    if (!data.categoryId) {
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
    if (data?.options && data?.options.length > 0 && (!data?.option || data?.options?.filter((option) => option.parent === null).length > data?.option?.length)) {
      return NotificationManager.error(
        "Выберите характеристики продукта"
      )
    }
    if (!data.price) {
      return NotificationManager.error(
        "Введите цену объявления"
      )
    }
    if (!id) {
      createUserProduct({
        id: data.id,
        categoryId: data.categoryId,
        region: data.region,
        server: data.server,
        param: data.param,
        option: data.option,
        title: data.title,
        desc: data.desc,
        count: data.count,
        price: data.price,
        status: data.status
      })
        .then(() => {
          NotificationManager.success("Лот создан");
          reset();
          navigate(-1);
        })
        .catch((error) =>
          NotificationManager.error(
            typeof error?.response?.data?.error == "string"
              ? error.response.data.error
              : "Неизвестная ошибка при отправке"
          )
        );
    }
    else {
      editUserProduct({
        id: data.id,
        categoryId: data.categoryId,
        region: data.region,
        server: data.server,
        param: data.param,
        option: data.option,
        title: data.title,
        desc: data.desc,
        count: data.count,
        price: data.price,
        status: data.status
      })
        .then(() => {
          NotificationManager.success("Лот обновлён");
          reset();
          navigate(-1);
        })
        .catch(
          (err) =>
            err &&
            NotificationManager.error(
              err?.response?.data?.error ?? "Неизвестная ошибка при отправке"
            )
        );
    }
  }, []);

  useEffect(() => {
    getGames()
      .then((res) => {
        setGames((prev) => ({
          ...prev,
          items: res.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();

            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;

          }),
          loading: false
        }));
      })
      .catch(() => setGames((prev) => ({ ...prev, loading: false })));
    if (!id) {
      setSum(2)
    }
  }, []);
  useEffect(() => {
    if (id) {
      getUserProduct({ id: id })
        .then((res) => {
          let id = res.id;
          let categoryId = res.categoryId;
          let game = res.category;
          let desc = res.desc;
          let count = res.count;
          let price = res.price;
          let status = res.status;
          let region;
          let servers;
          let server;
          let param = res.paramId;
          let one = res.param.data?.one;
          let currency = res.param.data?.currency;
          let options;
          let option = [];
          let optionId = [];
          let child = [];
          if (res?.regionId) {
            region = res.regionId
            if (res?.region?.servers) {
              servers = res.region.servers
              server = res.serverId
            }
          }
          if (res?.param?.options?.length > 0) {

            options = createTree(res.param.options, 'id', 'parent', null)
            for (let i = 0; i < res.options.length; i++) {
              option[i] = {
                id: res.options[i].optionId,
                value: res.options[i].value
              };
              let optionsIndex = options[i]?.children?.findIndex((e) => e.id === option[i].id);

              if (optionsIndex < 0) {
                let optionsInd = res.param.options.findIndex((e) => e.id === option[i].id);
                child[i] = res.param.options[optionsInd].id
                optionId[i] = res.param.options[optionsInd].parent
              }
              else {
                optionId[i] = options[i]?.children[optionsIndex].id
              }
            }

          }


          reset({
            id: id,
            categoryId: categoryId,
            game: game,
            region: region ? region : null,
            servers: servers ? servers : null,
            server: server ? server : null,
            param: param,
            notDesc: currency ? currency : null,
            one: one ? one : null,
            options: options ? options : null,
            option: option ? option : null,
            optionId: optionId ? optionId : null,
            child: child ? child : null,
            desc: desc,
            count: count,
            price: price,
            status: status,
          });
          setSum(1)
        })
        .catch((error) => {
          NotificationManager.error(
            typeof error?.response?.data?.error == "string"
              ? error.response.data.error
              : "Неизвестная ошибка при загрузки страницы"
          )
          setSum(1)
        }
        );

    }
  }, []);

  const createTree = (data, idProp, parentProp, parentId) =>
    data
      .filter((n) => parentId === (n[parentProp] ?? null))
      .map((n) => ({
        ...n,
        children: createTree(data, idProp, parentProp, n[idProp]),
      }));



  useEffect(() => {
    if (data.region && sum > 1) {

      let serverIndex = data.game.regions.findIndex(
        (e) => e.id === data.region
      );
      let servers = data.game.regions[serverIndex].servers;

      reset({
        ...data,
        server: null,
        servers: servers?.length > 0 ? servers : null,
      });
    }
  }, [data.region]);
  useEffect(() => {
    if (data.param && sum > 1) {
      let optionsIndex = data.game.params.findIndex((e) => e.id === data.param);
      let one = data.game?.params[optionsIndex]?.data?.one;
      let currency = data.game?.params[optionsIndex]?.data?.currency;
      let options = createTree(data.game.params[optionsIndex].options, 'id', 'parent', null);
      reset({
        ...data,
        notDesc: currency ? currency : null,
        one: one ? one : null,
        optionId: null,
        option: null,
        child: null,
        options: options?.length > 0 ? options : null,
      });
    }
  }, [data.param]);
  if (games.loading || id && sum == 0) {
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
                        value={data.categoryId}
                        title="Игра"
                        onClick={(e) => {
                          reset({
                            text: data.text,
                            count: data.count,
                            price: data.price,
                            categoryId: e.value,
                            game: games.items[
                              games.items.findIndex((e2) => e2.id === e.value)
                            ],
                            region: games.items[games.items.findIndex((e2) => e2.id === e.value)]?.regions && games.items[games.items.findIndex((e2) => e2.id === e.value)]?.regions[0]?.status == 0 ? games.items[games.items.findIndex((e2) => e2.id === e.value)]?.regions[0]?.id : null,
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
                        onClick={(e) => {
                          setSum(2)
                          setValue("region", e.value)
                        }}
                        data={data.game.regions.sort((a, b) => a.priority - b.priority).map((item) => ({ value: item.id, title: item.title }))}
                      />
                    </Col>
                  )}

                  {data?.servers?.length > 0 && (
                    <Col md={6} >
                      <Select
                        value={data.server}
                        title="Сервер"
                        onClick={e => setValue('server', e.value)}
                        data={data.servers.sort((a, b) => a.priority - b.priority).map((item) => ({ value: item.id, title: item.title }))}
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

                  {data?.options && data?.options?.length > 0 &&
                    data.options.map((e, i) => {
                      let optionIndex = data?.optionId?.length > 0 && e?.children.findIndex((child) => child.id == data?.optionId[i])
                      var option = []
                      if (optionIndex > -1) {
                        option = e?.children[optionIndex]
                      }
                      return (
                        <>
                          {e.data?.max ?
                            <>
                              <Col md={6} className="d-flex align-items-center">
                                <Input
                                  type={"text"}
                                  label={e.title}
                                  defaultValue={data?.option && data?.option[i]?.value}
                                  onChange={(g) => { setValue(`option[${i}].value`, g), setValue(`option[${i}].id`, e.id) }}
                                />
                              </Col>
                            </>
                            :
                            <>
                              <Col md={6}>
                                <Select
                                  value={data?.optionId && data?.optionId[i]}
                                  title={e.title}
                                  onClick={(e) => {
                                    setValue(`optionId[${i}]`, e.value)
                                    setValue("child", false)
                                    setValue(`option[${i}].id`, e.value)
                                  }}
                                  data={e?.children?.sort((a, b) => a.priority - b.priority).map((item) => ({
                                    value: item.id,
                                    title: item.title,
                                  }))}
                                />
                              </Col>
                              {option?.children?.length > 0 &&
                                <>
                                  <Col md={6}>
                                    <Select
                                      value={data?.child[i]}
                                      title={option.children[0].title}
                                      onClick={(e) => {
                                        setValue(`child[${i}]`, e.value)
                                        setValue(`option[${i}].id`, e.value)
                                      }}
                                      data={option.children.sort((a, b) => a.priority - b.priority).map((item) => ({
                                        value: item.id,
                                        title: item.title,
                                      }))}
                                    />
                                  </Col>
                                </>

                              }
                            </>
                          }
                        </>

                      )


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
                      defaultValue={data.desc}
                      onChange={e => setValue("desc", e)}
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
                onClick={handleSubmit(onSubmit)}
              >Опубликовать</button>
              :
              <button
                type='button'
                className='btn-1 mt-4 mt-sm-5'
                onClick={handleSubmit(onSubmit)}
              >Сохранить изменения</button>
            }
          </form>
        </div>
      </div >
    </section >
  );
};

export default AddOffer;