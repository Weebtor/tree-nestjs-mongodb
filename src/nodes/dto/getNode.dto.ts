import { IsString } from 'class-validator';

export class GetNodeParamsDTO {
  @IsString()
  id: string;
}
