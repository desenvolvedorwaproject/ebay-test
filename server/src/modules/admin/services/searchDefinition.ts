import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISearchDefinition, SearchDefinitionToken } from 'schema/searchDefinition';
import { EBAY_NUMBER_OF_ITEMS, EBAY_ORDER_BY } from 'settings';
import { SearchDefinitionValidation } from 'validation/searchDefinition';

@Injectable()
export class SearchDefinitionService {
  constructor(
    @InjectModel(SearchDefinitionToken) private searchDefinitionModel: Model<ISearchDefinition>
  ) { }

  public async list(): Promise<ISearchDefinition[]> {
    return await this.searchDefinitionModel.find().exec();
  }

  public async create(model: SearchDefinitionValidation): Promise<ISearchDefinition> {
    const data = await this.searchDefinitionModel.create({
      ...model,
      orderBy: EBAY_ORDER_BY,
      numberOfItems: EBAY_NUMBER_OF_ITEMS
    });
    return data.save();
  }

  public async update(_id: string, model: SearchDefinitionValidation): Promise<ISearchDefinition> {
    const result = await this.searchDefinitionModel.findByIdAndUpdate(_id, model).exec();

    if (!result) throw new NotFoundException();
    return result;
  }

  public async delete(_id: string): Promise<void> {
    const result = await this.searchDefinitionModel.deleteOne({ _id });
    if (result.ok !== 1) throw new NotFoundException();
  }
}
