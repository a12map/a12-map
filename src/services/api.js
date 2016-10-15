export const fetchData = (URL = 'http://localhost:8080/prod-data.json', { lat, lng, time}) => {
  return fetch(`${URL}?lat=${lat}&lng=${lng}&time=${time}`)
    .then(response => response.json());
};

export const fetchPurchases = (URL) => {};
