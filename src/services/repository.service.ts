import {
   FindOptionsWhere,
   ObjectLiteral,
   Repository
} from "typeorm";

export abstract class RepositoryService<T extends ObjectLiteral> extends Repository<T> { 
   
   async saveIfNotExists(
      value: T, 
      compare: (keyof T)[]
   ) {
      const where = {} as FindOptionsWhere<T>;
      compare.forEach((property) => {
         where[property] = value[property];
      });
      const exists = await this.findOneBy(where);
      return exists || this.save(this.create(value));
   }
}