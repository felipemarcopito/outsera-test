import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieStudio } from "../database/entities/movie-studio";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";

@Injectable()
export class MovieStudioService extends RepositoryService<MovieStudio> {
   
   constructor(
      @InjectRepository(MovieStudio)
      protected readonly repository: Repository<MovieStudio>
   ) {
      super(MovieStudio, repository.manager);
   }
}