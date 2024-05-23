export interface IButton {
  theme: string;
  link: Link;
}

interface Link {
  label: string;
  target: Target;
}

interface Target {
  data: Data;
}

interface Data {
  attributes: Attributes;
}

interface Attributes {
  title: string;
  slug:string;
}
