const uploadCSV = (event: React.ChangeEvent) => {
  const target = event.target as HTMLInputElement;
  const file = target.files[0];
  file.text().then((text) => {
    console.log(text);
  });
};

export default uploadCSV;
