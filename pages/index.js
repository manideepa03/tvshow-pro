import Router from "next/router";

const Home = () => null;

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

export default Home;
