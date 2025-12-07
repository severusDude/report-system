import { prisma } from "@/lib/prisma";
import { Subject } from "@/generated/prisma/browser";
import { SubjectCreateArgs } from "@/generated/prisma/models";
import { unstable_cache } from "next/cache";

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
}

const subjectService = new SubjectService();
export default subjectService;
