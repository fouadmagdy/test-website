export interface ISingleSchool {
  data: Data;
 }
 
  interface Data {
  attributes: Attributes;
  id:         number;
 }
 
  interface Attributes {
  color:       string;
  description: string;
  title:       string;
 }
 