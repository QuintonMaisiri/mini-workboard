import Image from "next/image";

export function Error() {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center flex-col">
      <Image
        src="/images/error.png"
        alt="error illustration"
        width={300}
        height={300}
      />
      <p className="mt-4 text-gray-600 text-lg">Something went wrong.</p>
    </div>
  );
}
