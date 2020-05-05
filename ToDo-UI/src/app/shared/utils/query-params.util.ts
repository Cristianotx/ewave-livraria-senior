export function buildQueryParams(object: any) {
  if (!object) {
    return;
  }

  const urlSearchParams = new URLSearchParams();
  Object.keys(object).map((key) => {
    if ((object[key] || typeof object[key] === 'boolean') && object[key] !== 'undefined') {
      urlSearchParams.append(key, object[key]);
    }
  });
  return urlSearchParams.toString();
}
