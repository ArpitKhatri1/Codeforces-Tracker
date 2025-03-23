import { getUserProfile } from "@/utils/getUserProfile";
import { userProblemListResult } from "./../../types";
import axios from "axios";

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

export async function UserCurrentRatingandRank() {
  const profile = await getUserProfile();
  if (!profile) {
    return;
  }
  const handle = profile.handle;
  const res = await axios.get(
    `https://codeforces.com/api/user.info?handles=${handle}`
  );
  let data = res.data;
  return { rating: data.rating, rank: data.rank };
}

export async function UserMaxRating() {
  const profile = await getUserProfile();
  if (!profile) {
    return;
  }
  const handle = profile.handle;
  const res = await axios.get(
    `https://codeforces.com/api/user.info?handles=${handle}`
  );
  let data = res.data;
  return { maxRating: data.maxRating, maxRank: data.maxRank };
}
