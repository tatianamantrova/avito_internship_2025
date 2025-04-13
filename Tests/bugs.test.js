import { 
  makeCreateAdvertRequest, 
  createAdvertWithMissingField, 
  createAdvertWithChangedField,
  makeGetSellerAdvertsRequest,
  makeGetAdvertStatisticsV2Request
} from './testUtils'

describe('Create Advert', () => {
  
  test('should return 400 if sellerId not passed', async () => {
    const response = await createAdvertWithMissingField('sellerId');
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if price not passed', async () => {
    const response = await createAdvertWithMissingField('price');
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if name not passed', async () => {
    const response = await createAdvertWithMissingField('name');
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if statistics not passed', async () => {
    const response = await createAdvertWithMissingField('statistics');
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if empty object passed', async () => {
    const response = await makeCreateAdvertRequest({});
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if sellerId is not in 111111-999999 range', async () => {
    const response = await createAdvertWithChangedField('sellerId', 123);
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if price < 0', async () => {
    const response = await createAdvertWithChangedField('price', -100);
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if likes < 0', async () => {
    const response = await createAdvertWithChangedField('statistics', {
      "likes": -2,
      "viewCount": 0,
      "contacts": 0
    });
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if viewCount < 0', async () => {
    const response = await createAdvertWithChangedField('statistics', {
      "likes": 0,
      "viewCount": -3,
      "contacts": 0
    });
    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if contacts < 0', async () => {
    const response = await createAdvertWithChangedField('statistics', {
      "likes": 0,
      "viewCount": 0,
      "contacts": -6
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('Get Adverts by sellerId', () => {

  test('should return adverts where sellerId is equal to passed', async () => {
    const sellerId = 30000
    const response = await makeGetSellerAdvertsRequest(sellerId)
    expect(response.statusCode).toBe(200)
    expect(response.body[0].sellerId).toBe(sellerId)
  })
})

describe('Get Advert statistics by advert id (api v2)', () => {

  test('should return 404 if advert not exists', async () => {
    const response = await makeGetAdvertStatisticsV2Request('bab60505-6fdf-488b-aa51-7afd084e0a89')
    expect(response.statusCode).toBe(404)
  })

  test('should return 400 if advert id not valid', async () => {
    const response = await makeGetAdvertStatisticsV2Request('bab60505')
    expect(response.statusCode).toBe(400)
  })
})