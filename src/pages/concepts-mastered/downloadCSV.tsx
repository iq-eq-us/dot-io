const downloadCSV = (csv: string, filename: string) => {
  console.log(csv);
  console.log(filename);

  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/csv;charset=utf-8,' + encodeURIComponent(csv),
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  console.log(element);

  document.body.removeChild(element);
};

export default downloadCSV;
