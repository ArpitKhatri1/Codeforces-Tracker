export type userProblemListResult = {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    type: string;
    points?: number; // Optional, as it might not always exist
    tags: string[];
  };
  author: {
    contestId: number;
    members: {
      handle: string;
    }[];
    participantType: string;
    ghost: boolean;
    room: number;
    startTimeSeconds: number;
  };
  programmingLanguage: string;
  verdict: string; // Could be narrowed down to specific values like "OK", "WRONG_ANSWER", etc.
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
};
export type userProblemList = {
  status: string;
  result: userProblemListResult[];
};
