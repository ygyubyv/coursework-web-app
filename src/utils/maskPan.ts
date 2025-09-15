export const maskPan = (pan: string) => {
  return pan.replace(/.(?=.{4})/g, "*");
};
