import React from 'react'
import { SquareLibrary } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { Check } from 'lucide-react';

const LandingPage = () => {
  const styles = {
    background: 'linear-gradient(135deg, #fbd7ff, #ffdec1)',
  }

  const features = [
    "Smart problem tracking",
    "Personalized problem tagging",
    "Detailed problem insights & analytics",
    "Notes & problem discussions",
    "Batch problem management",
    "Quick problem notes & snippets",
    "Collaborative coding journal"
  ];

  return (
    <div className='w-full h-full flex flex-col p-3 scrollbar gap-5 flex-shrink-0 relative'>
      <div className=' z-50 fixed w-[50vw] max-w-[1200px] bg-white blur-10 rounded-xl h-16 left-1/2 transform -translate-x-1/2 top-9'>

      </div>
      <div className='w-full h-[900px] rounded-xl' style={styles}>
        <div className='h-1/2 flex justify-center pb-20'>
          <div className='mt-auto text-center flex flex-col items-center justify-center'>
            <div className='text-muted-foreground'>
              Introducing CodeTracker
            </div>
            <div className='mt-8 font-bold text-5xl'>
              Track Your Codeforces Journey Effortlessly
            </div>
            <div className='mt-5 max-w-[40rem] justify-center '>
              Our platform helps you monitor your progress, tag problems, mark for revision, and track your competitive programming journey with a personalized dashboard and insights.
            </div>
          </div>

        </div>
        <div className='relative flex justify-center mt-10 '>
          <div className=' bg-rose-300 w-[90vw] max-w-[1200px] h-[600px] rounded-xl overflow-hidden'>

          </div>

        </div>
      </div>
      <div className='w-full h-[400px] rounded-xl bg-neutral-100'>
      </div>
      <div className='w-full h-[600px] rounded-xl flex justify-center' style={styles}>

        <div className='max-w-[1200px] w-full flex flex-col'>
          <div className='font-bold text-3xl max-w-[30rem] mt-32 mb-16'>
            Everything you need to Track your Codeforces Journey
          </div>
          <div className='flex gap-10'>
            <div className='flex flex-col gap-5 max-w-[20rem]'>
              <div className='p-3 bg-white w-fit rounded-xl'>
                <SquareLibrary className='bg-white rounded-xl h-10 w-10' />
              </div>
              <div className='font-semibold'>Track & Organize Problems</div>

              <div className='text-muted-foreground'>
                You'll have a centralized space to log problems, track your progress, and categorize them using custom tags.
              </div>
            </div>
            <div className='flex flex-col gap-5 max-w-[20rem]'>

              <div className='p-3 bg-white w-fit rounded-xl'>
                <UserRound className='bg-white rounded-xl h-10 w-10' />
              </div>

              <div className='font-semibold'>Candidate relationship management → Smart Problem Management</div>
              <div className='text-muted-foreground'>Mark problems for revision, add snippets, and track your journey effortlessly with an intuitive dashboard.</div>
            </div>
            <div className='flex flex-col gap-5 max-w-[20rem]'>
              <div>
                <div className='p-3 bg-white w-fit rounded-xl'>
                  <SquareLibrary className='bg-white rounded-xl h-10 w-10' />
                </div>
              </div>
              <div className='font-semibold'>Team collaboration → Community & Sharing</div>
              <div className='text-muted-foreground'>Collaborate with friends, share problem lists, and compare your Codeforces journey with others to improve together.</div>
            </div>
          </div>
        </div>

      </div>
      <div className='w-full h-[730px] rounded-xl bg-neutral-100 flex justify-center'>
        <div className='max-w-[1200px] w-full h-full flex'>
          <div className='w-1/2 h-full flex items-center justify-end '>
            <div className='bg-red-100 h-[550px] w-[500px] rounded-xl overflow-hidden'>

            </div>
          </div>
          <div className='w-1/2  flex  gap-10 items-center '>
            <div className='flex flex-col h-[550px] '>
              <div>
                Streamline Your Competitive Programming Journey
              </div>
              <div>
                Our platform is designed to enhance your Codeforces experience by providing powerful tools to track progress, organize problems, and improve efficiency. It's intuitive, fast, and packed with features to help you stay on top of your coding journey.
              </div>
              <div>
                {
                  features.map((ele) => (
                    <div className='flex items-center gap-2 ml-10'>
                      <Check />
                      <div>
                        {ele}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default LandingPage

