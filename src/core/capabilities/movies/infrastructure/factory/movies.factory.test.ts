import { AdapterAxiosProvider } from '../adapter-axios/adapter-axios.provider';
import { AdapterMockProvider } from '../adapter-mock/adapter-mock.provider';
import { ProviderEnum } from './../../../../shared/enums/type-provider.enum';
import { MovieFactory } from './movies.factory';

describe('MovieFactory', () => {
  it('should return an instance of AdapterAxiosProvider when typeProvider is AXIOS', () => {
    const instance = MovieFactory.getInstance(ProviderEnum.AXIOS);
    expect(instance).toBeInstanceOf(AdapterAxiosProvider);
  });

  it('should return an instance of AdapterMockProvider when typeProvider is not AXIOS', () => {
    const instance = MovieFactory.getInstance(ProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(AdapterMockProvider);
  });

  it('should return an instance of AdapterAxiosProvider when typeProvider is undefined', () => {
    const instance = MovieFactory.getInstance();
    expect(instance).toBeInstanceOf(AdapterAxiosProvider);
  });
});
