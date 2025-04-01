import { format } from "date-fns";
import { getUserProfile } from "@/utils/getUserProfile";
import { userProblemListResult } from "../../types";
import axios from "axios";
import { codeforcesTags } from "@/constants";

const secondsInOneMonth = 2592000;

export function ACProblems(problemList: userProblemListResult[]) {
  const returnList = problemList.filter((problem) => problem.verdict === "OK");
  return returnList;
}

export function TotalSolvedProblems(problemList: userProblemListResult[]) {
  const returnList = ACProblems(problemList);
  return returnList.length;
}

export function AverageDifficultyOfProblemSolved(
  nacproblemList: userProblemListResult[]
) {
  const problemList = ACProblems(nacproblemList);
  let sum = 0;
  let length = TotalSolvedProblems(problemList);
  problemList.forEach((problem) => {
    if (problem.problem.rating) {
      sum += problem.problem.rating;
    } else {
      length--;
    }
  });
  const average = sum / length;
  return Math.round(average / 100) * 100;
}

export async function UserCurrentRatingAndRank() {
  const profile = await getUserProfile();
  if (!profile) {
    return;
  }
  const handle = profile.handle;
  const res = await axios.get(
    `https://codeforces.com/api/user.info?handles=${handle}`
  );
  let data = res.data.result[0];
  console.log(data);
  return { rating: data.rating, rank: data.rank };
}
export async function UserMaxRatingAndRank() {
  const profile = await getUserProfile();

  if (!profile) {
    return;
  }
  const handle = profile.handle;
  const res = await axios.get(
    `https://codeforces.com/api/user.info?handles=${handle}`
  );
  let data = res.data.result[0];
  console.log(data);
  return { maxRating: data.maxRating, maxRank: data.maxRank };
}

export async function RatingImprovementThisMonth() {
  type CodeforcesContestResult = {
    contestId: number;
    contestName: string;
    handle: string;
    rank: number;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
  };

  const profile = await getUserProfile();
  if (!profile) {
    return;
  }
  const handle = profile.handle;

  const res = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${handle}`
  );
  let data = res.data;
  const resultArray: CodeforcesContestResult[] = data.result;
  const currentTime = Math.floor(Date.now() / 1000);
  let ratingChange = 0;

  resultArray.forEach((ele) => {
    if (currentTime - ele.ratingUpdateTimeSeconds < secondsInOneMonth) {
      ratingChange += ele.newRating - ele.oldRating;
    }
  });
  return ratingChange;
}

export function getDateOfIthDayNonFormatted(i: number): Date {
  const todayDate = new Date();
  const resultDate = new Date();
  resultDate.setDate(todayDate.getDate() + i);
  return resultDate;
}

export function AverageProblemSovledPerDay(
  problemList: userProblemListResult[]
) {
  let problemSolved = 0;
  problemList.forEach((problem) => {
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - problem.creationTimeSeconds > secondsInOneMonth) {
      problemSolved++;
    }
  });
  return problemSolved / 30;
}

export function LastSevenDaysBar(
  nacProblemList: userProblemListResult[] | undefined
) {
  if (!nacProblemList) {
    return;
  }

  const problemList = ACProblems(nacProblemList);

  const todayDate = new Date();
  const formattedDate = format(todayDate, "yyyy-MM-dd");

  const dateArray: string[] = [];
  for (let i = 0; i < 7; i++) {
    const givenDateNonFormatted = getDateOfIthDayNonFormatted(i * -1);
    const givenDate = format(givenDateNonFormatted, "yyyy-MM-dd");
    dateArray.push(givenDate);
  }
  const lastSevenMap = new Map<string, number>();

  dateArray.forEach((date) => {
    lastSevenMap.set(date, 0);
  });

  problemList.forEach((problem) => {
    const dateSovled = new Date(problem.creationTimeSeconds * 1000); // 2025-03-31
    const formattedDateSolved = format(dateSovled, "yyyy-MM-dd");

    if (lastSevenMap.has(formattedDateSolved)) {
      const prev = lastSevenMap.get(formattedDateSolved) ?? 0;
      lastSevenMap.set(formattedDateSolved, prev + 1);
    }
  });
  const colorArray: string[] = [];
  lastSevenMap.forEach((value, key) => {
    if (value >= 7) {
      colorArray.push("bg-emerald-700");
    } else if (value === 0) {
      colorArray.push("bg-neutral-100");
    } else {
      colorArray.push(`bg-emerald-${value * 100}`);
    }
  });
  return colorArray.reverse();
}

export const TagDistribution = (
  problemList: userProblemListResult[] | undefined // contains the fialed responses also
) => {
  if (!problemList) {
    return;
  }
  // reutnr type of {tagname,problemSolved,successRate} sorted in the order of most solved tags
  const tagMap = new Map<string, number[]>();
  const codeforcesTag = codeforcesTags;
  codeforcesTag.map((tag) => {
    tagMap.set(tag, [0, 0, 0, 0]); // solved,failed,total,totalRating
  });

  problemList?.forEach((problem) => {
    if (problem.verdict === "OK") {
      const problemTags = problem.problem.tags;

      problemTags.forEach((tag) => {
        const resArr = tagMap.get(tag);
        if (!resArr) {
          return;
        }
        let total = resArr[2];
        let solved = resArr[0];
        const failed = resArr[1];
        let avgRating = resArr[3];
        avgRating += problem.problem.rating ?? 0;

        total += 1;
        solved += 1;
        tagMap.set(tag, [solved, failed, total, avgRating]);
      });
    } else {
      const problemTags = problem.problem.tags;
      problemTags.forEach((tag) => {
        const resArr = tagMap.get(tag);
        if (!resArr) {
          return;
        }
        let total = resArr[2];
        const solved = resArr[0];
        let failed = resArr[1];
        let avgRating = resArr[3];

        failed += 1;
        total += 1;

        tagMap.set(tag, [solved, failed, total, avgRating]);
      });
    }
  });
  const returnObject = Object.fromEntries(tagMap);
  console.log(returnObject);
};

export const DifficultyDistribution = (
  problemList: userProblemListResult[] | undefined
) => {
  if (!problemList) {
    return;
  }
  const ratingArray = [
    "800-1100", // Newbie
    "1200-1300", // Pupil
    "1400-1500", // Expert
    "1600-1800", // Candidate Master
    "1900-2000", // Master
    "2100-3000", // Grandmaster
  ];

  const ratingMap = new Map<string, number[]>(); // solved ,failed,total
  ratingArray.forEach((rating) => {
    ratingMap.set(rating, [0, 0, 0]);
  });

  problemList?.forEach((problem) => {
    if (problem.verdict === "OK") {
      const problemRating = problem.problem.rating;
      if (!problemRating) {
        return;
      }

      ratingArray.forEach((ratingRange) => {
        const lowerRating = parseInt(ratingRange.split("-")[0]);
        const upperRating = parseInt(ratingRange.split("-")[1]);
        if (problemRating <= upperRating && problemRating >= lowerRating) {
          const resArr = ratingMap.get(ratingRange);
          if (!resArr) {
            return;
          }
          let total = resArr[2];
          let solved = resArr[0];
          const failed = resArr[1];
          total += 1;
          solved += 1;
          ratingMap.set(ratingRange, [solved, failed, total]);
        }
      });
    } else {
      const problemRating = problem.problem.rating;
      if (!problemRating) {
        return;
      }

      ratingArray.forEach((ratingRange) => {
        const lowerRating = parseInt(ratingRange.split("-")[0]);
        const upperRating = parseInt(ratingRange.split("-")[1]);
        if (problemRating <= upperRating && problemRating >= lowerRating) {
          const resArr = ratingMap.get(ratingRange);
          if (!resArr) {
            return;
          }
          let total = resArr[2];
          let solved = resArr[0];
          let failed = resArr[1];
          failed++;
          total++;
          ratingMap.set(ratingRange, [solved, failed, total]);
        }
      });
    }
  });

  console.log(ratingMap);
  const returnObject = Object.fromEntries(ratingMap);
  return returnObject;
};
