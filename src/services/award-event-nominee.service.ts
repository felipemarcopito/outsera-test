import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";
import { AwardEventNominee } from "../database/entities/award-event-nominee";

@Injectable()
export class AwardEventNomineeService extends RepositoryService<AwardEventNominee> {
   
   constructor(
      @InjectRepository(AwardEventNominee)
      protected readonly repository: Repository<AwardEventNominee>
   ) {
      super(AwardEventNominee, repository.manager);
   }
}