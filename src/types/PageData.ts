import { ContentData } from './ContentData';

export interface PageData {
  Title: string;
  sidebar:boolean
  locale: string;
  Content: ContentData[];
}
