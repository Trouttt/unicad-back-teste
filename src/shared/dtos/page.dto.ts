import { PageMetaDataDto } from './page-meta-data.dto';

export class PageDto<T> {
  readonly data: T[];

  readonly meta_data: PageMetaDataDto;

  constructor(data: T[], meta_data: PageMetaDataDto) {
    this.data = data;
    this.meta_data = meta_data;
  }
}
