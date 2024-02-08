import {ru} from "./momentLocalization";
import moment from "moment";

export const format_delivery_date = (value) => {
    if (!value) {
        return "Не рассчитано"
    }

    if (value == "1970-01-01T03:00:00+03:00") {
        return "Не удалось рассчитать"
    }

    return moment(value).locale(ru()).format("D MMMM HH:mm")
}