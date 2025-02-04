import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AwardEvent } from "../database/entities/award-event";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";

@Injectable()
export class AwardEventService extends RepositoryService<AwardEvent> {
   
   constructor(
      @InjectRepository(AwardEvent)
      protected readonly repository: Repository<AwardEvent>
   ) {
      super(AwardEvent, repository.manager);
   }
}