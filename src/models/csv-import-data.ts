import { Transform } from "class-transformer";
import {
   ArrayMinSize,
   IsBoolean,
   IsNumber,
   IsString
} from "class-validator";

export namespace CsvImportData {

   export namespace GoldenRaspberryAwards {

      export class WorstPictureRow {

         @Transform(({ 
            value 
         }) => {
            return parseInt(value);
         })
         @IsNumber()
         year: number;

         @IsString()
         title: string;

         @ArrayMinSize(1)
         @IsString({ each: true })
         @Transform(({
            value
         }) => {
            return value?.split(',');
         })
         studios: string[];

         @ArrayMinSize(1)
         @IsString({ each: true })
         @Transform(({
            value
         }) => {
            if (!value) return [];
            const items = value.split(',');
            const producers = [] as string[];
            items.forEach((item: string) => {
               if (item.toLowerCase().includes(' and ')) {
                  producers.push(...item.split(' and '));
               } else {
                  producers.push(item);
               }
            });
            return producers
               .map((producer) => {
                  return producer.trim();
               })
               .filter((producer) => {
                  return producer != '';
               });
         })
         producers: string[];

         @IsBoolean()
         @Transform(({
            value
         }) => {
            return value?.includes('yes')
               ? true
               : false;
         })
         winner: boolean;
      }
   }
}