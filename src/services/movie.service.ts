import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "../database/entities/movie";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";

@Injectable()
export class MovieService extends RepositoryService<Movie> {
   
   constructor(
      @InjectRepository(Movie)
      protected readonly repository: Repository<Movie>
   ) {
      super(Movie, repository.manager);
   }
}