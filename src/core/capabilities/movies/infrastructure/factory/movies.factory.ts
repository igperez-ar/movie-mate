import { ProviderEnum } from '@core/shared/enums';
import type { IMovieRepository } from '../../repository/movies.repository';
import { AdapterAxiosProvider } from '../adapter-axios/adapter-axios.provider';
import { AdapterMockProvider } from '../adapter-mock/adapter-mock.provider';

export class MovieFactory {
  static getInstance(provider = ProviderEnum.AXIOS): IMovieRepository {
    switch (provider) {
      case ProviderEnum.AXIOS:
        return new AdapterAxiosProvider();
      default:
        return new AdapterMockProvider();
    }
  }
}
