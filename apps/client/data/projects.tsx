interface Project {
  name: string;
  description: string;
  link: string;
  logo: string;
}

export const projects: Project[] = [
  {
    name: "PaidHr",
    description:
      "Simplifies people operations for African businesses while empowering workers with accessible financial solutions",
    link: "paidhr.com",
    logo: "/logos/paidHr.svg",
  },
  {
    name: "Showlove",
    description:
      "Co-founded Showlove, a startup reinventing gifting in Africa; later pivoted to B2B before closing in 2021.",
    link: "github.com/showlove",
    logo: "/logos/paidHr.svg",
  },
  {
    name: "Better Group",
    description:
      "Better Group empowers African film and music creators with visibility, support, and quality production opportunities.",
    link: "youtube.com/@bettersoundstudios",
    logo: "/logos/bettersound.svg",
  },

];