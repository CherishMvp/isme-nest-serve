import { Allow} from 'class-validator';

export class QueryClassDto {
  @Allow()
  pageSize?: number;

  @Allow()
  pageNo?: number;

  @Allow()
  dormitoryId?: number;

  @Allow()
  title?: string;
  
  @Allow()
  name?: string;

  @Allow()
  enable?: boolean;
}
