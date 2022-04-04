import CustomLink from "../../components/CustomLink";
import IconHaditsCalligraphy from "../../components/icons/IconHaditsCalligraphy";
import { useHadithNarrates } from "../../services/hadits";

const HaditsCard = ({ slug, title, total }) => {
  return (
    <CustomLink
      href={`/hadits/${slug}`}
      className="border rounded-md p-4 group hover:border-primary hover:bg-slate-50 transition-colors flex gap-4 items-center w-full"
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
          {title}
        </h2>
        <span className="text-xs text-gray-600 font-medium">
          {total} hadits
        </span>
      </div>
    </CustomLink>
  );
};

const Skeleton = () => {
  return (
    <div className="skeleton w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-36 h-36 bg-slate-200 rounded-full "></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full">
        {[...Array(9).keys()].map((n) => (
          <div
            key={n}
            className="skeleton border rounded-md p-4 group flex gap-4 items-center w-full"
          >
            <span className="bg-slate-200 h-7 w-full rounded-md"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Hadits = () => {
  const hadithNarratesQuery = useHadithNarrates();

  return (
    <div>
      {hadithNarratesQuery.isLoading ? (
        <Skeleton />
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <div className="w-52 h-auto">
            <IconHaditsCalligraphy />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full">
            {hadithNarratesQuery.data.map((hadits) => (
              <HaditsCard
                key={hadits.slug}
                title={hadits.name}
                slug={hadits.slug}
                total={hadits.total}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hadits;
