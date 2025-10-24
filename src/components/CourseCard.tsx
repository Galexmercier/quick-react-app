import { useNavigate } from "react-router-dom";
import { useUserState } from "../utilities/firebase";

interface CourseProps {
    id: string,
    term: string;
    number: string;
    meets: string;
    title: string;
};

const CourseCard = (CourseCardProps: CourseProps) => {
    const navigate = useNavigate();
    const user = [useUserState];

    return (
        <div className={"flex flex-col items-left h-50 p-4 gap-4 border-2 border-gray-400 rounded-lg"}>
            <div className="flex justify-between items-start">
                <div className="font-black text-xl">
                    { CourseCardProps.term } CS { CourseCardProps.number }
                </div>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm" onClick={!user ? () => {alert("Please sign in first")} : () => navigate('/edit', { state: CourseCardProps })}>edit</button>
            </div>
            <div className="flex-grow text-xs">
                { CourseCardProps.title }
            </div>
            <hr className="border-0.5 border-gray-400"></hr>
            <div className="text-xs">
                { CourseCardProps.meets }
            </div>
        </div>
    )
};

export default CourseCard;