import PageHeader from "@/components/common/PageHeader";
import { LinkIcon } from "@heroicons/react/24/outline";

interface Project {
  name: string;
  description: string;
  link: string;
  logo: string;
}

const projects: Project[] = [
  {
    name: "PaidHr",
    description:
      "Simplifies people operations for African businesses while empowering workers with accessible financial solutions",
    link: "paidhr.com",
    logo: "/paidHr.svg",
  },
  {
    name: "Showlove",
    description:
      "Co-founded Showlove, a startup reinventing gifting in Africa; later pivoted to B2B before closing in 2021.",
    link: "github.com/showlove",
    logo: "/paidHr.svg",
  },
  {
    name: "Better Group",
    description:
      "Better Group empowers African film and music creators with visibility, support, and quality production opportunities.",
    link: "youtube.com/@bettersoundstudios",
    logo: "/bettersound.svg",
  },

];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl">

        <div className="max-w-2xl">
          <PageHeader
            title="Things I've made trying to put my dent in the universe."
            description="I've worked on tons of little projects over the years but these are
            the ones that I'm most proud of. Many of them are open-source, so if
            you see something that piques your interest, check out the code and
            contribute if you have ideas for how it can be improved."
          />
        </div>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-start rounded-2xl p-6 hover:bg-hover transition-colors"
            >
              {/* Logo */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-card border border-border mb-4 overflow-hidden group-hover:border-accent transition-colors shadow">
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Project Name */}
              <h2 className="text-lg font-semibold text-heading">
                {project.name}
              </h2>

              {/* Description */}
              <p className="mt-2 text-sm text-secondary leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Link */}
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm text-secondary hover:text-accent transition-colors font-medium group/link"
              >
                <LinkIcon className="w-4 h-4 mr-1.5 group-hover/link:text-accent transition-colors" />
                <span>{project.link}</span>
              </a>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
