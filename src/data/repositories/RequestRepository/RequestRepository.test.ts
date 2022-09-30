import { RequestRepository } from './RequestRepository';

describe('RequestRepository.getRequestFullInfo', () => {
  it('Возвращает смерженый requestDTO и ownerDTO', async () => {
    const owner = {
      name: 'name',
      surname: 'name',
      age: 22,
    };
    const request = { ownerID: 'id', id: '22', status: 2 };

    const requestRepository = new RequestRepository(
      {
        getRequestInfo: async () => request,
      },
      // eslint-disable-next-line
      { getOwnerInfo: async () => owner } as any,
    );

    const expectedResult = {
      id: '22',
      status: 2,
      owner: {
        name: 'name',
        surname: 'name',
        age: 22,
      },
    };

    const result = await requestRepository.getRequestFullInfo(request.id);

    expect(result).toEqual(expectedResult);
  });
});
