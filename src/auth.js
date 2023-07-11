export const BASE_URL = 'https://api.films.khuzinagulya.nomoredomains.rocks';

function getResponseData(res) {
  return res.ok
    ? res.json()
    : res.json().then((err) => {
      if (err.validation) {
        return Promise.reject(`${(err.validation.body.message)}`)
      } else {
        return Promise.reject(`${(err.message)}`)
      }
    })
}

export const register = (password, email, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email, name })
  })
    .then((response) => {
      return getResponseData(response)
    })
    .then((res) => {
      return res;
    })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      return getResponseData(response)
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('authorized', 'true');
        localStorage.setItem('timeCreate', new Date());
        return data;
      }
    })
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      return getResponseData(response)
    })
    .then((data) => {
      return data;
    })
}

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((data) => {
      return data;
    })
}