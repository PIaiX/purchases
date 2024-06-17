// value - цена, currency - выводить валюту (true|false))
import { LiaRubleSignSolid } from "react-icons/lia";
import { FILE_URL } from "../config/api";

const customPrice = (value, currency = true) => {
  if (!value) {
    return 0 + "\u00A0₽";
  }
  value = parseFloat(value).toLocaleString();
  if (currency) {
    value = (
      <>
        {value}&nbsp;₽
      </>
    );
  }
  return value;
};
const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
const treeAll = (option, options) => {
  let j = 0;
  let spanOpt = [];
  spanOpt[j] = option;
  let optId = option;
  while (optId.parent) {
    optId = options.find((e) => e.id === optId.parent);
    j++;
    spanOpt[j] = optId;
  }
  spanOpt = spanOpt.reverse();
  return spanOpt;
}

const removeDescendants = (data, option) => {
  if (!data.option || data.option == null) {
    return [option];
  }

  const filteredOptions = [...data.option];
  if (option.data?.max) {
    const existingOptionIndex = filteredOptions.findIndex(item => item.id === option.id);
    if (existingOptionIndex !== -1) {
      if (option.max) {
        filteredOptions[existingOptionIndex] = {
          ...filteredOptions[existingOptionIndex],
          max: option.max,
        };
      }
      else if (option.min) {
        filteredOptions[existingOptionIndex] = {
          ...filteredOptions[existingOptionIndex],
          min: option.min,
        };
      }
      else {
        filteredOptions[existingOptionIndex] = {
          ...filteredOptions[existingOptionIndex],
          value: option.value,
        };
      }
    } else {
      // Если элемент не найден, добавляем его
      filteredOptions.push({
        ...option,
      });
    }
  }
  else {

    const descendants = [];

    // Ищем потомков с parent, равным id option
    const findDescendants = (id) => {
      const found = filteredOptions.filter(item => item.parent === id);
      if (found.length > 0) {
        found.forEach(item => {
          descendants.push(item); // Добавляем найденного потомка в массив descendants
          findDescendants(item.id); // Рекурсивно ищем потомков этого потомка
        });
      }
    };

    // Начинаем поиск потомков с option.id
    if (option.parent) {
      findDescendants(option.parent);
    }
    else {
      findDescendants(option.id);
    }
    // Удаляем потомков из массива filteredOptions
    descendants.forEach(item => {
      filteredOptions.splice(filteredOptions.indexOf(item), 1);
    });

    // Добавляем option в filteredOptions
    if (option.parent) {
      filteredOptions.push(option);
    }
  }
  return filteredOptions;
};


const getImageURL = ({ path = "", size = "mini", type = "user" }) => {
  if (path && Array.isArray(path) && path?.length > 0) {
    if (size == "mini") {
      return FILE_URL + "/" + type + "/mini/" + path[0].media;
    } else {
      return FILE_URL + "/" + type + "/" + path[0].media;
    }
  } else if (path && path?.length > 0) {
    if (size == "mini") {
      return FILE_URL + "/" + type + "/mini/" + path;
    } else {
      return FILE_URL + "/" + type + "/" + path;
    }
  }
  else if (!type || type == 'product' || type == 'sale' || type == 'banner' || type == 'category' || type == 'news') {
    return "/imgs/img5.jpg";
  } else if (type == 'user') {
    return "/imgs/user.jpg";
  }
};

export { customPrice, getImageURL, treeAll, removeDescendants, declOfNum };
