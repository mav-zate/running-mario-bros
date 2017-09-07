export const objToArr = (obj) => {
  let array = [];

  Object.keys(obj).forEach((key) => {
    array.push(obj[key]);
  });

  return array;
};
