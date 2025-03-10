import { disInterval, MonthData, TopicsDistributionData, GeneralTopicDistribution, SpecializedTopicsDistribution, disWeek, month546, disMonth, day546, day546Data, week546 } from "../types/types"
import { Subject, Job, Topic } from "../interfaces"
export const distribute = (num: number, len: number) => {
  const result: number[] = new Array(len).fill(0);
  if (len * 2 > num) {
    for (let i = 0; i < len; i++) {
      if (num > 0) {
        result[i] = 2;
        num -= 2;
      }
    }
    return result
  }
  const div = Math.floor(num / (len * 2))
  let rem = num % (len * 2)
  for (let i = 0; i < len; i++) {
    if (rem > 0) {
      result[i] = div * 2 + 2
      rem -= 2
    } else {
      result[i] = div * 2
    }
  }
  return result

}
const create2DArray = (rows: number, cols: number, initialValue: number): number[][] => {
  const array: number[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row[j] = initialValue;
    }
    array.push(row);
  }
  return array;
};
const create2DStringArray = (rows: number, cols: number, initialValue: string): string[][] => {
  const array: string[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      row[j] = initialValue;
    }
    array.push(row);
  }
  return array;
};


export const daysDistribution = (jobs: Job[], subjects: Subject[], week: any, weekData: any, type: string) => {
  let rows: number[] = []
  let cols: number[] = []


  week.days.forEach((day: any) => {
    if (type === 'day')
      cols.push(day.type.dayLearningHours)
    else
      cols.push(day.type.nightLearningHours)
  });
  let generalSubjectsTotal = 0
  let specificSubjectsTotal = 0
  weekData.forEach((value: number, index: number) => {
    if (subjects[index].type === 'specific') specificSubjectsTotal += value
    else generalSubjectsTotal += value
    rows.push(value)
  })
  let mat = create2DArray(rows.length, cols.length, 0)
  for (let step = 0; step < 10; step++) {
    for (let i = 0; i < cols.length; i++) {
      let cnt = 0, cnt1 = 0
      for (let j = 0; j < rows.length; j++) {
        if (subjects[j].type === 'specific' && Math.min(rows[j], cols[i]) >= 2 && cnt < 4) {
          mat[j][i] += 2
          rows[j] -= 2
          cols[i] -= 2
          cnt += 2
        }
        if (subjects[j].type === 'general' && Math.min(rows[j], cols[i]) >= 2 && cnt1 < 2) {
          mat[j][i] += 2
          rows[j] -= 2
          cols[i] -= 2
          cnt1 += 2
        }
      }
    }
  }

  let the545 = create2DStringArray(rows.length, cols.length, '')
  for (let i = 0; i < cols.length; i++) {
    let cnt = type === 'day' ? 1 : 4
    for (let j = 0; j < rows.length; j++) {
      if (mat[j][i] === 2) {
        the545[j][i] = `2/${cnt}`
        cnt++;
      } else if (mat[j][i] === 4) {
        the545[j][i] = `4/${cnt},${cnt + 1}`
        cnt += 2;

      } else if (mat[j][i] === 6) {
        the545[j][i] = `6/${cnt},${cnt + 1},${cnt + 2}`
        cnt += 3
      }
    }
  }
  const the545jobs: any = []
  const theMatjobs: any = []
  jobs.forEach((job, jobId) => {
    const tempMat = mat.map(row => [...row])
    const temp545 = the545.map(row => [...row])
    const totals: number[] = Array(7).fill(0)
    const totals545: string[] = Array(7).fill('')
    tempMat.forEach((row, index) => {
      if (subjects[index].type === 'specific' && !job.subjects.find(id => id === subjects[index].id)) {
        row.forEach((value, i) => {
          totals[i] += value
          tempMat[index][i] = 0
        })
      }
    })
    for (let i = 0; i < 7; i++) {
      const temp = []
      for (let j = 0; j < rows.length; j++) {
        if (tempMat[j][i] === 0 && temp545[j][i] !== '') {
          temp.push(temp545[j][i].split('/')[1])
          temp545[j][i] = ''
        }
      }
      totals545[i] = totals[i] ? `${totals[i]}/${temp.join(',')}` : ''
    }
    the545jobs.push({ mat: temp545, totals: totals545 })
    theMatjobs.push({
      mat: tempMat,
      totals: totals
    })
  })
  return { theMatjobs, cols, rows, the545jobs, mat }
}
export const weeksDistribution = (jobs: Job[], subjects: Subject[], month: MonthData, monthData: number[], type: string) => {
  let rows: number[] = []
  let cols: number[] = []
  let weeksTotal: number[] = []
  month.weeks.forEach((week: any) => {
    if (type === 'day')
      cols.push(week.totalDayLearningHours)
    else
      cols.push(week.totalNightLearningHours)
  })

  monthData.forEach((value: any, index: number) => {
    rows.push(value)
  })
  weeksTotal = [...cols]
  const distributionResult = matrixEvenDistribution(rows, cols);
  const the547jobs: any = []
  jobs.forEach((job, index) => {
    const temp547 = distributionResult.mat.map(row => [...row])
    const temp: number[] = []
    month.weeks.forEach(week => temp.push(0))
    subjects.forEach((subject, subjectIndex) => {
      if (subject.type === 'specific' && !job.subjects.find((subjectId) => subjectId === subject.id)) {
        temp.forEach((value, index) => {
          temp[index] += temp547[subjectIndex][index]
          temp547[subjectIndex][index] = 0
        })
      }
    })
    the547jobs.push({ mat: temp547, totals: temp })
  })
  return { ...distributionResult, the547jobs, weeksTotal }
}
export const monthsDistribution = (jobs: Job[], months: MonthData[], subjects: Subject[], totalLearingHours: number, type: string) => {

  let rows: number[] = []
  let cols: number[] = []
  months.forEach((month: any) => {
    if (type === 'day')
      cols.push(month.totalDayLearningHours)
    else
      cols.push(month.totalNightLearningHours)
  })

  subjects.forEach((subject: any) => {
    rows.push(subject.totalHours)
  })
  let dif = totalLearingHours - rows.reduce((acc, value) => acc + value, 0)
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] % 2 === 1 && dif > 0) {
      rows[i]++
      dif--
    }
  }

  const temp: number[] = distribute(dif, rows.length)

  for (let i = 0; i < rows.length; i++) {
    rows[i] += temp[i]
  }
  const finalDistribution: disInterval = {
    cols: [],
    rows: [],
    mat: [][5],
    months: []
  }
  const intervalDistribution = matrixEvenDistribution(rows, cols)
  finalDistribution.cols = intervalDistribution.cols
  finalDistribution.rows = intervalDistribution.rows
  finalDistribution.mat = intervalDistribution.mat
  months.forEach((month: any, monthId: number) => {
    const monthDistribution = weeksDistribution(jobs, subjects, month, finalDistribution.mat.map((row) => row[monthId]), type)
    finalDistribution.months.push({ cols: monthDistribution.cols, rows: monthDistribution.rows, mat: monthDistribution.mat, weeks: [], the547jobs: monthDistribution.the547jobs })

  })
  months.forEach((month: any, monthId: number) => {
    month.weeks.forEach((week: any, weekId: number) => {
      const weekDistribution = daysDistribution(jobs, subjects, week, finalDistribution.months[monthId].mat.map((row) => row[weekId]), type)
      finalDistribution.months[monthId].weeks.push({ cols: weekDistribution.cols, rows: weekDistribution.rows, matjobs: weekDistribution.theMatjobs, the545jobs: weekDistribution.the545jobs, the546: create2DStringArray(subjects.length, 7, ' -1'), mat: weekDistribution.mat })
    })
  })
  return finalDistribution
}
const matrixEvenDistribution = (rows: number[], cols: number[]) => {
  let mat = create2DArray(rows.length, cols.length, 0)
  let maxIterations = 500;
  let iteration = 0;
  while (rows.reduce((acc, value) => acc + value, 0) > 0 && iteration < maxIterations) {
    iteration++;
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < cols.length; j++) {
        if (Math.min(rows[i], cols[j]) >= 2) {
          mat[i][j] += 2
          rows[i] -= 2
          cols[j] -= 2
        }
      }
    }
  }
  return { mat, cols, rows }
}


export const dayTopicsDistribution = (subjects: Subject[], dayDistribution: disInterval, topics: Topic[], jobs: Job[]) => {
  const finalResult: TopicsDistributionData[] = []
  jobs.forEach((job, jobId) => {
    const totals: number[] = Array(dayDistribution.months.length).fill(0)
    const result: TopicsDistributionData = { specializedTopicsDistribution: { topicDistribution: [], totals: [] }, GeneralTopicsDistribution: [] }
    subjects.forEach((subject, index) => {
      if (subject.type === 'specific' && !job.subjects.find(id => id === subject.id)) {
        dayDistribution.mat[index].forEach((value, i) => {
          totals[i] += value
        })
      }
      const subjectTopics = topics.filter((topic) => topic?.subject === subject?.id && topic?.day && (topic?.job === job?.id || topic?.job === null))
      let subjectTotal = dayDistribution.mat[index].reduce((acc, value) => acc + value, 0)


      const topicDistribution = distributeTopics(subjectTotal, subjectTopics.length, [...dayDistribution.mat[index]])

      result.GeneralTopicsDistribution.push({ subject: subject.id, mat: topicDistribution })
    })
    //Specialized technical training
    const jobTopics = topics.filter((topic) => topic?.job === job?.id && topic?.day)

    const topicDistribution = distributeTopics(totals.reduce((value, acc) => acc + value, 0), jobTopics.length, [...totals])
    result.specializedTopicsDistribution = { topicDistribution, totals }
    finalResult.push(result)
  }
  )
  return finalResult
}
export const nightTopicsDistribution = (subjects: Subject[], nightDistribution: disInterval, topics: Topic[], jobs: Job[]) => {
  const finalResult: TopicsDistributionData[] = []
  jobs.forEach((job, jobId) => {
    const totals: number[] = Array(nightDistribution.months.length).fill(0)
    const result: TopicsDistributionData = { specializedTopicsDistribution: { topicDistribution: [], totals: [] }, GeneralTopicsDistribution: [] }
    subjects.forEach((subject, index) => {
      if (subject.type === 'specific' && !job.subjects.find(id => id === subject.id)) {
        nightDistribution.mat[index].forEach((value, i) => {
          totals[i] += value
        })
      }
      const subjectTopics = topics.filter((topic) => topic?.subject === subject?.id && topic?.night && (topic?.job === job?.id || topic?.job === null))
      let subjectTotal = nightDistribution.mat[index].reduce((acc, value) => acc + value, 0)
      const topicDistribution = distributeTopics(subjectTotal, subjectTopics.length, [...nightDistribution.mat[index]])
      result.GeneralTopicsDistribution.push({ subject: subject.id, mat: topicDistribution })
    })
    //Specialized technical training
    const jobTopics = topics.filter((topic) => topic?.job === job?.id && topic?.night)

    const topicDistribution = distributeTopics(totals.reduce((value, acc) => acc + value, 0), jobTopics.length, [...totals])

    result.specializedTopicsDistribution = { topicDistribution, totals }
    finalResult.push(result)
  }
  )
  return finalResult
}
const distributeTopics = (totalHours: number, topicsLength: number, totals: number[]) => {
  let col: number[] = distribute(totalHours, topicsLength)
  let row: number[] = [...totals]
  const topicDistribution = create2DArray(col.length, row.length, 0)
  for (let i = 0; i < col.length; i++) {
    for (let j = 0; j < row.length; j++) {
      const temp = Math.min(row[j], col[i])
      topicDistribution[i][j] = temp
      row[j] -= temp
      col[i] -= temp

    }
  }
  return topicDistribution
}
export const the546 = (subjects: Subject[], TopicsDistribution: TopicsDistributionData, month547: disMonth, topics: Topic[], monthId: number, type: string, job: Job, jobId: number) => {
  if (!subjects.length || !job) return month547
  subjects.forEach((subject, subjectId) => {
    const subjectTopics = type === 'day' ? topics.filter((topic) => topic?.subject === subject.id && topic?.day && (topic?.job === job.id || topic?.job === null))
      : topics.filter((topic) => topic?.subject === subject.id && topic?.night && (topic?.job === job.id || topic?.job === null))
    const topicsDistribution = TopicsDistribution.GeneralTopicsDistribution.find((item) => item?.subject === subject.id)?.mat.map((row: number[]) => [...row]) || [][5]
    month547.weeks.forEach((week) => {

      for (let i = 0; i < 7; i++) {
        let temp = []
        for (let j = 2; j <= week.mat[subjectId][i]; j += 2) {
          const index = topicsDistribution?.findIndex((row: number[]) => row[monthId] > 0)
          if (index !== -1) {
            temp.push(subjectTopics[index || 0]?.id)
            topicsDistribution[index][monthId] -= 2
          }
        }
        week.the546[subjectId][i] = temp.join(',')
      }
    })
  })

  const specializedTopicsDistribution = TopicsDistribution.specializedTopicsDistribution.topicDistribution.map((row) => [...row])
  const jobTopics = type === 'day' ? topics.filter((topic) => topic?.job === job.id && topic?.day)
    : topics.filter((topic) => topic.job === job.id && topic.night)

  month547.weeks.forEach((week) => {
    subjects.forEach((subject, subjectId) => {
      if (subject.type === 'specific' && !job.subjects.find(id => id === subject.id)) {
        for (let i = 0; i < 7; i++) {
          let temp = []
          for (let j = 2; j <= week.mat[subjectId][i]; j += 2) {
            const index = specializedTopicsDistribution.findIndex((row: number[]) => row[monthId] > 0)
            if (index !== -1) {
              temp.push(jobTopics[index || 0]?.id)
              specializedTopicsDistribution[index][monthId] -= 2
            }
          }
          week.the546[subjectId][i] = temp.join(',')
        }
      }
    })
  })
  return month547
}
export const the548 = (subjects: Subject[], month547: disMonth, topics: Topic[], job: Job) => {
  const result: { subject: string, total: number, weeks: any }[] = []
  const temp = {
    subject: 'تد فني تخصصي', total: 0, weeks: [
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
    ]
  }
  subjects.forEach((subject, subjectId) => {

    const weekResult: any[] = []
    let monthTotal = 0
    month547.weeks.forEach((week, weekId) => {
      const frequencyMap = new Map<string, number>();
      let weekTotal = 0
      for (let i = 0; i < 7; i++) {
        if (week.the546[subjectId][i] !== '- 1') {
          week.the546[subjectId][i].split(',').map(Number).forEach((topicId) => {
            const topic = topics.find(topic => topic?.id === topicId)
            if (topic) {
              if (subject.type === 'specific' && !job?.subjects.find(value => value === subject.id)) {
                temp.weeks[weekId].frequencyMap.set(topic?.name, (temp.weeks[weekId].frequencyMap.get(topic?.name) || 0) + 2);
                temp.total += 2
                temp.weeks[weekId].weekTotal += 2
              } else {
                frequencyMap.set(topic?.name, (frequencyMap.get(topic?.name) || 0) + 2);
                weekTotal += 2
              }
            }
          })


        }
      }
      weekResult.push({ weekTotal, frequencyMap })
      monthTotal += weekTotal
    })
    if ((subject.type === 'specific' && job?.subjects.find(value => value === subject.id)) || subject.type === 'general')
      result.push({ subject: subject.label, total: monthTotal, weeks: weekResult })
  })
  return [temp, ...result]
}
