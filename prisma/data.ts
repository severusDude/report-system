import { Role, SubjectType } from "@/generated/prisma/enums";
import { SubjectCreateManyInput } from "@/generated/prisma/models";

export const users = [
  {
    email: "admin@example.com",
    name: "admin",
    password: "admin1234",
    role: Role.ADMIN,
  },
  {
    email: "teacher@example.com",
    name: "teacher",
    password: "teacher123",
    role: Role.TEACHER,
  },
  {
    email: "parent@example.com",
    name: "parent",
    password: "parent123",
    role: Role.PARENT,
  },
];

export const subjects: SubjectCreateManyInput[] = [
  {
    name: "Matematika",
    type: SubjectType.GENERAL,
  },
  {
    name: "IPA",
    type: SubjectType.GENERAL,
  },
  {
    name: "Pendidikan Pancasila",
    type: SubjectType.GENERAL,
  },
  {
    name: "Pendidikan Karakter",
    type: SubjectType.GENERAL,
  },
  {
    name: "Bahasa Inggris",
    type: SubjectType.GENERAL,
  },
  {
    name: "Bahasa Indonesia",
    type: SubjectType.GENERAL,
  },
  {
    name: "Bahasa Sunda",
    type: SubjectType.GENERAL,
  },
  {
    name: "Seni Budaya",
    type: SubjectType.GENERAL,
  },
  {
    name: "PJOK",
    type: SubjectType.GENERAL,
  },
  {
    name: "Al-Quran",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Aqidah",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Akhlak",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Fiqih",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Bahasa Arab",
    type: SubjectType.ISLAMIC,
  },
];
