import { ContentTransformer, Image } from "@crystallize/reactjs-components";
import { TopicsDisplayer } from "../topics-displayer";
import type { CellProps } from "../../use-cases/contracts/Cell";

export const GridItem = ({ cell }: CellProps) => {
  if (!cell.item) return null;
  return cell.layout.colspan === 3 ? (
    <a href={cell?.item?.path}>
      <div className="flex relative lg:flex-row flex-col">
        <Image
          {...(cell.item?.variants?.[0]?.images?.[0] as any)}
          sizes="(max-width: 700px) 300px, 500px"
          className="lg:absolute lg:top-0 bottom-0 lg:right-0 lg:w-8/12 overflow-hidden rounded-r-xl"
        />
        <div className="flex flex-col justify-evenly lg:w-128 px-5 bg-background1 h-80 p-5 rounded-xl w-full lg:items-start items-center">
          <div className="w-60 lg:text-left text-center">
            <h2 className="text-2xl font-bold">{cell.item?.name}</h2>
            <p className="mt-4">{cell.item?.variants[0]?.price}</p>
          </div>
          <TopicsDisplayer topics={cell.item?.topics} />
        </div>
      </div>
    </a>
  ) : (
    <a href={cell?.item?.path}>
      <div className="flex flex-col bg-background4 px-5 py-7 rounded-xl xl:h-[700px] p-5  w-full h-auto min-h-[500px]">
        <div className="flex justify-between items-start mb-4">
          <TopicsDisplayer topics={cell.item.topics} />
          <p className="self-end">€{cell.item.variants[0]?.price}</p>
        </div>
        <div className="mx-auto max-h-106">
          <img
            className="rounded-xl max-w-full max-h-full block"
            loading="lazy"
            src={
              cell.item?.variants?.[0]?.images?.[0].variants[
                cell.item?.variants?.[0]?.images?.[0].variants?.length - 1
              ].url
            }
          ></img>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center w-40 m-auto mt-4">
            {cell.item.name}
          </h2>
          <span className="text-center w-40 m-auto">
            <ContentTransformer
              json={cell.item?.summary?.content?.json as [any]}
            />
          </span>
        </div>
      </div>
    </a>
  );
};
