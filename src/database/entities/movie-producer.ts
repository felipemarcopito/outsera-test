import { 
   Column, 
   Entity, 
   ManyToOne 
} from "typeorm";
import { BaseEntity } from "./base-entity";
import { Movie } from "./movie";
import { Producer } from "./producer";

@Entity()
export class MovieProducer extends BaseEntity {

   @Column()
   movieId: string;

   @Column()
   producerId: string;

   @ManyToOne(() => Movie)
   movie?: Movie;

   @ManyToOne(() => Producer)
   producer?: Producer;
}