import { prisma } from "@/lib/prisma";
import { Subject } from "@/generated/prisma/browser";
import { SubjectCreateArgs } from "@/generated/prisma/models";
import { unstable_cache } from "next/cache";
import { ResponseData } from "@/types";

class SubjectService {
  getSubjects = unstable_cache(
    async ({ query }: { query?: string }): Promise<Subject[]> => {
      return await prisma.subject.findMany({
        where: { name: { contains: query } },
      });
    },
    ["subjects"],
    { tags: ["subjects"] }
  );

  async createSubject({ ...args }: SubjectCreateArgs): Promise<Subject> {
    return await prisma.subject.create({ ...args });
  }

  async deleteSubject(id: string): Promise<ResponseData<null>> {
    try {
      await prisma.subject.delete({ where: { id } });

      return {
        success: true,
        message: "Subject deleted successfully",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to delete subject",
        data: null,
      };
    }
  }
}

const subjectService = new SubjectService();
export default subjectService;
