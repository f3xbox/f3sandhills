import Link from 'next/link';

/**
 * TODO: refactor the enums & types in this component 
 * to dynamically infer from JSON schema 
 * to reduce redundancy and simplify maintainability
 */

export const WorkoutStyles = {
  MURPH: 'Murph',
  BEATDOWN: 'Beatdown',
  RUN: 'Run',
  TRAIL_RUN: 'Trail Run',
  RUCKING: 'Ruck',
  RUCKS_SANDBAGS: 'Rucks & Sandbags',
  WEIGHT_LIFTING: 'Weight Lifting',
  THIRD_F: '3rd F (Faith)',
};
export const WorkoutDays = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
};
function dayToNumber(day: string) {
  return Object.values(WorkoutDays).indexOf(day);
}
function timeToNumber(time: string) {
  return Object.values(WorkoutTimes).indexOf(time);
}
export function sortWorkouts(workouts: WorkoutCardProps[]) {
  const decimalPrecision = 100;
  return workouts.sort((a, b) => {
    return (
      dayToNumber(a.day) +
      timeToNumber(a.time) / decimalPrecision -
      (dayToNumber(b.day) + timeToNumber(b.time) / decimalPrecision)
    );
  });
}
export function workoutsTomorrow(workouts: WorkoutCardProps[]) {
  const result = workouts.filter((w) => {
    const today = new Date().getDay();
    const days = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };
    switch (today) {
      case days.SUNDAY:
        return w.day === WorkoutDays.MONDAY;
      case days.MONDAY:
        return w.day === WorkoutDays.TUESDAY;
      case days.TUESDAY:
        return w.day === WorkoutDays.WEDNESDAY;
      case days.WEDNESDAY:
        return w.day === WorkoutDays.THURSDAY;
      case days.THURSDAY:
        return (
          w.day === WorkoutDays.FRIDAY
        );
      case days.FRIDAY:
        return (
          w.day === WorkoutDays.SATURDAY
        );
      case days.SATURDAY:
        return w.day === WorkoutDays.SUNDAY;
      default:
        return false;
    }
  });
  sortWorkouts(result);
  return result;
}
export function workoutsAnotherDay(workouts: WorkoutCardProps[]) {
  const result = workouts.filter(
    (w) => !workoutsTomorrow(workouts).includes(w)
  );
  sortWorkouts(result);
  return result;
}
export const WorkoutTimes = {
  '4:45 AM - 5:30 AM': '0445',
  '5:30 AM - 6:15 AM': '0530',
  '6:30 AM - 7:30 AM': '0630',
  '6:00 PM - 6:45 PM': '1800',
};

interface WorkoutCardProps {
  ao: string;
  q?: string;
  avgAttendance?: number;
  style: string;
  location: {
    href: string;
    text: string;
  };
  day: string;
  time: string;
}

export default function WorkoutCard({
  ao,
  q,
  avgAttendance,
  style,
  location,
  day,
  time,
}: WorkoutCardProps) {
  return (
    <div className="bg-dirt py-8 px-4">
      <h3>{ao}</h3>
      {q ? (
        <p className="text-cmu">
          Led by <span className="text-white">{q}</span> tomorrow
        </p>
      ) : null}
      <ul className="py-4">
        {avgAttendance ? (
          <li className="inline-block py-px px-4 bg-sand rounded-xl">
            {avgAttendance}
          </li>
        ) : null}
        <li className="inline-block py-px px-4 bg-sand rounded-xl mx-2">
          {style}
        </li>
      </ul>
      <p className="font-bold pb-4">
        <Link href={location.href} target="_blank">
          {location.text}
        </Link>
      </p>
      <p className="font-md">
        {day}: {time}
      </p>
    </div>
  );
}
