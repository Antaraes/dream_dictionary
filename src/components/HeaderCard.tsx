import { FC } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
interface HeaderCardProps {
  BlogId: number;
  BlogTitle: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const HeaderCard: FC<HeaderCardProps> = ({ BlogTitle, onClick }) => {
  const subTitle = BlogTitle.slice(6, 100);

  return (
    <Card
      className="mt-6 w-40 cursor-pointer hover:scale-105 duration-100 ease-out"
      onClick={onClick}
    >
      <CardBody>
        <Typography variant="h1" color="blue-gray" className="mb-2">
          {BlogTitle[2]}
        </Typography>
        <Typography>{subTitle}</Typography>
      </CardBody>
    </Card>
  );
};

export default HeaderCard;
