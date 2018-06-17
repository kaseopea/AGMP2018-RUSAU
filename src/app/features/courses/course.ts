import { CourseItem } from "./course-item";

export class Course implements CourseItem{
  constructor(public id, public title, public created, public duration, public description) {
      this.id = id;
      this.title = title;
      this.created = created;
      this.duration = duration;
      this.description = description;
  }
}
