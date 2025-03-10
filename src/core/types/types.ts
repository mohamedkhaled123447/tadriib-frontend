export type DayType = {
  id: number;
  name: string;
  color: string;
  trainingHours: number;
  dayLearningHours: number;
  nightLearningHours: number;
  boundEducationHours: number;
};

export type DayData = {
  date: string;
  type: DayType;
};

export type WeekData = {
  totalTrainingHours: number
  totalDayLearningHours: number,
  totalNightLearningHours: number,
  totalBoundEducationHours: number,
  weekNumber: number;
  days: DayData[];
};

export type MonthData = {
  totalTrainingHours: number
  totalDayLearningHours: number,
  totalNightLearningHours: number,
  totalBoundEducationHours: number,
  month: number;
  monthName: string;
  startDate: string;
  endDate: string;
  weeks: WeekData[];
};

export const defaultDayType: DayType = {
  id: 1,
  name: "يوم طويل",
  color: "#edebeb",
  trainingHours: 0,
  dayLearningHours: 0,
  nightLearningHours: 0,
  boundEducationHours: 0,
};
export const emptyDayType: DayType = {
  id: 1,
  name: "يوم طويل",
  color: "#ded6d5",
  trainingHours: 0,
  dayLearningHours: 0,
  nightLearningHours: 0,
  boundEducationHours: 0,
};
export type interval = {
  startDate: string;
  endDate: string
}


/************************************/
export type the547jobs = {
  mat: number[][]
  totals: number[]
}
export type disInterval = {
  rows: number[],
  cols: number[],
  mat: number[][],
  months: disMonth[]
}
export type disMonth = {
  rows: number[],
  cols: number[],
  mat: number[][],
  weeks: disWeek[]
  the547jobs: the547jobs[]
}
export type disWeek = {
  rows: number[],
  cols: number[],
  mat: number[][],
  matjobs: any,
  the545jobs: any
  the546: string[][]
}
/************************************ */
type TopicDistributionMatrix = number[][]; 

export type GeneralTopicDistribution = {
  subject: number; 
  mat: TopicDistributionMatrix; 
};

export type SpecializedTopicsDistribution = {
  topicDistribution: TopicDistributionMatrix;
  totals: number[];
};

export type TopicsDistributionData = {
  specializedTopicsDistribution: SpecializedTopicsDistribution;
  GeneralTopicsDistribution: GeneralTopicDistribution[];
};

/*************************************** */
export type month546 = {
  monthId: number
  weeks: week546[]
}
export type week546 = {
  weekId: number
  days: day546[]
}
export type day546 = {
  data: day546Data[]
}
export type day546Data = {
  subject: string
  topic: string
}
