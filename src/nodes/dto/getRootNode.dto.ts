import { IsString } from 'class-validator';

export class GetRootNodeDTO {
  @IsString()
  id: string;
}
