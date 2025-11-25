import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import Link from "next/link";

export default function Page() {
  return (
    <AuthenticatedLayout header="Students">
      <header className="flex w-full justify-between">
        <h1>Students</h1>
        <Button asChild>
          <Link href="/admin/students/1/">Add</Link>
        </Button>
      </header>
    </AuthenticatedLayout>
  );
}
