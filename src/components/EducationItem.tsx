import { Button } from "./ui/button";

type props = {
  school: string;
  degree: string;
  gpa?: string;
  year: string;
};
export const EducationItem = ({ school, degree, gpa, year }: props) => (
  <div className="mb-6 last:mb-0">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold">{school}</h3>
      <Button variant="outline" size="sm">
        Edit
      </Button>
    </div>
    <p className="text-sm text-muted-foreground">{degree}</p>
    {gpa && <p className="text-sm text-muted-foreground">{gpa} GPA</p>}
    <p className="text-sm text-muted-foreground">{year}</p>
  </div>
);
