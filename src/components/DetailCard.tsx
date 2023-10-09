import { FC, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { Card, Typography } from "@material-tailwind/react";
interface DetailCardProps {
  BlogId: number;
}
const TABLE_HEAD = ["No", "Content"];
const DetailCard: FC<DetailCardProps> = ({ BlogId }) => {
  const [detail, setDetail] = useState<BlogDetail[] | null>(null);
  useEffect(() => {
    const fetchDetail = async () => {
      const { data: detail, error } = await supabase
        .from("BlogDetail")
        .select()
        .eq("BlogId", BlogId);

      if (error) {
        setDetail(null);
        console.log(error);
      }
      if (detail) {
        setDetail(detail);
      }
    };

    fetchDetail();
  }, [BlogId]);

  return (
    <Card className=" w-full overflow-y-scroll h-[350px]">
      <table className="w-full min-w-max table-auto text-left ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" ">
          {detail &&
            detail.map((item: BlogDetail, index: number) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.BlogDetailId}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.BlogContent}
                  </Typography>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  );
};

export default DetailCard;
