import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { INTERVALS } from 'settings';

export class SearchDefinitionValidation {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiModelProperty({ required: true, maxLength: 250 })
  public email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiModelProperty({ required: true, minLength: 3, maxLength: 100 })
  public phrase: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn(INTERVALS)
  @ApiModelProperty({ required: true, in: INTERVALS.join(', ') })
  public interval: number;
}