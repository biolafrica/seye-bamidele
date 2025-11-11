import {ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SpeakingEvent {
  category: string;
  event: string;
  title: string;
  description: string;
  link: {
    text: string;
    url: string;
  };
}

const speakingEvents: SpeakingEvent[] = [
  {
    category: "Shows",
    event: "Founders Connect with Peace Itimi",
    title: "The Story Behind PaidHR: A Conversation with Seye Bandele.",
    description:
      "I recently sat with Peace Itimi on her show, Founders Connect and discussed the story of building PaidHR and a few other insights in my entrepreneurship journey.",
    link: {
      text: "Watch video",
      url: "https://www.youtube.com/watch?v=jVe_ddvM6ww&t=1s",
    },
  },
  {
    category: "Shows",
    event: "The Entrepreneur Connect Show",
    title: "CEO PaidHR, Seye Bandele shares his story",
    description:
      "Sat with Joseph Don and told the story of our growth at PaidHR and some of the challenges we’ve faced building a startup in Africa",
    link: {
      text: "Watch video",
      url: "https://www.youtube.com/watch?v=hHujz_wY2y8",
    },
  },
  {
    category: "Podcasts",
    event: "Growing Africa Podcast",
    title: "Pade",
    description:
      "I had a chat with the guys at the Growing Africa Podcast, I’ve included the episode here, if you’d like to check that out",
    link: {
      text: "Listen to podcast",
      url: "https://open.spotify.com/episode/1iK7Jb53Jol8CiSNFch2Sf?trackId=0qlu7Te2J2BuAGFcwb3rjn",
    },
  },
];

export default function Speaking() {
  return (
    <main className="min-h-screen ">
      <div className="max-w-3xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-heading">
            I've spoken at events all around the world and been interviewed for many podcasts.
          </h1>
          <p className="mt-4 text-secondary text-base">
            One of my favorite ways to share my ideas is live on stage, where there's so much more
            communication bandwidth than there is in writing, and I love podcast interviews because
            they give me the opportunity to answer questions instead of just present my opinions.
          </p>
        </header>

        {/* Articles */}
        <section className="space-y-12 md:space-y-0">
          {speakingEvents.map((event, idx) => (
            <article
              key={idx}
              className="md:flex gap-3  rounded-lg md:rounded-none md:p-0 "
            >
              <div className="md:border-l md:border-separator w-full py-0 md:pl-6 md:w-1/4 md:py-5 ">
                <div className="text-base font-semibold text-heading" >
                  {event.category}
                </div>
              </div>

              <div className="rounded-lg mt-3 w-full mb-9 md:hover:bg-hover md:cursor-pointer md:p-5 md:3/4 md:mt-0 ">

                <h2 className="text-sm text-disabled border-l border-separator pl-2">
                  {event.event}
                </h2>

                <h2 className="text-base font-semibold text-heading mt-3">
                  {event.title}
                </h2>

                <p className="mt-2 text-secondary text-sm leading-relaxed">
                  {event.description}
                </p>

                <Link
                  href={event.link.url}
                  className="mt-3 inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors group text-sm"
                >
                  {event.link.text}
                  <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
