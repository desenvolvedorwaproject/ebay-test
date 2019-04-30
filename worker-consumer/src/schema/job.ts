import * as mongoose from 'mongoose';

export enum enJobsStatus {
  proccessing = 'proccessing',
  success = 'success',
  error = 'error'
}

// tslint:disable-next-line: variable-name
export const JobToken = 'JobSchema';

export interface IJob extends mongoose.Document, mongoose.SchemaTimestampsConfig {
  name: string;
  result: any;
  status: enJobsStatus;
}

// tslint:disable-next-line: variable-name
export const JobSchema = new mongoose.Schema<IJob>({
  name: String,
  result: Object,
  status: String
}, { timestamps: true });