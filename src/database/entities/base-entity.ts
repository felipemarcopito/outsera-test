import { generateEntityId } from "../../utils/generate-entity-id";
import { 
   Column, 
   PrimaryColumn 
} from "typeorm";

export abstract class BaseEntity {

   @PrimaryColumn()
   id?: string = generateEntityId();

   @Column()
   createdAt?: Date = new Date();
}