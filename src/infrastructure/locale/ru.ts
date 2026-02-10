export class Locale {
  appTitle = 'Livi-pro - OpenAPI';
  errors = {
    // ? Models validation errors
    isNotArray: 'Не является массивом',
    isNotBoolean: 'Не является булевым',
    isNotCorrectPhone: 'Некорректный номер телефона',
    isNotDate: 'Не является датой',
    isNotDateString: 'Не является строкой-датой',
    isNotDefined: 'Поле должно быть определено',
    isNotEmail: 'Некорректный mail',
    isNotEmpty: 'Поле не должно быть пустым',
    isNotInt: 'Поле должно быть целым числом',
    isNotNumber: 'Поле должно быть числом',
    isNotString: 'Поле должно быть строкой',
    unknownError: 'Неизвестная ошибка',
    isNotValidEnum: (array: string[]) => `Поле должно иметь одно из следующих начений: ${array.join(', ')}`,
    length: (value: number) => `Размер массива должен быть равен ${value}`,
    maxError: (value: number) => `Значение должно быть меньше, либо равно ${value}`,
    minError: (value: number) => `Значение должно быть больше, либо равно ${value}`,
    unknownValidationError: (field: string) => `Неизвестная ошибка валидации поля ${field}`,
  };
}

export const loc = new Locale();
