import { Role, SubjectType } from "@/generated/prisma/enums";
import {
  SubjectCreateManyInput,
  TermCreateManyInput,
} from "@/generated/prisma/models";

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

export const terms: TermCreateManyInput[] = [
  {
    name: "Semester 1",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-06-30"),
  },
  {
    name: "Semester 2",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-12-31"),
  },
  {
    name: "Semester 3",
    startDate: new Date("2027-01-01"),
    endDate: new Date("2027-06-30"),
  },
  {
    name: "Semester 4",
    startDate: new Date("2027-07-01"),
    endDate: new Date("2027-12-31"),
  },
  {
    name: "Semester 5",
    startDate: new Date("2028-01-01"),
    endDate: new Date("2028-06-30"),
  },
  {
    name: "Semester 6",
    startDate: new Date("2028-07-01"),
    endDate: new Date("2028-12-31"),
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
