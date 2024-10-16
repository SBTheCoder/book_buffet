export const validation = {};
validation.validateBuffet = (value) => {
  return value !== "";
};
validation.validEmail = (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log(emailRegex.test(value.trim()), value);
  console.log(typeof(value), "type")
  return emailRegex.test(value.trim());
};
validation.validPlateCount = (value) => {
  return value != "" && value > 0;
};
validation.validDate = (value) => {
  let formdate = new Date(value);
  let todayDate = new Date();
  return formdate > todayDate;
};