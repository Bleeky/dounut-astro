import { ContentTransformer, Image } from "@crystallize/reactjs-components";
import ReactPlayer from "react-player";
import { type ProductBody as ProductBodyType } from "../use-cases/contracts/ProductContent";

export const ProductBody = ({ description, dimensions }: ProductBodyType) => {
  return (
    <div className="flex flex-col gap-3 my-10 lg:w-9/12 w-full mx-auto z-10">
      {description?.content?.paragraphs.map((paragraph, index) => (
        <div key={index} className="flex flex-col justify-between">
          <div className="my-3 text-text md:px-20">
            {paragraph.title && (
              <h2 className="font-semibold text-2xl mb-4">
                {paragraph.title?.text}
              </h2>
            )}
            {paragraph.body && (
              <div>
                <ContentTransformer json={paragraph.body?.json as [any]} />
              </div>
            )}
          </div>
          {paragraph.images && (
            <div className="my-5 mx-auto">
              {paragraph?.images?.map((image, index: number) => (
                <Image
                  {...image}
                  sizes="200px"
                  className="rounded-xl overflow-hidden"
                  loading="lazy"
                  key={index}
                />
              ))}
            </div>
          )}
          {paragraph.videos && paragraph.videos?.length > 0 && (
            <div className="my-5">
              <ReactPlayer
                controls
                url={paragraph?.videos[0]?.playlists?.[1]}
                width="100%"
                height="400px"
                light={
                  paragraph?.videos &&
                  paragraph?.videos.length > 0 &&
                  paragraph?.videos[0].thumbnails &&
                  paragraph?.videos[0].thumbnails.length > 0 &&
                  paragraph?.videos[0].thumbnails[0].url
                }
                playing={true}
              />
            </div>
          )}
        </div>
      ))}
      {dimensions?.content?.sections.map((section, index) => (
        <div
          key={index}
          className="flex lg:flex-row flex-col justify-between text-text my-20"
        >
          <div>
            <h3 className="font-bold text-2xl py-2">{section?.title}</h3>
          </div>

          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm lg:w-7/12 w-full">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              {section.properties.map((property, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="font-medium text-gray-900">{property.key}</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {property.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
};
