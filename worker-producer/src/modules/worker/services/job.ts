import { InjectModel } from '@nestjs/mongoose';
import * as sentry from '@sentry/node';
import { Model } from 'mongoose';
import * as scheduler from 'node-schedule';
import { enJobsStatus, IJob, JobToken } from 'schema/job';

export type JobRules = scheduler.RecurrenceRule | scheduler.RecurrenceSpecDateRange | scheduler.RecurrenceSpecObjLit | Date | string;

export interface IJobResult<T = any> {
  success: boolean;
  model: IJob;
  result?: T;
  error?: any;
}

export interface IJobHandler {
  (): Promise<any>;
}

export class JobService {
  constructor(
    @InjectModel(JobToken) private jobModel: Model<IJob>,
  ) { }

  public register(name: string, rule: JobRules, handler: IJobHandler): void {
    scheduler.scheduleJob(name, rule, () => this.run(name, handler));
  }

  public async run(name: string, handler: IJobHandler): Promise<IJobResult> {
    let model: IJob;
    console.log(`JOB: ${name} - ${new Date()} - BEGIN`);

    try {
      model = await this.jobModel.create({ name, status: enJobsStatus.proccessing });
      const result = await handler();

      model.status = enJobsStatus.success;
      model.result = result;
      await model.save();

      console.log(`JOB: ${name} - ${new Date()} - RESULT:`);
      console.log(result);

      return { success: true, model, result };
    } catch (error) {
      if (model) {
        model.status = enJobsStatus.error;
        model.result = {
          name: error.name,
          message: error.message,
          stack: error.stack
        };

        error.errorData = model.save().catch(updateError => ({ ...model, updateError }) as any);
      }

      sentry.captureException(error);

      console.log(`JOB: ${name} - ${new Date()} - ERROR:`);
      console.error(error);

      return { success: false, model, error };
    }
  }
}