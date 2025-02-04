import { 
   Column, 
   Entity
} from "typeorm";
import { BaseEntity } from "./base-entity";

@Entity()
export class Studio extends BaseEntity {
   
   @Column()
   name: string;
}