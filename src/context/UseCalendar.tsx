import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { DayType, MonthData, interval } from "@/core/types/types";
import { generateDateStructure, buildMonthsTree } from "@/core/utils/calender";
import { SubjectData, Job, Subject, Topic } from "@/core/interfaces";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
interface CalendarContextType {
  months: MonthData[];
  monthsData: interval[];
  subjectsData: SubjectData[];
  setMonths: Function;
  setMonthsData: Function;
  updateDayType: Function;
  updateMonthsData: Function;
  updateDayTypeRow: Function;
  updateDayTypeCol: Function;
  generateInterval: Function;
  types: DayType[];
  setTypes: Function;
  jobs: Job[];
  setJobs: Function;
  subjects: SubjectData[];
  setSubjects: Function;
  topics: Topic[];
  setTopics: Function;
  calenderId: number;
  setCalenderId: Function;
  selectedTopics: number[];
  setSelectedTopics: Function;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [types, setTypes] = useState<DayType[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [monthsData, setMonthsData] = useState<interval[]>([]);
  const [months, setMonths] = useState<MonthData[]>([]);
  const [calenderId, setCalenderId] = useState<number>(0);
  const updateDayType = useCallback(
    (dayId: number, weekId: number, monthId: number, typeId: number) => {
      const updatedMonths = [...months];
      const newType = types.find((item) => item.id === typeId);
      if (newType) {
        updatedMonths[monthId - 1].weeks[weekId].days[dayId].type = newType;
      }
      setMonths(buildMonthsTree(updatedMonths));
    },
    [months]
  );
  const updateDayTypeRow = useCallback(
    (typeName: string, index: number) => {
      const updatedMonths = [...months];
      const newType = types.find((item) => item.name === typeName);
      if (newType) {
        updatedMonths.forEach((month) => {
          month.weeks.forEach((week) => {
            week.days[index].type = newType;
          });
        });
      }
      setMonths(buildMonthsTree(updatedMonths));
    },
    [months]
  );
  const updateDayTypeCol = useCallback(
    (typeName: string, monthId: number, index: number) => {
      const updatedMonths = [...months];
      const newType = types.find((item) => item.name === typeName);
      if (newType) {
        updatedMonths[monthId - 1].weeks[index].days.forEach((day) => {
          day.type = newType;
        });
      }
      setMonths(buildMonthsTree(updatedMonths));
    },
    [months]
  );
  const updateMonthsData = useCallback(
    (interval: interval, monthId: number) => {
      const newMonthsData = [...monthsData];
      newMonthsData[monthId - 1] = {
        startDate: interval.startDate,
        endDate: interval.endDate,
      };
      if (newMonthsData.length > monthId) {
        const temp = new Date(interval.endDate);
        temp.setDate(temp.getDate() + 1);
        newMonthsData[monthId].startDate = temp.toLocaleDateString("en-CA");
      }
      setMonthsData(newMonthsData);
      setMonths(generateDateStructure(newMonthsData, types));
    },
    [types, monthsData]
  );
  const generateInterval = useCallback(
    (interval: interval) => {
      const results: interval[] = [];
      let current = new Date(interval.startDate);
      let start = new Date(interval.startDate);
      const end = new Date(interval.endDate);
      let index = 1;
      while (current <= end) {
        if (index % 30 === 0) {
          results.push({
            startDate: start.toLocaleDateString("en-CA"),
            endDate: current.toLocaleDateString("en-CA"),
          });
          start = new Date(current);
          start.setDate(start.getDate() + 1);
        }
        index++;
        current.setUTCDate(current.getUTCDate() + 1);
      }
      if (index % 30 !== 0) {
        current.setUTCDate(current.getUTCDate() - 1);
        results.push({
          startDate: start.toLocaleDateString("en-CA"),
          endDate: current.toLocaleDateString("en-CA"),
        });
      }
      setMonthsData(results);
      setMonths(generateDateStructure(results, types));
    },
    [types]
  );
  const fetchData = async () => {
    const subjectsRes = await fetch(`${BASE_SERVER_URL}/api/subject/`);
    const subjectsData: SubjectData[] = await subjectsRes.json();
    setSubjects(subjectsData);
    const jobsRes = await fetch(`${BASE_SERVER_URL}/api/job/`);
    const jobsData: Job[] = await jobsRes.json();
    setJobs(jobsData);
    const topicsRes = await fetch(`${BASE_SERVER_URL}/api/topic/`);
    const topicsData: Topic[] = await topicsRes.json();
    setTopics(topicsData.sort((a, b) => a?.level - b?.level));
  };

  // useEffect(() => {
  //     setMonths(generateDateStructure(monthsData, types));
  // }, [updateDayType, updateDayTypeCol, updateDayTypeRow]);

  useEffect(() => {
    setMonths(JSON.parse(localStorage.getItem("months") || "[]"));
    setCalenderId(JSON.parse(localStorage.getItem("calenderId") || "0"));
    setSelectedTopics(
      JSON.parse(localStorage.getItem("selectedTopics") || "[]")
    );
    fetchData();
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        months,
        monthsData,
        subjectsData: subjects,
        setMonths,
        setMonthsData,
        updateDayType,
        updateMonthsData,
        updateDayTypeRow,
        updateDayTypeCol,
        generateInterval,
        types,
        setTypes,
        jobs,
        setJobs,
        subjects,
        setSubjects,
        topics,
        setTopics,
        calenderId,
        setCalenderId,
        selectedTopics,
        setSelectedTopics,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
