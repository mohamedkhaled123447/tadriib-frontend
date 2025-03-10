

export interface Subject {
  id: number
  label: string;
  type: "general" | "specific"
  session: "first" | "second" | "third";
  precentage: number;
  totalHours: number;
  monthsTotals: number[];
}

export interface SubjectData {
  id: number;
  name: string;
  type: number;
  persentage: number;
  day: boolean;
  night: boolean;
}
export interface Job {
  id: number;
  name: string;
  subjects: number[];
}
export interface Topic {
  id: number;
  name: string;
  place: string
  training_tools: string
  instructor: string
  day: boolean
  night: boolean
  level: number
  topic_class: string
  subject: any
  job: any
}