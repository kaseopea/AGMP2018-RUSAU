import { ICourse } from '../interfaces/icourse';

export class CourseItem implements ICourse {
  constructor(public id, public name, public date, public length, public description, public isTopRated, public authors = []) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.length = length;
      this.description = description;
      this.isTopRated = isTopRated;
      this.authors = authors;
  }
}
