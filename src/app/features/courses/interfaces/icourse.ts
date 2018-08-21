import { IAuthor } from './iauthor';

export interface ICourse {
  id?: number;
  name: string;
  date: Date;
  length: number;
  description: string;
  isTopRated: boolean;
  authors: IAuthor[];
}
