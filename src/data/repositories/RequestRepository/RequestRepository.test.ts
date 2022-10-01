import { createQueryClient, localStorageService } from '@example/shared';

import { RequestRepository } from './RequestRepository';

describe('RequestRepository.getRequestFullInfo', () => {
  const queryClient = createQueryClient();

  it('Возвращает смерженый requestDTO и ownerDTO', async () => {
    const owner = {
      name: 'name',
      surname: 'name',
      age: 22,
    };
    const request = {
      ownerID: 'id',
      id: '22',
      status: 2,
      description: 'description',
      createdDate: '11.11.2022',
      updatedDate: '11.11.2022',
    };

    const requestRepository = new RequestRepository(
      // TODO: сделать моки для sources
      {
        getRequestInfo: async () => request,
        // eslint-disable-next-line
      } as any,
      // eslint-disable-next-line
      { getOwnerInfo: async () => owner } as any,
      localStorageService,
      queryClient,
    );

    const expectedResult = {
      id: '22',
      status: 2,
      description: 'description',
      createdDate: '11.11.2022',
      updatedDate: '11.11.2022',
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
