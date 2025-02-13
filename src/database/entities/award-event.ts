import { 
   Column, 
   Entity
} from "typeorm";
import { BaseEntity } from "./base-entity";

@Entity()
export class AwardEvent extends BaseEntity {

   @Column()
   year: number;

   @Column()
   awardId: string;
}