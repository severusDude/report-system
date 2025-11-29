"use server";

import { prisma } from "@/lib/prisma";
import { ResponseData } from "@/types";
import { Attachment } from "@/types/attachment";
import { Work } from "@/generated/prisma/client";

export async function indexWorks(count?: number): Promise<Work[]> {
  return await prisma.work.findMany({ take: count ?? 10 });
}

export async function createStudentWork({
  studentId,
  title,
  description,
  attachments,
}: {
  studentId: string;
  title: string;
  description?: string | "";
  attachments: Attachment[];
}): Promise<ResponseData<string>> {
  try {
    const work = await prisma.work.create({
      data: {
        studentId,
        title,
        description,
        attachments: {
          createMany: {
            data: attachments,
          },
        },
      },
    });

    const workId = work.id;
    return {
      success: true,
      message: "Work created successfully",
      data: workId,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Error creating work: ${error}`,
      data: "",
    };
  }
}
