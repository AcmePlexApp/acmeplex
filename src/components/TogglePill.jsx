
const TogglePill = ({ label, isActive, toggleState, isLeft }) => {
  return (
    <button
      onClick={toggleState}
      className={`cursor-pointer  inline-flex items-center justify-center py-2 px-6 text-sm font-medium transition duration-300 ease-in-out 
        ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} 
        border-2 border-black shadow-lg
        w-32 
        ${isActive && isLeft ? 'rounded-l-full' : 'rounded-none'}
        ${isActive && !isLeft ? 'rounded-r-full' : 'rounded-none'}
        ${!isActive && isLeft ? 'rounded-l-full' : 'rounded-none'}
        ${!isActive && !isLeft ? 'rounded-r-full' : 'rounded-none'}
        hover:${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}
    >
      {label}
    </button>
  );
};

export default TogglePill;
