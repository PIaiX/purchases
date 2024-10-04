const titles = [
  {
    value: 1,
    title: "Проблема с платежной системой или выводом средств",
  },
  {
    value: 2,
    title: "Покупатель не подтверждает сделку",
  },
  {
    value: 3,
    title: "Возврат средств при отсутствии продавца",
  },
  {
    value: 4,
    title: "Обращение для снятия ограничений на вывод средств",
  },
  {
    value: 5,
    title: "Восстановление доступа к учетной записи",
  },
  {
    value: 6,
    title: "Спорные ситуации / арбитраж",
  },
  {
    value: 7,
    title: "Жалоба на пользователя",
  },
  {
    value: 8,
    title: "Персональные данные",
  },
  {
    value: 9,
    title: "Иные вопросы",
  },
];

const isTitle = (title) => {
  let titleInfo = titles.find((e) => e.value == title);
  if (!titleInfo) {
    return " Неизвестная тема";
  }
  return titleInfo.title;
};

export { titles, isTitle };
