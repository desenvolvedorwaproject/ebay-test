import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema, JobToken } from 'schema/job';
import { SearchDefinitionSchema, SearchDefinitionToken } from 'schema/searchDefinition';
import { IS_DEV, MONGO_DSN } from 'settings';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DSN, IS_DEV ? { retryAttempts: 999, retryDelay: 3000 } : {}),
    MongooseModule.forFeature([{ name: SearchDefinitionToken, schema: SearchDefinitionSchema }]),
    MongooseModule.forFeature([{ name: JobToken, schema: JobSchema }])
  ],
  exports: [
    MongooseModule.forFeature([{ name: SearchDefinitionToken, schema: SearchDefinitionSchema }]),
    MongooseModule.forFeature([{ name: JobToken, schema: JobSchema }])
  ]
})
export class DatabaseModule { }