import { 
   Column,
   Entity, 
   ManyToOne
} from "typeorm";
import { Movie } from "./movie";
import { AwardCategory } from "./award-category";
import { BaseEntity } from "./base-entity";
import { AwardEvent } from "./award-event";

@Entity()
export class AwardEventNominee extends BaseEntity {

   @Column()
   eventId: string;
   
   @Column()
   movieId?: string;

   @Column()
   categoryId?: string;

   @Column({ default: false })
   winner?: boolean;

   @ManyToOne(() => AwardEvent)
   event?: AwardEvent;

   @ManyToOne(() => Movie)
   movie?: Movie;

   @ManyToOne(() => AwardCategory)
   category?: AwardCategory;
}