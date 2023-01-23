export const parseHrtimeToMS = (hrtime: [number, number]) => {
  var seconds = (hrtime[0] + hrtime[1] / Math.pow(10, 6)).toFixed(2);
  return seconds;
};

export const getParamValue = (params: string[], param: string) => {
  const paramIndex = params.indexOf(param);
  if (paramIndex > -1) {
    const paramValue = parseInt(params[paramIndex + 1]);
    if (!isNaN(paramValue)) {
      return paramValue;
    }
    return null;
  }
  return null;
};
