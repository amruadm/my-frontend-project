/**
 * Вспомогательные класс для работы с обьектами.
 */
export default class ObjectHelper {

    /**
     * Получить данные для отправки формы через POST ищ обьекта.
     *
     * @param obj Обьект.
     */
    public static objectToFormData(obj: object): FormData {
        const result = new FormData();

        Object.entries(obj).forEach((entry) => {
            const key = entry[0];
            const value = entry[1];

            result.append(key, value);
        });

        return result;
    }
}