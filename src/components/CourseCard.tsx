import { useNavigate } from "react-router-dom";
import { useProfile } from "../utilities/profile";

interface CourseProps {
    id: string,
    term: string;
    number: string;
    meets: string;
    title: string;
};

const CourseCard = (CourseCardProps: CourseProps) => {
    const navigate = useNavigate();
    
    const [user, isAdmin, profileLoading, profileError] = useProfile();
    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;

    return (
        <div className={"flex flex-col items-left h-50 p-4 gap-4 border-2 border-gray-400 rounded-lg"}>
            <div className="flex justify-between items-start">
                <div className="font-black text-xl">
                    { CourseCardProps.term } CS { CourseCardProps.number }
                </div>
                {user && isAdmin ? (<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm" 
                            onClick={() => navigate('/edit', { state: CourseCardProps })}>
                            edit
                        </button>
                    ) : (<></>)}
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