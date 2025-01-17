const ErrorIndicator: React.FC<{ error: string }> = ({ error }) => (
    <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-red-500">Error: {error}</div>
    </div>
);

export default ErrorIndicator;
