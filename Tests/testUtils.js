import request from 'supertest'

const BASE_URL = 'https://qa-internship.avito.com';

export const advertToCreate = {
  "name": "Тест",
  "price": 1000,
  "sellerId": 135642,
  "statistics": {
      "contacts": 0,
      "likes": 0,
      "viewCount": 0
  }
};

export const makeCreateAdvertRequest = async (advert) => {
  return await request(BASE_URL)
    .post('/api/1/item')
    .send(advert)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
}

export const createAdvertWithMissingField = async (fieldToRemove) => {
  const advert = {...advertToCreate};
  delete advert[fieldToRemove];

  return await makeCreateAdvertRequest(advert)
};

export const createAdvertWithChangedField = async (field, value) => {
  const advert = {...advertToCreate};
  advert[field] = value;

  return await makeCreateAdvertRequest(advert)
};

export const makeGetAdvertRequest = async (advertId) => {
  return await request(BASE_URL)
    .get(`/api/1/item/${advertId}`)
}

export const makeGetSellerAdvertsRequest = async (sellerId) => {
  return await request(BASE_URL)
    .get(`/api/1/${sellerId}/item`)
}

export const makeGetAdvertStatisticsRequest = async (advertId) => {
  return await request(BASE_URL)
    .get(`/api/1/statistic/${advertId}`)
}

export const makeGetAdvertStatisticsV2Request = async (advertId) => {
  return await request(BASE_URL)
    .get(`/api/2/statistic/${advertId}`)
}

export const makeDeleteAdvertRequest = async (advertId) => {
  return await request(BASE_URL)
    .delete(`/api/2/item/${advertId}`)
}
