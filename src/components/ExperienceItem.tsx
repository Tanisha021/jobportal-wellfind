import { Button } from "./ui/button";

type props = {
  title: string;
  company: string;
  date: string;
  description: string;
};
export const ExperienceItem = ({
  title,
  company,
  date,
  description,
}: props) => (
  <div className="mb-6 last:mb-0">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Button variant="outline" size="sm">
        Edit
      </Button>
    </div>
    <p className="text-sm text-muted-foreground">{company}</p>
    <p className="text-sm text-muted-foreground">{date}</p>
    <p className="mt-2 text-sm">{description}</p>
  </div>
);
