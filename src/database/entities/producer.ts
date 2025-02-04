import { 
   Column, 
   Entity 
} from "typeorm";
import { BaseEntity } from "./base-entity";

@Entity()
export class Producer extends BaseEntity {
   
   @Column()
   name: string;
}