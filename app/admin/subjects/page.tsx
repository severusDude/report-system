import subjectService from "@/services/subjects-service";
import SubjectTable from "./table";

export default async function Page() {
  const subjects = await subjectService.getSubjects({});

  return (
    <div>
      <SubjectTable data={subjects} name="Subjects" />
    </div>
  );
}
