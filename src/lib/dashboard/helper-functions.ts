import { getUserProfile } from "@/utils/getUserProfile";
import { userProblemListResult } from "../../types";
import axios from "axios";
const secondsInOneMonth = 2592000;

export function ACProblems(problemList: userProblemListResult[]) {
  const returnList = problemList.filter((problem) => {
    problem.verdict === "OK";
  });
  return returnList;
}

export function TotalSolvedProblems(problemList: userProblemListResult[]) {
  const returnList = ACProblems(problemList);
  return returnList.length;
}

export function AverageDifficultyOfProblemSolved(
  problemList: userProblemListResult[]
) {
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

export function LastSevenDaysBar() {}
