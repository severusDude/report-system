import studentService from "@/services/students-service";

import StudentTable from "./table";

export default async function Page() {
  const students = await studentService.getStudents({});

  return <StudentTable data={students.data} name="Students data" />;
}
