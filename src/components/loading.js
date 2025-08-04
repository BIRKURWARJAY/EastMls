const LoadingComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

        <div className="text-lg text-gray-600 mt-4">Loading, please wait...</div>
      </div>
    </div>
  );
};

export default LoadingComponent;
