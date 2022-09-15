import { getValue } from './getValue';

describe('getValue', () => {
  it.each<[Record<string, unknown>, string]>([
    [{ name: 'name' }, 'name'],
    [{ value: 'name' }, 'value'],
  ])('Из объекта: %j, успешно достается значение по ключу: %s', (obj, key) => {
    expect(Boolean(getValue(obj, key))).toBeTruthy();
  });
});
