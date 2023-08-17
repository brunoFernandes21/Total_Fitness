import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Modal = ({ showModal, setShowModal, deletedWorkout }) => {
  const { title, load, reps, createdAt } = deletedWorkout;
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal text-center" variants={modal}>
            <h3 className="text-center">
              You have successfully deleted the following workout
            </h3>
            <div className="grid-rows gap-2 justify-center mt-4">
              <p className="font-bold">
                <strong>Title: </strong>
                {title}
              </p>
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
            <button onClick={() => setShowModal(false)}>Close Modal</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
