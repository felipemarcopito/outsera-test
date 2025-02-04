import { config } from "../config";
import { AwardCategoryService } from "./award-category.service";
import { AwardEventService } from "./award-event.service";
import { MovieProducerService } from "./movie-producer.service";
import { MovieStudioService } from "./movie-studio.service";
import { MovieService } from "./movie.service";
import { ProducerService } from "./producer.service";
import { StudioService } from "./studio.service";
import { AwardService } from "./award.service";
import { createCsvRowMapper } from "../utils/create-csv-row-mapper";
import { plainToInstance } from "class-transformer";
import { CsvImportData } from "../models/csv-import-data";
import { AwardEventNomineeService } from "./award-event-nominee.service";
import { validate } from "class-validator";
import  * as fs from 'fs';
import { 
   Injectable, 
   Logger, 
   OnModuleInit 
} from "@nestjs/common";


@Injectable()
export class ImportDataService implements OnModuleInit {

   logger = new Logger('ImportDataService')

   constructor(
      protected awardCategoryService: AwardCategoryService,
      protected awardEventService: AwardEventService,
      protected awardService: AwardService,
      protected awardEventNomineeService: AwardEventNomineeService,
      protected movieProducerService: MovieProducerService,
      protected movieStudioService: MovieStudioService,
      protected movieService: MovieService,
      protected producerService: ProducerService,
      protected studioService: StudioService
   ) {}
   
   async onModuleInit() {
      await this.importGPAWorstPictureWinners();
   }

   async importGPAWorstPictureWinners() {

      this.logger.log('Please, wait! Importing GoldenRaspberryAwards.WorstPicuteMovires...')

      const award = await this
         .awardService
         .saveIfNotExists({
            name: config.goldenRaspberryAwards 
         }, ['name']);

      const category = await this
         .awardCategoryService
         .saveIfNotExists({
            awardId: award.id as string,
            name: config.worstPicture,
         }, ['awardId', 'name']);
   
      const fileContent = fs
         .readFileSync(config.importFile)
         .toString('utf-8');
      const rows = fileContent.split('\n');
      const { mapper, columns } = createCsvRowMapper(rows);
      const wrongRows = [
         `id;${columns?.join(';')};errors`
      ] as string[];
      let rowId = 0;

      for (const strRow of rows) {  
         
         rowId++;
         const Target = CsvImportData
            .GoldenRaspberryAwards
            .WorstPictureRow;

         const instance = plainToInstance(
            Target, 
            mapper(strRow)
         );
         
         const errors = await validate(instance);
         if (errors.length  > 0) {
            let errorMessages = '';
            errors.forEach((error) => {
               Object.getOwnPropertyNames(error.constraints).forEach((constraint, i) => {
                  const constrains = error.constraints as NodeJS.Dict<string>
                  errorMessages += `${i > 0 ? ',' : ''}${constraint}:${constrains[constraint]}`;
               });
            });
            wrongRows.push(`${rowId + 1};${strRow};${errorMessages}`);
            continue;
         }
         
         const event = await this   
            .awardEventService
            .saveIfNotExists({
               awardId: award.id as string,
               year: instance.year
            }, ['awardId', 'year']);

         const movie = await this
            .movieService
            .saveIfNotExists({
               name: instance.title
            }, ['name']);

         await Promise.all(
            instance.studios.map(async (studio) => {
               const stored = await this
                  .studioService
                  .saveIfNotExists({
                     name: studio
                  }, ['name']);
               await this
                  .movieStudioService
                  .saveIfNotExists({
                     movieId: movie.id as string,
                     studioId: stored.id as string
                  }, ['movieId', 'studioId']);
               return stored;
            })
         );

         await Promise.all(
            instance.producers.map(async (producer) => {
               const stored = await this
                  .producerService
                  .saveIfNotExists({
                     name: producer
                  }, ['name']);
               await this
                  .movieProducerService
                  .saveIfNotExists({
                     movieId: movie.id as string,
                     producerId: stored.id as string
                  }, ['movieId', 'producerId']);
               return stored;
            })
         );

         await this
            .awardEventNomineeService
            .saveIfNotExists({
               eventId: event.id as string,
               movieId: movie.id,   
               winner: instance.winner,
               categoryId: category.id
            }, ['eventId', 'movieId']);
      }

      const withErrors = wrongRows.length > 0 ? true : false;

      if (withErrors) {
         const filename =`${config.importFile}.log`;
         fs.writeFileSync(filename, wrongRows.join('\n'));
         this.logger.warn('GoldenRaspberryAwards.WorstPicuteMovires imported with errors');
         this.logger.warn(`Logfile: ${filename}`);
      } else {
         this.logger.log('GoldenRaspberryAwards.WorstPicuteMovires successfully imported ');
      }
   }
}