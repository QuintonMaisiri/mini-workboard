import { Loader2Icon } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <Loader2Icon className="animate-spin mr-2 h-8 w-8 text-gray-600" />
      <p className="mt-4 text-gray-600 text-lg">Loading...</p>
    </div>
  );
}
