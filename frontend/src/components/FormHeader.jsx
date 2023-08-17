
const FormHeader = ({ onAdd, showForm }) => {
    return (
      <div className='flex justify-between items-center bg-transparent'>
          <h3 className="mt-0 mb-8 font-bold text-lg md:text-xl lg:text-2xl text-blue-700">Add New Workout</h3>
          <button className={` font-bold text-sm md:text-md mt-0 mb-8 cursor-pointer block py-2 px-5 rounded-full ${showForm ? 'bg-red-600 text-white' : 'bg-blue-700 text-white'}` } onClick={onAdd}>{showForm ? "Close" : "Add"}</button>
      </div>
    )
  }
  
  export default FormHeader


