interface Props {
  type: "not-found" | " unauthorized";
}

export const NotFoundPage = ({ type }: Props) => {
  return (
    <div className="bg-red-600 p-5">
      {type === "not-found" ? "Page Not Found" : "Unauthorized"}
    </div>
  );
};
