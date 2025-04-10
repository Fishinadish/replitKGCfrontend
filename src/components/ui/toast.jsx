const Toast = ({ message, type, onClose }) => {
    return (
      <div
        className={`fixed top-5 right-5 p-4 rounded-lg shadow-md text-white ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } animate-fade-in`}

        style={{ zIndex: 9999 }} 
      >
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 transition"
          >
            ✖
          </button>
        </div>
      </div>
    );
  };
  
  export default Toast;
  