import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class IdParamValidation {
  @IsNotEmpty()
  @IsMongoId()
  @ApiModelProperty({ required: true })
  public id: string;
}