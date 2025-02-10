import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Award } from "../database/entities/award";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";
import { AwardWinnerDTO } from "../dto/award-winner.dto";

@Injectable()
export class AwardService extends RepositoryService<Award> {
   
   constructor(
      @InjectRepository(Award) 
      protected readonly repository: Repository<Award>,
   ) {
      super(Award, repository.manager);
   }

   async getWinners(
      awardId: string, 
      categoryId: string,
      min: number,
      max: number
   ) {
      const query = `
         with awards as (
            select
               award_event.year as year,
               producer.name as producer,
               producer.id as producer_id,
               ROW_NUMBER() OVER (PARTITION BY producerId) AS rank
            from award_event_nominee
               left join movie on award_event_nominee.movieId = movie.id
               left join movie_producer on movie.id = movie_producer.movieId
               left join award_event on award_event_nominee.eventId = award_event.id
               left join producer on movie_producer.producerId = producer.id
            where 
               winner = true
               and award_event."awardId" = '${awardId}'
               and award_event_nominee."categoryId" = '${categoryId}'
            group by producerId, award_event.year
            order by award_event.year
         )
         select
            previous.producer,
            previous.year as "previousWin",
            next.year as "followingWin",
            next.year - previous.year as interval
         from awards previous 
            left join awards next on next.producer_id = previous.producer_id and next.rank = previous.rank + 1
            where 
               "followingWin" is not null
               and (interval = ${min} or interval = ${max})
            order by interval;
      `;
      
      return this.query(query) as Promise<AwardWinnerDTO[]>;
   }
}