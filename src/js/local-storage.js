function save(key, value) {
  try {
    const serialiseData = JSON.stringify(value);
    localStorage.setItem(key, serialiseData);
  } catch (err) {
    console.log(err);
  }
}

function load(key) {
  try {
    const dataParsed = localStorage.getItem(key);
    return dataParsed === null ? undefined : JSON.parse(dataParsed);
  } catch (err) {
    console.log(err);
  }
}

export { save, load };
