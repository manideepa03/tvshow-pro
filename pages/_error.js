// const CustomError = ({ statusCode }) => {
//   if (statusCode === 404) {
//     return <h1>The resource was not found</h1>;
//   }
//   return <h1>Oops! something went wrong</h1>;
// };

// export const getServerSideProps = async (err, res) => {
//   return { statusCode: res ? res.statusCode : err ? err.statusCode : 404 };
// };
// export default CustomError;
const CustomError = ({ statusCode }) => {
  if (statusCode === 404) {
    return <h1>The resource was not found...</h1>;
  }

  return <h1>Oops! Something went wrong...</h1>;
};

export const getServerSideProps = ({ err, res }) => {
  return {
    props: {
      statusCode: 404,
    },
  };
};

export default CustomError;
