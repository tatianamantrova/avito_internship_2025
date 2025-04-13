import { 
  advertToCreate,
  makeCreateAdvertRequest,
  createAdvertWithChangedField,
  makeGetAdvertRequest,
  makeGetSellerAdvertsRequest,
  makeGetAdvertStatisticsRequest,
  makeDeleteAdvertRequest,
  makeGetAdvertStatisticsV2Request
} from './testUtils'

describe('Create Advert ', () => {

  test('should return 200 if created', async () => {
    const response = await makeCreateAdvertRequest(advertToCreate)
    expect(response.statusCode).toBe(200);
  })

  test('should return 400 if price has more than 19 symbols', async () => {
    const response = await createAdvertWithChangedField('price', 100000000000000000000);
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if sellerId has string type', async () => {
    const response = await createAdvertWithChangedField('sellerId', 'Ошибка');
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if price has string type', async () => {
    const response = await createAdvertWithChangedField('price', "3456");
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if likes has string type', async () => {
    const response = await createAdvertWithChangedField('statistics', {
      "likes": "55",
      "viewCount": 0,
      "contacts": 0
    });
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if viewCount has string type', async () => {
    const response = await createAdvertWithChangedField('statistics', {
      "likes": 55,
      "viewCount": "44",
      "contacts": 0
    });
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if contacts has string type', async () => {
    const response = await createAdvertWithChangedField('statistics', {
      "likes": 55,
      "viewCount": 44,
      "contacts": "aa"
    });
    expect(response.statusCode).toBe(400);
  });
})

describe('Get Advert by ID', () => {

  test('should return 200 and object if exists', async () => {
    const adId = 'bab60505-6fdf-488b-aa51-7afd084e0a88'
    const response = await makeGetAdvertRequest(adId)
    expect(response.statusCode).toBe(200)
    expect(response.body[0].id).toBe(adId)
  })

  test('should return 404 if non exists', async () => {
    const response = await makeGetAdvertRequest('bab60505-6fdf-488b-aa51-7afd084e0a89')
    expect(response.statusCode).toBe(404)
  })

  test('should return 400 if advert id is not in uuid format', async () => {
    const response = await makeGetAdvertRequest('bab60505')
    expect(response.statusCode).toBe(400)
  })

  test('should return 400 if advert id is null', async () => {
    const response = await makeGetAdvertRequest(null)
    expect(response.statusCode).toBe(400)
  })
})

describe('Get Adverts by sellerId', () => {

  test('should return 200 if seller with this id is exists', async () => {
    const response = await makeGetSellerAdvertsRequest(30000)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  test('should return 200 and empty array if seller not exists', async () => {
    const response = await makeGetSellerAdvertsRequest(36)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toHaveLength(0)
  })

  test('should return 400 if sellerId is not a number', async () => {
    const response = await makeGetSellerAdvertsRequest('aaaa')
    expect(response.statusCode).toBe(400)
  })
})

describe('Get Advert statistics by advert id (api v1)', () => {

  test('should return 200 if advert exists', async () => {
    const response = await makeGetAdvertStatisticsRequest('bab60505-6fdf-488b-aa51-7afd084e0a88')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  test('should return 404 if advert not exists', async () => {
    const response = await makeGetAdvertStatisticsRequest('bab60505-6fdf-488b-aa51-7afd084e0a89')
    expect(response.statusCode).toBe(404)
  })

  test('should return 400 if advert id not valid', async () => {
    const response = await makeGetAdvertStatisticsRequest('bab60505')
    expect(response.statusCode).toBe(400)
  })
})

describe('Delete Advert by advert id', () => {

  test('should return 404 if advert not exists', async () => {
    const response = await makeDeleteAdvertRequest('bab60505-6fdf-488b-aa51-7afd084e0a89')
    expect(response.statusCode).toBe(404)
  })

  test('should return 400 if advert id not valid', async () => {
    const response = await makeDeleteAdvertRequest('bab60505')
    expect(response.statusCode).toBe(400)
  })
})

describe('Get Advert statistics by advert id (api v2)', () => {

  test('should return 200 if advert exists', async () => {
    const response = await makeGetAdvertStatisticsV2Request('bab60505-6fdf-488b-aa51-7afd084e0a88')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })
})