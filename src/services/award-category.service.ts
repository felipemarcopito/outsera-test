import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AwardCategory } from "../database/entities/award-category";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";

@Injectable()
export class AwardCategoryService extends RepositoryService<AwardCategory> {
   
   constructor(
      @InjectRepository(AwardCategory)
      protected readonly repository: Repository<AwardCategory>
   ) {
      super(AwardCategory, repository.manager);
   }
}