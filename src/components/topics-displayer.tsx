export const TopicsDisplayer = ({
  topics,
}: {
  topics?: { name: string }[];
}) => {
  return (
    <div className="flex gap-1 mb-2 flex-row-reverse">
      {topics?.map((topic) => (
        <div
          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
          key={topic.name}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};
