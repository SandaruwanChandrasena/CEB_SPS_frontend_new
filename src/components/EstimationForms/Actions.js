const Actions = ({ handleSubmit }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleSubmit}
        className="bg-emerald-400 text-white text-sm px-6 py-2 rounded shadow hover:shadow-md transition duration-150"
      >
        Submit
      </button>
    </div>
  );
};

export default Actions;
