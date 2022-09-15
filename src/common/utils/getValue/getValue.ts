export const getValue = <Obj extends object>(obj: Obj, key: keyof Obj) =>
  obj[key];
