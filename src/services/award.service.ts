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
      categoryId: string
   ) {
      const query = `
         WITH Awards AS (
            SELECT
               p.id AS producer_id,
               aw.year,
               ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY aw.year ASC) AS rank
            FROM producer p
            LEFT JOIN movie_producer mp ON p.id = mp.producerId
            LEFT JOIN award_event_nominee aen ON mp.movieId = aen.movieId
            LEFT JOIN award_event aw ON aen.eventId = aw.id
            WHERE winner = true
            AND awardId = '${awardId}'
            AND categoryId = '${categoryId}'
         )
         SELECT
            p.name AS producer,
            MIN(ra.year) AS "previousWin",
            (SELECT year FROM Awards WHERE producer_id = p.id AND rank = 2) AS "followingWin",
            ((SELECT year FROM Awards WHERE producer_id = p.id AND rank = 2) - MIN(ra.year)) AS interval
         FROM producer p
         LEFT JOIN Awards ra ON p.id = ra.producer_id
         GROUP BY p.name
         HAVING followingWin IS NOT NULL
         ORDER BY interval ASC;
      `;
      
      return this.query(query) as Promise<AwardWinnerDTO[]>;
   }
}