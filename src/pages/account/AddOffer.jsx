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
import { getGamesList, getUserGame } from '../../services/game';
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
  const [selectedValues, setSelectedValues] = useState({}); // Хранение выбранных значений


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
    if (!data.price || data.price == 0) {
      return NotificationManager.error(
        "Введите цену объявления"
      )
    }
    if (!data.count || data.count < 1) {
      return NotificationManager.error(
        "Введите количество товара"
      )
    }
    if (!data.notDesc && data.price < 1) {
      return NotificationManager.error(
        "Стоимость не ниже 1 рубля"
      )
    }
    if (data.notDesc && (!data?.price || !data?.minCount || data?.price * data?.minCount < 1)) {
      return NotificationManager.error(
        "Продаваемый обьем валюты должен стоит не менее 1 рубля"
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
        desc: data.desc,
        count: data.count,
        price: data.price,
        status: data.status,
        data: {
          minCount: data.minCount,
          typeCount: data.typeCount
        },
        protectedData: data.protectedData,

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
        desc: data.desc,
        count: data.count,
        price: data.price,
        status: data.status,
        data: {
          minCount: data.minCount,
          typeCount: data.typeCount
        },
        protectedData: data.protectedData,
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
    if (!id) {
      getGamesList()
        .then((res) => {
          setGames((prev) => ({
            ...prev,
            items: res,
            loading: false
          }));
        })
        .catch(() => setGames((prev) => ({ ...prev, loading: false })));
    }
    if (!id) {
      setSum(2)
    }
  }, []);
  useEffect(() => {
    if (data.categoryId && sum > 1) {
      getUserGame({ id: data.categoryId })
        .then((res) => {
          reset({
            text: data.text,
            count: data.count,
            price: data.price,
            categoryId: data.categoryId,
            game: res,
            region: res?.regions && res?.regions[0]?.status == 0 ? res?.regions[0]?.id : null,
          })
        })
        .catch(() => setGames((prev) => ({ ...prev, loading: false })));
    }
  }, [data.categoryId]);
  useEffect(() => {
    if (id) {
      getUserProduct({ id: id })
        .then((res) => {
          setGames((prev) => ({
            ...prev,
            items: res.categories,
            loading: false
          }));
          let id = res.product.id;
          let categoryId = res.product.categoryId;
          let game = res.category;
          let desc = res.product.desc;
          let count = res.product.count;
          let price = res.product.price;
          let status = res.product.status;
          let region;
          let servers;
          let server;
          let param = res.product.paramId;
          let minCount = res.product.data?.minCount;
          let typeCount = res.product.data?.typeCount;
          let one = res.product.param.data?.one;
          let auto = res.product.param.data?.auto;
          let protectedData;
          if (auto) {
            protectedData = res.product.protectedData
          }
          let currency = res.product.param.data?.currency;
          let serverView = res.product.param.data?.serverView;
          let options;
          let option = [];
          let sortOptions = res.product.options.sort((a, b) => a.optionId - b.optionId);
          if (res?.product?.regionId) {
            region = res.product.regionId
            if (!serverView) {
              let regionIndex = res?.category?.regions.findIndex((e) => e.id === region);
              if (res?.category?.regions[regionIndex]?.servers) {
                servers = res.category.regions[regionIndex].servers
                server = res.product.serverId
              }
            }
          }
          let paramIndex = res?.category?.params.findIndex((e) => e.id === param);
          if (res?.category?.params[paramIndex]?.options?.length > 0) {

            options = createTree(res.category.params[paramIndex].options, 'id', 'parent', null).sort((a, b) => a.id - b.id);
            for (let i = 0; i < sortOptions.length; i++) {
              option[i] = {
                id: sortOptions[i].optionId,
                value: sortOptions[i]?.value
              };

              if (!sortOptions[i]?.value) {
                let optionsIndex = res.category.params[paramIndex].options.findIndex((e) => e.id === option[i].id);
                let hug = res.category.params[paramIndex].options[optionsIndex].parent;
                let opt = {};
                while (hug) {
                  opt[hug] = res.category.params[paramIndex].options[optionsIndex].id;
                  optionsIndex = res.category.params[paramIndex].options.findIndex((e) => e.id === hug);
                  hug = res.category.params[paramIndex].options[optionsIndex].parent;
                }
                setSelectedValues((prevSelectedValues) => ({
                  ...prevSelectedValues,
                  [i]: opt
                }));
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
            auto: auto ? auto : null,
            serverView: serverView ? serverView : null,
            minCount: minCount ? minCount : null,
            typeCount: typeCount ? typeCount : null,
            options: options ? options : null,
            option: option ? option : null,
            protectedData: protectedData ? protectedData : null,
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


  const handleSelectChange = (nodeId, selectedValue, i) => {
    setSelectedValues((prevSelectedValues) => {
      let hug = {};

      if (prevSelectedValues && prevSelectedValues[i]) {
        hug = { ...prevSelectedValues[i] };
      }
      if (hug[nodeId]) {
        let del = hug[nodeId]
        while (hug[del]) {
          let uda = hug[del];
          delete hug[del];
          del = uda;
        }
      }
      hug[nodeId] = selectedValue;

      return {
        ...prevSelectedValues,
        [i]: hug
      };
    });


    setValue(`option[${i}].id`, selectedValue)
  };
  const createTree = (data, idProp, parentProp, parentId) =>
    data.filter((n) => parentId === (n[parentProp] ?? null))
      .map((n) => ({
        ...n,
        children: createTree(data, idProp, parentProp, n[idProp]),
      }));
  const renderSelects = (tree, i) => {
    if (tree.children && tree.children.length > 0) {
      return (
        <>
          <Col md={6}>
            <Select
              value={selectedValues && selectedValues[i] && selectedValues[i][tree.id]}
              title="Выбрать"
              label={tree?.title}
              onClick={(e) => handleSelectChange(tree.id, e.value, i)}
              data={tree?.children?.sort((a, b) => a.priority - b.priority).map((item) => ({
                value: item.id,
                title: item.title,
              }))}
            />
          </Col>
          {selectedValues && selectedValues[i] && selectedValues[i][tree.id] &&
            renderSelects(tree.children.find((child) => child.id === selectedValues[i][tree.id]), i)}
        </>
      );
    }
    return null;
  };
  useEffect(() => {
    if (data?.serverView) {


      reset({
        ...data,
        server: null,
        servers: null,
      });

    }
  }, [data?.serverView]);

  useEffect(() => {
    if (data.region && sum > 1) {
      let servers = null;
      if (!data?.serverView) {
        let serverIndex = data.game.regions.findIndex(
          (e) => e.id === data.region
        );
        servers = data.game.regions[serverIndex].servers;
      }
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
      let auto = data.game?.params[optionsIndex]?.data?.auto;
      let currency = data.game?.params[optionsIndex]?.data?.currency;
      let serverView = data.game?.params[optionsIndex]?.data?.serverView;
      let options = data?.game?.params[optionsIndex]?.options ? createTree(data?.game?.params[optionsIndex]?.options, 'id', 'parent', null).sort((a, b) => a.id - b.id) : null;
      reset({
        ...data,
        notDesc: currency ? currency : null,
        one: one ? one : null,
        auto: auto ? auto : null,
        serverView: serverView ? serverView : null,
        option: null,
        options: options?.length > 0 ? options : null,
      });
      setSelectedValues({});
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
                        title="Выбрать"
                        label="Игра"
                        onClick={(e) => { setValue("categoryId", e.value), setSum(2) }}
                        data={games.items.map((item) => ({
                          value: item.id,
                          title: item.title,
                        }))}
                      />
                    </Col>
                  )}



                  {data?.game?.regions?.length > 0 && data?.game?.regions[0].status != 0 && (
                    <Col md={6} >
                      <Select
                        value={data.region}
                        title="Выбрать"
                        label="Регион"
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
                        title="Выбрать"
                        label="Сервер"
                        onClick={e => setValue('server', e.value)}
                        data={data.servers.sort((a, b) => a.priority - b.priority).map((item) => ({ value: item.id, title: item.title }))}
                      />
                    </Col>
                  )}

                  {data?.game?.params?.length > 0 && (
                    <Col md={6} >
                      <Select
                        value={data.param}
                        title="Выбрать"
                        label="Что вы продаете?"
                        onClick={(e) => {
                          setValue("param", e.value)
                          setSum(2)
                        }}
                        data={data.game.params.map((item) => ({ value: item.id, title: item.title }))}
                      />
                    </Col>
                  )}

                  {data?.options && data?.options?.length > 0 &&
                    data.options.map((e, i) => {
                      return (
                        <>
                          {
                            e.data?.max ?
                              <>
                                <Col md={6} className="d-flex align-items-center">
                                  <Input
                                    type={"text"}
                                    label={e.title}
                                    defaultValue={data?.option && data?.option[i]?.value}
                                    onChange={(g) => { if (parseInt(g) >= e.data.min && parseInt(g) <= e.data.max || g == "") setValue(`option[${i}].id`, e.id), setValue(`option[${i}].value`, parseInt(g)) }}
                                  />
                                </Col>
                              </>
                              :
                              renderSelects(e, i)
                          }
                        </>
                      )
                    })
                  }

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