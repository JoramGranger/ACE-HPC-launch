import { CheckCircle } from 'lucide-react';

interface ProgressSequenceProps {
  steps: string[];
  currentStep: number;
  progress: number;
}

const ProgressSequence = ({ steps, currentStep, progress }: ProgressSequenceProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-5">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center transition-all duration-300 ${
              index <= currentStep ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="flex-shrink-0 mr-3">
              {index < currentStep ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <div className={`w-6 h-6 rounded-full ${
                  index === currentStep ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
                }`}></div>
              )}
            </div>
            <p className="text-white text-lg">{step}</p>
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="mt-8">
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>
        <div className="mt-2 text-right text-white font-mono">{Math.floor(progress)}%</div>
      </div>
    </div>
  );
};

export default ProgressSequence;