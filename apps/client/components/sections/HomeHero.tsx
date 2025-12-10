"use client"

import { socialLinks } from "@/data/socialLinks";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../common/PageHeader";
import { photos } from "@/data/homeHeroPhotos";
import seyeIconImg from '@/public/photo/seye.png';

export default function HomeHero() {

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">

        <section className="pb-10 sm:pb-24">
          
          <div className="max-w-3xl">
            <div className="mb-8">
              <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-border">
                <Image
                  src={seyeIconImg}
                  alt="Profile picture"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  priority
                />
              </div>

            </div>

            <PageHeader
              title="Creo, Ergo Sum. Venture Builder. Teller of Truth."
              description="My name is Seye Bandele. I’m cofounder at PaidHR, a fast growing HRTech platform in Africa. I’m passionate about the future of work in Africa and I support entrepreneurs in building and scaling their businesses."
            />

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors"
                  aria-label={social.name}
                  
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

        </section>

        <section className="pb-16">
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {photos.map((photo, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-72 h-80 rounded-2xl overflow-hidden group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}