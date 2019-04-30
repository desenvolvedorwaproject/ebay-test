import * as mongoose from 'mongoose';

// tslint:disable-next-line: variable-name
export const SearchDefinitionToken = 'SearchDefinitionSchema';

export interface ISearchDefinition extends mongoose.Document, mongoose.SchemaTimestampsConfig {
  email: string;
  phrase: string;
  interval: number;
  orderBy: string;
  numberOfItems: number;
}

// tslint:disable-next-line: variable-name
export const SearchDefinitionSchema = new mongoose.Schema<ISearchDefinition>({
  email: String,
  phrase: String,
  interval: Number,
  orderBy: String,
  numberOfItems: Number
}, { timestamps: true });