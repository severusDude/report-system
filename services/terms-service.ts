import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { Term } from "@/generated/prisma/browser";
import { TermCreateArgs } from "@/generated/prisma/models";

class TermService {
  getTerms = unstable_cache(
    async ({ query }: { query?: string }): Promise<Term[]> => {
      return await prisma.term.findMany({
        where: { name: { contains: query } },
      });
    },
    ["terms"],
    { tags: ["terms"] }
  );

  async createTerm({ ...args }: TermCreateArgs): Promise<Term> {
    return await prisma.term.create({ ...args });
  }
}

const termService = new TermService();
export default termService;
