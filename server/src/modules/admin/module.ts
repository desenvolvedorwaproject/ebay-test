import { Module } from '@nestjs/common';
import { DatabaseModule } from 'modules/database/module';

import { SearchDefinitionController } from './controllers/searchDefinition';
import { SearchDefinitionService } from './services/searchDefinition';

@Module({
  imports: [DatabaseModule],
  controllers: [SearchDefinitionController],
  providers: [SearchDefinitionService],
})
export class AdminModule { }
