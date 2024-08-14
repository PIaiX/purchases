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
import { createUserProduct, deleteUserProduct, editUserProduct, getUserProduct } from '../../services/product';
import { removeDescendants } from '../../helpers/all';

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
    if (!data.title) {
      return NotificationManager.error(
        "Введите название"
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
        title: data.title,
        desc: data.desc,
        count: data.count,
        price: data.price,
        status: 1,
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
        title: data.title,
        desc: data.desc,
        count: data.count,
        price: data.price,
        status: 1,
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
  const onEdit = useCallback((data) => {
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
      status: 0,
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

  }, []);
  const onDelete = useCallback((data) => {
    deleteUserProduct({
      id: data.id
    })
      .then(() => {
        NotificationManager.success("Лот удален");
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

            option = res.product.options.map(opt => ({
              ...opt.option,
              children: createTree(res.category.params[paramIndex].options, 'id', 'parent', opt.option.id).sort((a, b) => a.id - b.id),
              value: opt?.value
            }));


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

  const createTree = (data, idProp, parentProp, parentId) =>
    data.filter((n) => parentId === (n[parentProp] ?? null))
      .map((n) => ({
        ...n,
        children: createTree(data, idProp, parentProp, n[idProp]),
      }));


  const onSaveOption = (option) => {
    setValue('option', removeDescendants(data, option));
  };



  const maxOption = (tree) => {
    return (
      <Col md={6} className="d-flex align-items-center">
        <Input
          type="number"
          placeholder={'0'}
          max={tree?.data?.max}
          min={tree?.data?.min}
          label={tree.title}
          value={parseInt(data?.option?.find(e => e.id == tree.id)?.value)}
          onChange={(g) => {
            if (parseInt(g) >= tree?.data?.min && parseInt(g) <= tree?.data?.max || g == "") onSaveOption({ ...tree, value: parseInt(g) })
          }}
        />
      </Col>
    );
  };
  const renderSelects = (tree) => {
    if (tree?.children && tree?.children.length > 0) {
      if (tree?.children[0].data?.max) {
        return tree.children.map(child =>
          maxOption(child)
        );
      }
      else {
        return (
          <>
            <Col md={6}>
              <Select
                value={data.option && data.option.find(e => e.parent == tree.id) && data.option.find(e => e.parent == tree.id).id}
                title="Выбрать"
                label={tree?.title}
                onClick={(e) => onSaveOption(e.data)}
                data={tree?.children?.sort((a, b) => a.priority - b.priority).map((item) => ({ value: item.id, data: item, title: item.title }))}
              />
            </Col>
            {data.option && data.option.find(e => e.parent == tree.id) &&
              renderSelects(data.option.find(e => e.parent == tree.id))
            }
          </>
        );
      }
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
                    data.options.map((e) => {
                      return (
                        <>
                          {e.data?.max ?
                            maxOption(e)
                            :
                            renderSelects(e)
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
                  {!data?.notDesc &&
                    <Col md={12}>
                      <Textarea
                        type={"text"}
                        label={"Описание"}
                        defaultValue={data.desc}
                        onChange={e => setValue("desc", e)}
                      />
                    </Col>
                  }
                  {!data?.one && data?.notDesc &&
                    <Col md={4}>
                      <Input
                        label={"Наличие"}
                        type={"number"}
                        value={data.count}
                        onChange={(e) => {
                          if (/^\d*$/.test(e)) {
                            setValue("count", e)
                          }
                        }}
                      />
                    </Col>
                  }
                  {data?.notDesc &&
                    <Col md={4}>
                      <Select
                        label={"Единица измерения"}
                        type={"number"}
                        value={data.typeCount}
                        onClick={(e) => setValue("typeCount", e.value)}
                        data={[
                          { value: "шт", title: "шт" },
                          { value: "кк", title: "кк" },
                          { value: "к", title: "к" }
                        ]}
                      />
                    </Col>
                  }
                  <Col md={4}>
                    <Input
                      label={"Цена, ₽ "}
                      type="number"
                      value={data.price}
                      onChange={(e) => {
                        const value = e;
                        let isValid;
                        if (value >= 1) { isValid = /^\d+(\.\d{0,2})?$/.test(value); }
                        else { isValid = /^\d+(\.\d{0,4})?$/.test(value); }
                        if (isValid || !value) {
                          setValue("price", value);
                        }
                      }}
                    />
                  </Col>
                  {data?.notDesc &&
                    <Col md={4}>
                      <Input
                        label={"Минимальный обьем покупки"}
                        type={"number"}
                        value={data.minCount}
                        onChange={(e) => {
                          if (/^\d*$/.test(e)) {
                            setValue("minCount", e)
                          }

                        }}
                      />
                    </Col>
                  }
                  {!data?.one && !data?.notDesc &&
                    <Col md={4}>
                      <Input
                        label={"Наличие"}
                        type={"number"}
                        value={data.count}
                        onChange={(e) => {
                          if (/^\d*$/.test(e)) {
                            setValue("count", e)
                          }
                        }}
                      />
                    </Col>
                  }
                  <Col xs={12}>
                    <p>Цена для покупателей: {data?.game?.commission ? (data?.price && Math.round(((data?.price) * 1 + (data?.price / 100 * data?.game?.commission)) * 1000000) / 1000000) : data.price}</p>
                  </Col>
                  {data.status == -1 &&
                    <Col xs={12}>
                      <label className="color-1 justify-content-center">
                        Обьявление заблокировано! Обратитесь к администратору.
                      </label>
                    </Col>
                  }
                  {data?.auto &&
                    <Col md={12}>
                      <Textarea
                        type={"text"}
                        label={"Сообщение покупателю после оплаты"}
                        defaultValue={data?.protectedData?.auto}
                        onChange={(e) => setValue("protectedData.auto", e)}
                      />
                    </Col>
                  }
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
              <Row>
                <Col md={4}>
                  <button
                    type='button'
                    className='btn-5 mt-4 mt-sm-5'
                    onClick={handleSubmit(onSubmit)}
                  >Сохранить изменения</button>
                </Col>
                <Col md={4}>
                  <button
                    type='button'
                    className='btn-3 mt-4 mt-sm-5'
                    onClick={handleSubmit(onEdit)}
                  >Снять с публикации</button>
                </Col>
                <Col md={4}>
                  <button
                    type='button'
                    className='btn-4 mt-4 mt-sm-5'
                    onClick={handleSubmit(onDelete)}
                  >Удалить объявление</button>
                </Col>
              </Row>
            }
          </form>
        </div>
      </div >
    </section >
  );
};

export default AddOffer;