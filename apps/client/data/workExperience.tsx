interface WorkExperience {
  company: string;
  role: string;
  logo: string;
  startYear: number;
  endYear?: number | "Present";
}

export const workHistory: WorkExperience[] = [
  {
    company: "PaidHR",
    role: "CEO",
    logo: "/logos/paidHr.svg",
    startYear: 2021,
    endYear: "Present",
  },
  {
    company: "Konga Limited",
    role: "Head of Marketing",
    logo: "/logos/konga.svg",
    startYear: 2018,
    endYear: 2018,
  },
  {
    company: "Yudala Limited",
    role: "Head, Marketing",
    logo: "/logos/yudala.svg",
    startYear: 2016,
    endYear: 2018,
  },
  {
    company: "YES Mobile NG",
    role: "Head E-Business",
    logo: "/logos/yes.svg",
    startYear: 2015,
    endYear: 2016,
  },
];