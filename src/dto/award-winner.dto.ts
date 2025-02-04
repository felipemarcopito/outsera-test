import { Expose } from "class-transformer";

export class AwardWinnerDTO {
   
   @Expose()
   producer: string;

   @Expose()
   interval: number;

   @Expose()
   previousWin: number;

   @Expose()
   followingWin: number;
}