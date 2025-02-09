import { AxiosImplementation } from './axios.implementation';
import { apiInstance } from './axios.instance';
import { AxiosMethodEnum, AxiosResponseEnum } from './axios.interface';

jest.unmock('src/core/infrastructure/http/axios/axios.implementation.ts');
jest.mock('./axios.instance', () => ({
  apiInstance: {
    request: jest.fn(),
  },
}));
const mockedApiInstance = apiInstance as jest.Mocked<typeof apiInstance>;

describe('AxiosImplementation', () => {
  const axiosImpl = new AxiosImplementation();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle GET requests successfully', async () => {
    const mockData = { message: 'Success' };
    mockedApiInstance.request.mockResolvedValueOnce({ data: mockData });

    const result = await axiosImpl.get('/entities');

    expect(mockedApiInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: AxiosMethodEnum.GET,
        url: '/entities',
      }),
    );
    expect(result).toEqual(mockData);
  });

  it('should handle POST requests successfully', async () => {
    const mockData = { message: 'Created' };
    mockedApiInstance.request.mockResolvedValueOnce({ data: mockData });

    const result = await axiosImpl.post('/entities', { key: 'value' });

    expect(mockedApiInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: AxiosMethodEnum.POST,
        url: '/entities',
        data: { key: 'value' },
      }),
    );
    expect(result).toEqual(mockData);
  });

  it('should handle PUT requests successfully', async () => {
    const mockData = { message: 'Updated' };
    mockedApiInstance.request.mockResolvedValueOnce({ data: mockData });

    const result = await axiosImpl.put('/entities', { key: 'value' });

    expect(mockedApiInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: AxiosMethodEnum.PUT,
        url: '/entities',
        data: { key: 'value' },
      }),
    );
    expect(result).toEqual(mockData);
  });

  it('should handle PATCH requests successfully', async () => {
    const mockData = { message: 'Updated' };
    mockedApiInstance.request.mockResolvedValueOnce({ data: mockData });

    const result = await axiosImpl.patch('/entities', { key: 'value' });

    expect(mockedApiInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: AxiosMethodEnum.PATCH,
        url: '/entities',
        data: { key: 'value' },
      }),
    );
    expect(result).toEqual(mockData);
  });

  it('should handle DELETE requests successfully', async () => {
    const mockData = { message: 'Deleted' };
    mockedApiInstance.request.mockResolvedValueOnce({ data: mockData });

    const result = await axiosImpl.delete('/entities/12');

    expect(mockedApiInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: AxiosMethodEnum.DELETE,
        url: '/entities/12',
      }),
    );
    expect(result).toEqual(mockData);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('Network Error');
    mockedApiInstance.request.mockRejectedValue(mockError);

    Object.values(AxiosMethodEnum).map(async (method) => {
      await expect(axiosImpl[method.toLowerCase()]('/error-url')).rejects.toThrow('Network Error');
      expect(mockedApiInstance.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method,
          url: '/error-url',
        }),
      );
    });
  });

  it('should include custom headers', async () => {
    const mockData = { message: 'Header Test' };
    mockedApiInstance.request.mockResolvedValueOnce({ data: mockData });
    const headers = { Authorization: 'Bearer token' };

    const result = await axiosImpl.get('/header-test', AxiosResponseEnum.JSON, headers);

    expect(mockedApiInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining(headers),
      }),
    );
    expect(result).toEqual(mockData);
  });
});
