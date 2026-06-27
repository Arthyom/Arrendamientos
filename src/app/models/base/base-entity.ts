export class BaseEntity {
  /**
   *
   */
  constructor( public id:number, public deletedAt?: Date, createdAt?: Date, updatedAt?: Date) {
  }
}
