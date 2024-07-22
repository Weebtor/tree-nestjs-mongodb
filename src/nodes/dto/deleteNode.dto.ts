import { IsString } from 'class-validator';

export class DeleteNodeParamsDTO {
  @IsString()
  id: string;
}
