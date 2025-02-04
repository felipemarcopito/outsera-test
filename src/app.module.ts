import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardController } from './controllers/award.controller';
import * as entities from './database/entities';
import { 
  AwardCategoryService, 
  AwardEventService, 
  AwardService, 
  ImportDataService, 
  MovieProducerService, 
  MovieService, 
  MovieStudioService, 
  ProducerService,
  StudioService,
  AwardEventNomineeService
} from './services';

const DatabaseRootModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  synchronize: true,
  database: './outsera-test.sqlite',
  autoLoadEntities:true
});

const DatabaseFeatureModule = TypeOrmModule
  .forFeature(Object.values(entities));

@Module({
  imports: [
    DatabaseRootModule, 
    DatabaseFeatureModule
  ],
  controllers: [
    AwardController
  ],
  providers: [
    AwardCategoryService,
    AwardEventNomineeService,
    AwardEventService,
    AwardService,
    ImportDataService,
    MovieProducerService,
    MovieStudioService,
    MovieService,
    ProducerService,
    StudioService
  ]
})
export class AppModule {}
