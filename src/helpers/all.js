// value - цена, currency - выводить валюту (true|false))
import { LiaRubleSignSolid } from "react-icons/lia";

const customPrice = (value, currency = true) => {
  if (!value) {
    return 0 + "\u00A0₽";
  }
  value = parseInt(value).toLocaleString();
  if (currency) {
    value = (
      <>
        {value}
        <LiaRubleSignSolid className="ruble ms-2" />
      </>
    );
  }
  return value;
};

export { customPrice };
