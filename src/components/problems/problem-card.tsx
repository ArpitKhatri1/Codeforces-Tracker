
import { cn } from '@/lib/utils'
import { getProblemDate } from '@/utils/getProblemDate'
import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react';
import { ContestListType, RevisionListType, userProblemListResult } from '@/types'
import RevisionStar from '../revision/revision-star-component';
import ProblemTagComponent from '../problemtags/problem-tag-component';
import NotePad from '../notepad/notepad';
type ProblemCardProps = {
    props: userProblemListResult,
    contestList?: ContestListType[] | undefined,
    revisionList: RevisionListType[] | null,
    snippets: snippetType
}
type snippetType = {
    userId: number;
    problemId: number;
    snippetText: string;
}[]
const ProblemCard = ({ snippets, props, contestList, revisionList }: ProblemCardProps) => {

    const colourful = snippets.filter((ele) => ele.problemId === props.id)
    const isColourful = colourful.length > 0 ? true : false;
    const div = contestList?.filter((ele) => (ele.id === props.contestId))
    let numberList: number[] = []
    if (div && div[0]) {
        const arry = div[0].name.split("Div. ")
        arry.shift()
        let num = []
        for (let i = 0; i < arry.length; i++) {
            num.push(Number(arry[i][0]))
        }
        numberList = num
    }

    const divDisplay = `Div ${numberList.length == 1 ? (numberList[0]) : ""}`

    const { day, month, year } = getProblemDate(props.creationTimeSeconds)
    const tagColour = props.problem.rating ? cn(
        "p-1 rounded-lg px-2",
        props.problem.rating <= 1100 && "bg-gray-300 text-gray-700",   // Newbie
        props.problem.rating >= 1200 && props.problem.rating < 1400 && "bg-green-300 text-green-900", // Pupil
        // Specialist
        props.problem.rating >= 1400 && props.problem.rating < 1600 && "bg-teal-300 text-teal-900",  // Expert
        props.problem.rating >= 1600 && props.problem.rating < 1900 && "bg-blue-300", // Candidate Master
        props.problem.rating >= 1900 && props.problem.rating < 2100 && "bg-purple-300", // Master
        props.problem.rating >= 2100 && "bg-red-500"  // Grandmaster+
    ) : null;

    return (
        <div className={cn(`w-full grid grid-cols-10 border-solid border-[1px]  text-black py-3 px-5`)}>
            <div className='col-span-3 flex gap-2 items-center w-full'>
                <Link href={`https://codeforces.com/problemset/problem/${props.contestId}/${props.problem.index}`} target='/'>
                    <div className='grid grid-cols-5   gap-2 items-center w-full'>
                        <div className='col-span-1 w-fit flex gap-1 text-purple-600 font-semibold'>
                            <div className='w-fit flex gap-1'>
                                <div className='w-fit'>
                                    Div</div>                                <div className='w-fit'>
                                    {numberList.length == 1 ? (numberList[0]) : ""}
                                </div>
                            </div>
                            <div className='w-full' >
                                {props.problem.index}
                            </div>
                        </div>
                        <div className='col-span-4 w-fit overflow-clip line-clamp-1 left-0'>
                            {props.problem.name}
                        </div>

                    </div>

                </Link>

            </div>
            <div className='col-span-1 text-center flex gap-5 items-center justify-center'>

                {
                    props.problem.rating ? (

                        <div className={cn(tagColour, "h-fit")}>
                            {props.problem.rating}
                        </div>

                    ) : ""
                }

            </div>

            <ProblemTagComponent problem={props} />

            <div className='col-span-1 text-center text-muted-foreground mt-1 ml-4 flex items-center justify-center'>
                {`${day}/${month}/${year}`}
            </div>
            <div className='col-span-1 flex gap-3 justify-center items-center '>
                <RevisionStar problem={props} revisionList={revisionList} />
            </div>
            <div className="col-span-1 flex gap-3 justify-center items-center">
                <NotePad problem={props} divDisplay={divDisplay} colourful={isColourful} />
            </div>
        </div>
    )
}

export default ProblemCard

