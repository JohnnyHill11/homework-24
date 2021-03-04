'use strict';

  const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums/';
  const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';
  const LIST_ALBUM_CLASS = 'list-album';
  const LIST_ALBUM_SELECTOR = '.' + LIST_ALBUM_CLASS;

  const listAlbumTemplate = document.querySelector('#list-album-template').innerHTML;
  const listPhotoTemplate = document.querySelector('#list-photo-template').innerHTML;
  const albumListEl = document.querySelector('#list-albums-id');
  const photoListEl = document.querySelector('#list-photos-id');

  let albumList = [];

  albumListEl.addEventListener('click', onListAlbumClick);

  const resourse = new Resourse(ALBUMS_URL, PHOTOS_URL);

  init();

  function init() {
    fetchAlbums();
  }

  function onListAlbumClick(event) {
    const albumId = getAlbumElement(event.target);
    if (event.target.classList.contains(LIST_ALBUM_CLASS)) {
      fetchPhotos(+albumId.dataset.id);
    }
  }

  function getAlbumElement(el) {
    return el.closest(LIST_ALBUM_SELECTOR);
  }

  function fetchAlbums() {
    resourse.listAlbums()
    .then(setAlbums)
    .then(renderAlbums)
    .then(getFirstAlbumId)
    .then(fetchPhotos);
  }

  function fetchPhotos(albumId) {
    resourse.listPhotos(albumId)
    .then(renderPhotos);
  }

  function setAlbums(list) {
    return (albumList = list)
  }

  function getFirstAlbumId() {
    return albumList.find((album) => !!album).id;
  }

  function renderAlbums(list) {
    const html = list.map(getAlbumHtml).join('');
    albumListEl.innerHTML = html;
  }

  function getAlbumHtml(album) {
    return listAlbumTemplate
      .replace('{{text}}', album.title)
      .replace('{{id}}', album.id);
    }

  function renderPhotos(list) {
    const html = list.map(getPhotoHtml).join('');
    photoListEl.innerHTML = html;
  }

  function getPhotoHtml(photo) {
    return listPhotoTemplate
      .replace('{{id}}', photo.id)
      .replace('{{big-photo}}', photo.url)
      .replace('{{small-photo}}', photo.thumbnailUrl);
  }
