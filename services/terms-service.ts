import { prisma } from "@/lib/prisma";
import { ResponseData } from "@/types";
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

  async deleteTerm(id: string): Promise<ResponseData<null>> {
    try {
      await prisma.term.delete({ where: { id } });

      return {
        success: true,
        message: "Term deleted successfully",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to delete term",
        data: null,
      };
    }
  }
}

const termService = new TermService();
export default termService;
