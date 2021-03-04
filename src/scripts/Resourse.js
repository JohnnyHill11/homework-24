'use strict';

class Resourse {
  constructor(albumsUrl, photosUrl ) {
    this._albumsUrl = albumsUrl;
    this._photosUrl = photosUrl;
  }
  
  getAlbums() {
    return fetch(this._albumsUrl)
      .then((response) => response.json());
  }

  getPhotos(id) {
    return fetch(this._photosUrl + id)
      .then((response) => response.json());
  }

  listAlbums() {
    return this.getAlbums();
  }

  listPhotos(id) {
    return this.getPhotos(id);
  }
}