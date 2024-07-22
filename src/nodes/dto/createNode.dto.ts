import { IsString, IsOptional } from 'class-validator';

export class CreateNodeDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
