import Router from "next/router";

export default function Home({ test }) {
  return <div>Hello hi {process.browser}</div>;
}

export const getServerSideProps = (context) => {
  const country = context.query.country || "us";

  process.browser
    ? Router.replace("/[country]", `${country}`)
    : context.res.writeHead(302, { Location: `/${country}` });

  context.res.end();
  // return {
  //   props: {
  //     test: "testing",
  //   },
  // };
};
