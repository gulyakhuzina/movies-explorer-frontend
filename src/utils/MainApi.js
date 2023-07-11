import { MOVIES_API_URL } from "../utils/constants";

class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  editUserInfo(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  editAvatar(data) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/movies', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteMovie(id) {
    return fetch(this._baseUrl + '/movies/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  addMovie(formData) {
    return fetch(this._baseUrl + '/movies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        country: formData.country,
        director: formData.director,
        duration: formData.duration,
        year: formData.year,
        description: formData.description,
        image: MOVIES_API_URL + formData.image.url,
        trailerLink: formData.trailerLink,
        thumbnail: MOVIES_API_URL + formData.image.formats.thumbnail.url,
        movieId: formData.id,
        nameRU: formData.nameRU,
        nameEN: formData.nameEN,
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  likeCard(id) {
    return fetch(this._baseUrl + '/movies/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteLikeCard(id) {
    return fetch(this._baseUrl + '/movies/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

}

export const api = new Api({
  baseUrl: 'https://api.films.khuzinagulya.nomoredomains.rocks',
});