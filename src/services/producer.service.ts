import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Producer } from "../database/entities/producer";
import { Repository } from 'typeorm';
import { RepositoryService } from "./repository.service";

@Injectable()
export class ProducerService extends RepositoryService<Producer> {
   
   constructor(
      @InjectRepository(Producer)
      protected readonly repository: Repository<Producer>
   ) {
      super(Producer, repository.manager);
   }
}