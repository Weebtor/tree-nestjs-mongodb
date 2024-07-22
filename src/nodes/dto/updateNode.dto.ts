import { IsString, IsOptional } from 'class-validator';

export class UpdateParamsDTO {
  @IsString()
  readonly id: string;
}

export class UpdateBodyDTO {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly parentId?: string | null;
}
