import { Spinner } from "../ui/spinner";

export const Loader = () => {
  return (
    <div className=" absolute inset-0 z-50  overflow-hidden flex justify-center items-center  bg-white dark:bg-gray-900">
      <div className="flex justify-center items-center w-screen h-full">
        <Spinner className="size-16" />
      </div>
    </div>
  );
};
