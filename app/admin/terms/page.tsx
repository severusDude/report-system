import termService from "@/services/terms-service";
import TermTable from "./table";

export default async function Page() {
  const terms = await termService.getTerms({});

  return (
    <div>
      <TermTable data={terms} name="Terms" />
    </div>
  );
}
