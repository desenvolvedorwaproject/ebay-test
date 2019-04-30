import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ISearchDefinition } from 'schema/searchDefinition';
import { IdParamValidation } from 'validation/idParams';
import { SearchDefinitionValidation } from 'validation/searchDefinition';

import { SearchDefinitionService } from '../services/searchDefinition';

@Controller('/search-definition')
export class SearchDefinitionController {
  constructor(private readonly appService: SearchDefinitionService) { }

  @Get()
  public async list(): Promise<ISearchDefinition[]> {
    return await this.appService.list();
  }

  @Post()
  public async create(@Body() model: SearchDefinitionValidation): Promise<any> {
    return await this.appService.create(model);
  }

  @Put('/:id')
  public async update(@Param() params: IdParamValidation, @Body() model: SearchDefinitionValidation): Promise<any> {
    return await this.appService.update(params.id, model);
  }

  @Delete('/:id')
  public async delete(@Param() params: IdParamValidation): Promise<any> {
    return await this.appService.delete(params.id);
  }
}
