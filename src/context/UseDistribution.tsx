import { Subject } from "@/core/interfaces";
import {
  monthsDistribution,
  dayTopicsDistribution,
  nightTopicsDistribution,
  the546,
} from "@/core/utils/helper";
import {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useCalendar } from "@/context/UseCalendar";
import { disInterval, MonthData, TopicsDistributionData } from "@/core/types/types";

interface DistributionContextType {
  daySubjects: Subject[];
  nightSubjects: Subject[];
  dayDistribution: disInterval;
  nightDistribution: disInterval;
  months: MonthData[];
  dayTopicsDis: any ;
  nightTopicsDis: any;
}

const DistributionContext = createContext<DistributionContextType | undefined>(
  undefined
);

export const DistributionProvider = ({ children }: { children: ReactNode }) => {
  const { subjectsData, months, jobs, topics } = useCalendar();
  const [daySubjects, setDaySubjects] = useState<Subject[]>([]);
  const [nightSubjects, setNightSubjects] = useState<Subject[]>([]);
  const totalDayLearingHours: number = useMemo(() => {
    return months.reduce(
      (acc, month) => (acc += month.totalDayLearningHours),
      0
    );
  }, [months]);

  const totalNightLearingHours: number = useMemo(() => {
    return months.reduce(
      (acc, month) => (acc += month.totalNightLearningHours),
      0
    );
  }, [months]);

  const dayDistribution: disInterval = useMemo(() => {
    return monthsDistribution(
      jobs,
      months,
      daySubjects,
      totalDayLearingHours,
      "day"
    );
  }, [months, daySubjects, jobs]);

  const nightDistribution: disInterval = useMemo(() => {
    return monthsDistribution(
      jobs,
      months,
      nightSubjects,
      totalNightLearingHours,
      "night"
    );
  }, [months, nightSubjects, jobs]);
  const dayTopicsDis: TopicsDistributionData[]  = useMemo(() => {
    return dayTopicsDistribution(daySubjects, dayDistribution, topics,jobs);
  }, [daySubjects, dayDistribution, topics]);
  const nightTopicsDis: TopicsDistributionData[] = useMemo(() => {
    return nightTopicsDistribution(nightSubjects, nightDistribution, topics,jobs);
  }, [nightSubjects, nightDistribution, topics]);

  useEffect(() => {
    if (totalDayLearingHours) {
      const newSubjectsData: Subject[] = [];
      subjectsData
        .filter((subject) => subject.type === 1)
        .forEach((subject) => {
          if (!subject.day) return;
          newSubjectsData.push({
            id: subject.id,
            label: subject.name,
            precentage: subject.persentage,
            type: subject.type === 2 ? "general" : "specific",
            monthsTotals: [],
            totalHours: Math.floor(
              (subject.persentage * totalDayLearingHours) / 100
            ),
            session: "first",
          });
        });
      subjectsData
        .filter((subject) => subject.type === 2)
        .forEach((subject) => {
          if (!subject.day) return;
          newSubjectsData.push({
            id: subject.id,
            label: subject.name,
            precentage: subject.persentage,
            type: subject.type === 2 ? "general" : "specific",
            monthsTotals: [],
            totalHours: Math.floor(
              (subject.persentage * totalDayLearingHours) / 100
            ),
            session: "first",
          });
        });
      setDaySubjects(newSubjectsData);
    }
    if (totalNightLearingHours) {
      const newSubjectsData: Subject[] = [];
      subjectsData
        .filter((subject) => subject.type === 1)
        .forEach((subject) => {
          if (!subject.night) return;
          newSubjectsData.push({
            id: subject.id,
            label: subject.name,
            precentage: subject.persentage,
            type: subject.type === 2 ? "general" : "specific",
            monthsTotals: [],
            totalHours: Math.floor(
              (subject.persentage * totalNightLearingHours) / 100
            ),
            session: "first",
          });
        });
      subjectsData
        .filter((subject) => subject.type === 2)
        .forEach((subject) => {
          if (!subject.night) return;
          newSubjectsData.push({
            id: subject.id,
            label: subject.name,
            precentage: subject.persentage,
            type: subject.type === 2 ? "general" : "specific",
            monthsTotals: [],
            totalHours: Math.floor(
              (subject.persentage * totalNightLearingHours) / 100
            ),
            session: "first",
          });
        });
      setNightSubjects(newSubjectsData);
    }
  }, [totalDayLearingHours, totalNightLearingHours, subjectsData]);

  return (
    <DistributionContext.Provider
      value={{
        daySubjects,
        nightSubjects,
        dayDistribution,
        nightDistribution,
        months,
        dayTopicsDis,
        nightTopicsDis,
      }}
    >
      {children}
    </DistributionContext.Provider>
  );
};

export const useDistribution = () => {
  const context = useContext(DistributionContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
