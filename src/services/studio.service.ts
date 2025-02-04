import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Studio } from "../database/entities/studio";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";

@Injectable()
export class StudioService extends RepositoryService<Studio> {
   
   constructor(
      @InjectRepository(Studio)
      protected readonly repository: Repository<Studio>
   ) {
      super(Studio, repository.manager);
   }
}