import { ICourse } from '../interfaces/icourse';

export class CourseItem implements ICourse {
  constructor(public id, public title, public created, public duration, public description, public topRated) {
      this.id = id;
      this.title = title;
      this.created = created;
      this.duration = duration;
      this.description = description;
      this.topRated = topRated;
  }
}
