import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import MovieSearch from "@/components/movieSearch";
import { Box } from "@chakra-ui/react";


export default function Home() {
  return (
    <>
      <Head>
        <title>Sava - Assessment</title>
        <meta
          name="description"
          content="A movie watchlist for Sava Assessment"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box p="10px" mx="auto" maxW="900px">
          <MovieSearch />
        </Box>
      </main>
    </>
  );
}
