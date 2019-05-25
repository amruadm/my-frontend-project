import OptionListItem from "~/models/OptionListItem";

/**
 * Пол.
 */
export enum GenderType {
    Male = 'male',
    Female = 'female',
}

/** @const Список наименований. */
export const genderLabels: OptionListItem[] = [
    {
        id: GenderType.Male,
        label: 'Мужчина',
    },
    {
        id: GenderType.Female,
        label: 'Женщина',
    },
];