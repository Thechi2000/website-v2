import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { Data } from "@/models";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import Markdown from "react-markdown";

export default function Page({ projects }: Data) {
  return (
    <>
      <Title text="Projects" />
      <Breadcrumbs />
      {projects.map((p) => (
        <>
          <h2>{p.name}</h2>
          <Markdown>{p.description}</Markdown>
          <p>
            <strong>Languages:</strong> {p.languages.join(", ")}
          </p>
          {p.markdownUrl ? <Link href={`/projects/${p.id}`}>Learn more...</Link> : <></>}
        </>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: JSON.parse((await readFile("data.json")).toString()),
  };
}
