import { userProblemList } from "@/types";

export const fetchProblems = async (
  handle: string
): Promise<userProblemList | null> => {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}&from=1`,
      {
        cache: "no-store",
      }
    );

    const data: userProblemList = await res.json();
    const filteredData = data.result.filter(
      (element) => element.verdict === "OK"
    );

    // const demoUserProblemList = [
    //   {
    //     id: 123456,
    //     contestId: 9876,
    //     creationTimeSeconds: 1711046400,
    //     relativeTimeSeconds: 3600,
    //     problem: {
    //       contestId: 9876,
    //       index: "A",
    //       name: "Two Sum Problem",
    //       type: "PROGRAMMING",
    //       points: 500,
    //       rating: 1200,
    //       tags: ["math", "implementation"],
    //     },
    //     author: {
    //       contestId: 9876,
    //       members: [{ handle: "coolcoder123" }],
    //       participantType: "CONTESTANT",
    //       ghost: false,
    //       room: 42,
    //       startTimeSeconds: 1711042800,
    //     },
    //     programmingLanguage: "C++",
    //     verdict: "OK",
    //     testset: "PRETESTS",
    //     passedTestCount: 10,
    //     timeConsumedMillis: 50,
    //     memoryConsumedBytes: 256000,
    //   },
    // ];

    // return { status: "OK", result: demoUserProblemList };

    return { status: data.status, result: filteredData };
  } catch (error) {
    console.error("Error fetching problems:", error);
    return null;
  }
};
