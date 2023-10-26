const getDate = () => {
  return Date().toString().slice(0, -31);
};

export default getDate;
