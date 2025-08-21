const LoadingComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        
        <div className="text-xl font-semibold text-gray-700 mt-6 animate-pulse">Loading, please wait...</div>
      </div>
    </div>
  );
};

export default LoadingComponent;
