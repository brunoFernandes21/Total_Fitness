import { FaRegTrashAlt } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout, onDelete }) => {
  const { _id, title, load, reps, createdAt } = workout;
  return (
    <div className="workout__details">
      <h3 className="font-bold">{title}</h3>
      <span className="delete text-lg transition hover:scale-125 hover:bg-red-200">
        <FaRegTrashAlt onClick={() => onDelete(_id)} style={{ color: "red" }} />
      </span>
      <div className="grid gap-2 mt-4">
        <p>
          <strong>Load: </strong>
          {load}kg
        </p>
        <p>
          <strong>Reps: </strong>
          {reps}
        </p>
        <p>
          <strong>Created: </strong>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default WorkoutDetails;
