import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieProducer } from "../database/entities/movie-producer";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";

@Injectable()
export class MovieProducerService extends RepositoryService<MovieProducer> {
   
   constructor(
      @InjectRepository(MovieProducer)
      protected readonly repository: Repository<MovieProducer>
   ) {
      super(MovieProducer, repository.manager);
   }
}