import { instanceToPlain } from 'class-transformer';
import { config } from "../config";
import { AwardWinnerDTO } from "../dto/award-winner.dto";
import { 
   AwardCategoryService, 
   AwardService 
} from "../services";
import {
   Controller,
   Get,
   NotFoundException,
   Param
} from "@nestjs/common";

@Controller('award')
export class AwardController {

   constructor(
      protected awardService: AwardService,
      protected awardCategoryService: AwardCategoryService
   ) { }

   @Get(':awardId/category/:categoryId/winners')
   async getWinners(
      @Param('awardId') awardId: string,
      @Param('categoryId') categoryId: string
   ) {
      const award = await this
         .awardService
         .findOneBy([{
            name: awardId
         }, {
            id: awardId
         }]);

      if (!award) throw new NotFoundException(`Award ${awardId} not found`);

      const category = await this
         .awardCategoryService
         .findOneBy([{
            awardId: award.id,
            name: categoryId
         }, {
            awardId: award.id,
            id: categoryId
         }]);

      if (!category) throw new NotFoundException(`Award Category ${awardId} not found`);
         
      const winners = (await this
         .awardService
         .getWinners(
            award.id as string, 
            category.id as string
         ))
         .map((winner) => {
            const dto = new AwardWinnerDTO();
            Object.assign(dto, winner);
            return instanceToPlain(
               dto,
               config.instanceToPlain.defaultOptions
            );
         });
         
      const min = winners[0].interval;
      const max = winners[winners.length - 1].interval;

      return {
         min: winners
            .filter((winner) => {
               return winner.interval === min;
            }),
         max: winners
            .filter((winner) => {
               return winner.interval === max;
            })
      };
   }
}