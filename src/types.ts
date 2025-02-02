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
    rating?: number;
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

export type UserProfile = {
  lastName: string;
  lastOnlineTimeSeconds: number;
  rating: number;
  friendOfCount: number;
  titlePhoto: string;
  handle: string;
  avatar: string;
  firstName: string;
  contribution: number;
  organization: string;
  rank: string;
  maxRating: number;
  registrationTimeSeconds: number;
  maxRank: string;
};

export type UserProfileResponse = {
  status: string;
  result: UserProfile[];
};

export type ContestListType = {
  id: number;
  name: string;
  type: string;
  phase: "BEFORE" | "ACTIVE" | "FINISHED"; // Assuming these are the possible phases
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
};

export type RevisionListType = {
  userId: number;
  problemContestId: number;
  problemId: number;
};
