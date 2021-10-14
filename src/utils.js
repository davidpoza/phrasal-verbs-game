export function transposeObject(obj) {
  const transposed = {};
  Object.keys(obj).forEach((k) => {
    transposed[obj[k]] = k;
  });
  return transposed;
}