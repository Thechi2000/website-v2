import Title from "@/components/title";
import { Data } from "@/models";
import { fetchDataServerSideProps } from "@/utils";

export default function Page({ education }: Data) {
  return (
    <>
      <Title text="Education" />
      <div>
        {education.map((e) => (
          <>
            <h2>
              {e.title} ({e.location}, {e.time})
            </h2>
            <p>{e.description}</p>
            <p><strong>Main courses:</strong> {e.courses.join(", ")}</p>
            <p><strong>Projects:</strong> {e.projects.join(", ")}</p>
          </>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = fetchDataServerSideProps;
