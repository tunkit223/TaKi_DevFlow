import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/filters/HomeFilters";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import errorHandler from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { create } from "domain";
import Link from "next/link";

const questions = [
  { 
    _id: "1", 
    title: "How to use Next.js?", 
    description:" Next.js is a React framework that enables server-side rendering and static site generation. It allows developers to build fast and optimized web applications with ease.",
    tags: [
      {_id:"1", name: "Next.js"},
      {_id:"2", name: "React"},
      {_id:"3", name: "React"},
    ], 
    author:{_id:"1", name: "John Doe", image:"/images/author.png"},
    upvotes: 10,
    answers: 5,
    views: 100,
    createAt: new Date("2023-03-22"),
  },
  { 
    _id: "2", 
    title: "How to learn Javascript?", 
    description:" Next.js is a React framework that enables server-side rendering and static site generation. It allows developers to build fast and optimized web applications with ease.",
    tags: [
      {_id:"1", name: "Next.js"},
      {_id:"2", name: "Javascript"},
      {_id:"3", name: "JavaScript"},
    ], 
    author:{_id:"1", name: "John Doe", image:"/images/author.png"},
    upvotes: 10,
    answers: 5,
    views: 100,
    createAt: new Date(),
  },
]

const test = async () =>{
  try {
    throw new Error("Test error")
  } catch (error) {
    return errorHandler(error)
  }
}

interface SearchParams {
  searchParams: Promise<{[key:string]:string}>
}
export default async function Home({searchParams}:SearchParams) {

  await test()
  

  const {query = "",filter = ""} = await searchParams;

  const filterQuestions = questions.filter((question) => {
    const matchesQuery = question.title
          .toLowerCase()
          .includes(query.toLowerCase());
    const matchesFilter = filter
          ? question.tags.some((tag) => 
            tag.name.toLowerCase() === filter.toLowerCase()):true
          return matchesQuery && matchesFilter;
  }
)
  
 
  return (
    <>
    <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
      <h1 className="h1-bold text-dark100_light900">All Questions</h1>
      <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
        <Link href={ROUTES.ASK_QUESTION}>
        Ask a Question
        </Link>
      </Button>
    </section>

    <section className="mt-11">
      <LocalSearch
        route="/"
        imgSrc="/icons/search.svg"
        placeholder="Search questions..."
        otherClasses="flex-1"
      />
    </section>

   <HomeFilters/>

    <div className="mt-10 flex w-full flex-col gap-6">
      {filterQuestions.map((question) => (
        <QuestionCard 
          key={question._id} 
          question={question}
        />
      ))}
    </div>
    </>
  );
}
