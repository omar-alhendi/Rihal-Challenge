module.exports.calculateAge = (date) =>
  new Date(Date.now() - new Date(date).getTime()).getFullYear() - 1970;

module.exports.averageAge = (array) => {
  const ages = [];
  for (let i = 0; i < array.length; i++) {
    ages.push(
      new Date(Date.now() - new Date(array[i].date).getTime()).getFullYear() -
        1970
    );
  }
  const averageNum = ages.reduce((a, b) => a + b) / ages.length;
  return averageNum.toFixed(1);
};
