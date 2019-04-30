import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import mockingoose from 'mockingoose';
import mongoose, { Model } from 'mongoose';
import { ISearchDefinition, SearchDefinitionSchema, SearchDefinitionToken } from 'schema/searchDefinition';
import { SearchDefinitionValidation } from 'validation/searchDefinition';

import { SearchDefinitionService } from './searchDefinition';

describe('Admin/SearchDefinitionService', () => {
  let service: SearchDefinitionService;
  let searchDefinitionModel: Model<ISearchDefinition>;

  beforeAll(async () => {
    searchDefinitionModel = mongoose.model(SearchDefinitionToken, SearchDefinitionSchema);

    const module = await Test.createTestingModule({
      providers: [
        SearchDefinitionService,
        { provide: getModelToken(SearchDefinitionToken), useValue: searchDefinitionModel }
      ],
    }).compile();

    service = module.get(SearchDefinitionService);
  });

  afterEach(() => {
    mockingoose(searchDefinitionModel).reset();
  });

  describe('list', () => {
    it('should an empty array', () => {
      mockingoose(searchDefinitionModel).toReturn([]);
      return expect(service.list()).resolves.toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new document', () => {
      const model = new SearchDefinitionValidation();
      model.email = 'test@email.com';
      model.phrase = 'test';
      model.interval = 5;

      mockingoose(searchDefinitionModel).toReturn(model);
      return service.create(model).then(result => {
        expect(result._id).toBeInstanceOf(mongoose.Types.ObjectId);
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
        expect(result.email).toEqual(model.email);
        expect(result.phrase).toEqual(model.phrase);
        expect(result.interval).toEqual(model.interval);
      });
    });
  });

  describe('update', () => {
    it('should update a new document', () => {
      const model = new SearchDefinitionValidation();
      model.email = 'test@email.com';
      model.phrase = 'test';
      model.interval = 5;

      mockingoose(searchDefinitionModel).toReturn(model, 'findOneAndUpdate');
      return service.update('teste', model).then(result => {
        expect(result._id).toBeInstanceOf(mongoose.Types.ObjectId);
        expect(result.email).toEqual(model.email);
        expect(result.phrase).toEqual(model.phrase);
        expect(result.interval).toEqual(model.interval);
      });
    });

    it('should throw NotFoundException a new document', () => {
      mockingoose(searchDefinitionModel).toReturn(null, 'findOneAndUpdate');
      return service.update('teste', null).then(() => {
        fail();
      }).catch(result => {
        expect(result).toBeInstanceOf(NotFoundException);
      });
    });
  });

});
