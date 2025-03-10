import { emptyDayType, MonthData, defaultDayType, DayType } from "../types/types";
export const arabicMonths: { [key: number]: string } = {
  0: "يناير",
  1: "فبراير",
  2: "مارس",
  3: "أبريل",
  4: "مايو",
  5: "يونيو",
  6: "يوليو",
  7: "أغسطس",
  8: "سبتمبر",
  9: "أكتوبر",
  10: "نوفمبر",
  11: "ديسمبر",
};

export const generateDateStructure = (months: { startDate: string; endDate: string }[], types: DayType[]): MonthData[] => {
  const result: MonthData[] = [];
  months.forEach(({ startDate, endDate }, index) => {
    if (!startDate || !endDate) return
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthEntry: MonthData = {
      totalTrainingHours: 0,
      totalDayLearningHours: 0,
      totalNightLearningHours: 0,
      totalBoundEducationHours: 0,
      month: index + 1,
      monthName: arabicMonths[getMostRepeatedMonthNumber(startDate, endDate)],
      startDate,
      endDate,
      weeks: [],
    };
    let current = new Date(start);
    monthEntry.weeks.push({
      totalTrainingHours: 0,
      totalDayLearningHours: 0,
      totalNightLearningHours: 0,
      totalBoundEducationHours: 0,
      weekNumber: 1,
      days: []
    })
    if (start.getDay() < 6) {
      for (let i = 0; i <= start.getDay(); i++) {
        monthEntry.weeks[0].days.push({
          date: 'yyyy-mm-dd',
          type: { ...emptyDayType },
        })
      }
    }
    let weekIndex = 0
    while (current <= end) {
      if (monthEntry.weeks[weekIndex].days.length === 7) {
        weekIndex++;
        monthEntry.weeks.push({
          totalTrainingHours: 0,
          totalDayLearningHours: 0,
          totalNightLearningHours: 0,
          totalBoundEducationHours: 0,
          weekNumber: weekIndex + 1,
          days: []
        })
      }
      monthEntry.weeks[weekIndex].days.push({
        date: current.toLocaleDateString("en-CA"),
        type: getDayType(current.getDay(), types),
      });
      current.setUTCDate(current.getUTCDate() + 1);
    }
    while (monthEntry.weeks[weekIndex].days.length < 7) {
      monthEntry.weeks[weekIndex].days.push({
        date: 'yyyy-mm-dd',
        type: { ...emptyDayType },
      })
    }
    if (!checkMonth(monthEntry))
      result.push(monthEntry);
  });


  return buildMonthsTree(result);
};
export const buildMonthsTree = (months: MonthData[]) => {
  months.forEach((month) => {
    month.weeks.forEach((week) => {
      week.totalTrainingHours = week.days.reduce((acc, day) => acc + day.type.trainingHours, 0)
      week.totalDayLearningHours = week.days.reduce((acc, day) => acc + day.type.dayLearningHours, 0)
      week.totalNightLearningHours = week.days.reduce((acc, day) => acc + day.type.nightLearningHours, 0)
      week.totalBoundEducationHours = week.days.reduce((acc, day) => acc + day.type.boundEducationHours, 0)
    })
    month.totalTrainingHours = month.weeks.reduce((acc, week) => acc + week.totalTrainingHours, 0)
    month.totalDayLearningHours = month.weeks.reduce((acc, week) => acc + week.totalDayLearningHours, 0)
    month.totalNightLearningHours = month.weeks.reduce((acc, week) => acc + week.totalNightLearningHours, 0)
    month.totalBoundEducationHours = month.weeks.reduce((acc, week) => acc + week.totalBoundEducationHours, 0)
  })
  return months;
}

const getDayType = (dayNumber: number, types: DayType[]): DayType => {
  const longDay = types.find((type) => type.name === 'يوم طويل') || defaultDayType
  const shortDay = types.find((type) => type.name === 'يوم قصير') || defaultDayType
  const maintenanceDay = types.find((type) => type.name === 'صيانة') || defaultDayType
  const vacationDay = types.find((type) => type.name === "راحة اسبوعية") || defaultDayType
  const boundEducationDay = types.find((type) => type.name === 'تعليم منضم') || defaultDayType
  if (dayNumber === 0 || dayNumber === 3) return longDay
  else if (dayNumber === 1 || dayNumber === 6) return shortDay
  else if (dayNumber === 4) return boundEducationDay
  else if (dayNumber === 5) return vacationDay
  else return maintenanceDay
}

const getMostRepeatedMonthNumber = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const monthCount: { [month: number]: number } = {};

  while (start <= end) {

    const monthNumber = start.getMonth();
    monthCount[monthNumber] = (monthCount[monthNumber] || 0) + 1;
    start.setUTCDate(start.getUTCDate() + 1);
  }
  let mostRepeatedMonth = -1;
  let maxCount = 0;

  Object.entries(monthCount).forEach(([month, count]) => {
    if (count > maxCount) {
      mostRepeatedMonth = Number(month);
      maxCount = count;
    }
  });

  return mostRepeatedMonth;
};

const checkMonth = (month: MonthData): boolean => {
  let total = 0
  let nullDays = 0
  month.weeks.forEach((week) => {
    week.days.forEach((day) => {
      total++;
      if (day.date === 'yyyy-mm-dd')
        nullDays++
    })
  })
  return total === nullDays
}

export const generateTotals = (month: MonthData) => {
  let totalTrainingHours: number[] = []
  let totalDayLearningHours: number[] = []
  let totalNightLearningHours: number[] = []
  let totalBoundEducationHours: number[] = []

  month.weeks.forEach((week) => {
    totalTrainingHours.push(week.days.reduce((acc, day) => acc + day.type.trainingHours, 0))
    totalDayLearningHours.push(week.days.reduce((acc, day) => acc + day.type.dayLearningHours, 0))
    totalNightLearningHours.push(week.days.reduce((acc, day) => acc + day.type.nightLearningHours, 0))
    totalBoundEducationHours.push(week.days.reduce((acc, day) => acc + day.type.boundEducationHours, 0))
  })

  return { totalTrainingHours, totalDayLearningHours, totalNightLearningHours, totalBoundEducationHours }
}
export const Totals = (months: MonthData[]) => {
  let totalTrainingHours: number = 0
  let totalDayLearningHours: number = 0
  let totalNightLearningHours: number = 0
  let totalBoundEducationHours: number = 0
  months.forEach((month) => {
    month.weeks.forEach((week) => {
      totalTrainingHours += week.days.reduce((acc, day) => acc + day.type.trainingHours, 0)
      totalDayLearningHours += week.days.reduce((acc, day) => acc + day.type.dayLearningHours, 0)
      totalNightLearningHours += week.days.reduce((acc, day) => acc + day.type.nightLearningHours, 0)
      totalBoundEducationHours += week.days.reduce((acc, day) => acc + day.type.boundEducationHours, 0)
    })
  })
  return { totalTrainingHours, totalDayLearningHours, totalNightLearningHours, totalBoundEducationHours }
}