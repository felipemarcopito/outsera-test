import { 
   Column, 
   Entity, 
   ManyToOne
} from "typeorm";
import { BaseEntity } from "./base-entity";
import { Award } from "./award";

@Entity()
export class AwardCategory extends BaseEntity {

   @Column()
   awardId: string;

   @Column()
   name: string;

   @ManyToOne(() => Award)
   award?: Award;
}