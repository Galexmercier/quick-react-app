type CourseEntry = {
    id: string,
    term: string,
    number: string,
    meets: string,
    title: string
};

interface courseList {
  title: String,
  courses: Record<string, CourseEntry>
}

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

export const timeParts = (meets: string) => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: parseInt(hh1) * 60 + parseInt(mm1) * 1,
      end: parseInt(hh2) * 60 + parseInt(mm2) * 1
    }
  };
};

const mapValues = (fn: (input: CourseEntry) => CourseEntry & ReturnType<typeof timeParts>, obj: Record<string, CourseEntry>) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = (course: CourseEntry) => ({
  ...course,
  ...timeParts(course.meets)
});

const days = ['M', 'Tu', 'W', 'Th', 'F'];

const daysOverlap = (days1: string, days2: string) => ( 
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1: any, hours2: any) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1: CourseEntry & ReturnType<typeof timeParts>, course2: CourseEntry & ReturnType<typeof timeParts>) => (
  course1.days && course2.days && daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const courseConflict = (course1: CourseEntry, course2: CourseEntry) => (
  course1.term === course2.term && timeConflict(addCourseTimes(course1), addCourseTimes(course2))
);

export const addScheduleTimes = (schedule: courseList) => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

export const hasConflict = (course: CourseEntry, selected: CourseEntry[]) => (
  selected.some(selection => courseConflict(course, selection))
);