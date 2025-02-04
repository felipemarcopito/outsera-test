import { BaseEntity } from "./base-entity";
import { Movie } from "./movie";
import { Studio } from "./studio";
import { 
   Column, 
   Entity, 
   ManyToOne 
} from "typeorm";

@Entity()
export class MovieStudio extends BaseEntity {

   @Column()
   studioId: string;

   @Column()
   movieId: string;

   @ManyToOne(() => Studio)
   studio?: Studio;

   @ManyToOne(() => Movie)
   movie?: Movie;
}