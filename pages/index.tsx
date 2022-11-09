import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>
            is a place to write, reand and connect
          </h1>
          <h2 className="">
            Its easy and free to post your thinking on any topic and connect
            with milllions of readers
          </h2>
        </div>
        <div className="hidden md:inline-flex h-32 lg:h-full">
          <img
            src="https://www.iconpacks.net/icons/2/free-medium-icon-2177-thumb.png"
            alt=""
          />
        </div>
      </div>
      {/* posts */}
      <div>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <img src={urlFor(post.mainImage).url()!} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
