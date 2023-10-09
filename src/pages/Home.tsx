import { FC, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import HeaderCard from "../components/HeaderCard";
import DetailCard from "../components/DetailCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Button, Input } from "@material-tailwind/react";
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [selectedCard, setSelectedCard] = useState<BlogHeader | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [blogheader, setBlogHeader] = useState<BlogHeader[] | null>(null);
  useEffect(() => {
    const fetchHeader = async () => {
      const { data: blogHeader, error } = await supabase.from("BlogHeader").select("*");

      if (error) {
        setFetchError("Could not fetch blog header");
        setBlogHeader(null);
        console.log(error);
      }
      if (blogHeader) {
        setBlogHeader(blogHeader);

        setFetchError(null);
      }
    };
    fetchHeader();
  }, []);
  const handleCardClick = (item: BlogHeader) => {
    setSelectedCard(item);
  };
  return (
    <main className="w-full flex flex-col gap-3 ">
      <div className=" flex w-full gap-2 md:w-max sticky">
        <Input
          type="search"
          color="white"
          label="Type here..."
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
          crossOrigin={undefined}
        />
        <Button size="sm" className="!absolute right-1 top-1 rounded">
          Search
        </Button>
      </div>
      <div className="flex justify-center items-center">
        {fetchError && <p>{fetchError}</p>}
        {!selectedCard ? (
          <div className="grid grid-cols-7 gap-3">
            {blogheader?.map((item, index) =>
              selectedCard ? null : (
                <HeaderCard
                  key={index}
                  BlogId={item.BlogId}
                  BlogTitle={item.BlogTitle}
                  onClick={() => handleCardClick(item)}
                />
              )
            )}
          </div>
        ) : (
          <Swiper
            slidesPerView={8}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {blogheader?.map((item, index) => (
              <SwiperSlide key={index}>
                <HeaderCard
                  key={index}
                  BlogId={item.BlogId}
                  BlogTitle={item.BlogTitle}
                  onClick={() => handleCardClick(item)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div>{selectedCard && <DetailCard BlogId={selectedCard.BlogId} />}</div>
    </main>
  );
};

export default Home;
