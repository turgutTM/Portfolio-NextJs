import Head from "next/head";
import Room from "../components/Room/Room";

export default function Home() {
  return (
    <>
      <Head>
        <title>Turgut Muradlı — Full-stack developer</title>
        <meta name="description" content="Full-stack developer building modern web and mobile apps with React, Next.js and Node.js." />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Room />
    </>
  );
}
