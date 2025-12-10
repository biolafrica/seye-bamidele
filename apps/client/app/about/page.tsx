import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "../../data/socialLinks";
import { createMetadata } from "@seye-bamidele/ui";
import seyeOfficeImg from '@/public/photo/seye-office.jpg';

export const metadata = createMetadata({
  title: "About ",
  description: "Learn more about Seye Bandele, and his passion for building and scaling businesses in Africa.",
});

export default function About() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
  
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-heading leading-tight">
            I'm Seye Bandele, cofounder at PaidHR, a fast growing HRTech platform in Africa.
          </h1>

          <div className="space-y-4 text-base text-secondary leading-relaxed">
            <p>
              I am passionate about the future of work in Africa and I support entrepreneurs in building and scaling their businesses.
            </p>

            <p>
              I am based in Lagos, Nigeria. I live with my beautiful wife and two lovely daughters. An avid lover of books and constantly curious, I am looking to use my experience and network to help build human capacity on the continent so that we can fulfill our potential in all our various fields of interest.
            </p>

            <p>
             After graduating with a degree in Agricultural Sciences, I have spent the last 14 years working in technology and helping to build Nigeria and Africa’s fledgling tech industry. My career spans GIS, E-commerce, Retail, Fintech and now HRTech. Specifically my skillsets include strategy & planning, GTM, sales, marketing and people management. I am also passionate about film, music and photography and find myself dabbling in those as a hobby.
            </p>

            <p>
             Altogether, I have been fortunate to raise (and help raise) over $3m for various startups in the past 3 years. I understand that there are tons of brilliant founders building great companies who can not access the funding they need, I want to use my experience to help make that easier for as many African founders as possible.
            </p>
          </div>
          
        </div>

        <div className="space-y-6">

          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={seyeOfficeImg}
              alt="Seye Bamidele - Portfolio website owner, working at office"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority
              quality={85}
              placeholder="blur"
            />
          </div>

          <div className="pt-6 ">
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-secondary hover:text-accent transition-colors group"
                >
                  <span className="text-secondary group-hover:text-accent transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium">Follow on {link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-separator">
            <Link
              href="mailto:seyedele@paidhr.com"
              className="flex items-center gap-3 text-secondary hover:text-accent transition-colors group"
            >
              <EnvelopeIcon className="w-5 h-5 text-secondary group-hover:text-accent transition-colors"/>
              <span className="text-sm font-medium">seyedele@paidhr.com</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}