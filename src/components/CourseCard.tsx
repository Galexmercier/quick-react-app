interface CourseProps {
    term: string;
    number: string;
    meets: string;
    title: string;
};

const CourseCard = ({term, number, meets, title}: CourseProps) => (
    <div className={"flex flex-col items-left h-50 p-4 gap-4 border-2 border-gray-400 rounded-lg"}>
        <div className="font-black text-xl">
            { term } CS { number }
        </div>
        <div className="flex-grow text-xs">
            { title }
        </div>
        <hr className="border-0.5 border-gray-400"></hr>
        <div className="text-xs">
            { meets }
        </div>
  </div>
);

export default CourseCard;