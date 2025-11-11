import PageHeader from "@/components/common/PageHeader";
import PageSection from "@/components/common/PageSection";

const speakingEvents = [
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
    <main className="min-h-screen">
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="I've spoken at events all around the world and been interviewed for many podcasts."
          description="One of my favorite ways to share my ideas is live on stage, where there's so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
        />
        <PageSection items={speakingEvents} variant="speaking" />
      </div>
    </main>
  );
}

