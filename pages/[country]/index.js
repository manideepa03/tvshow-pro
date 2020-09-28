import axios from "axios";
import Error from "next/error";
import cookies from "nookies";
import Thumbnail from "../../components/Thumbnail";

const Home = ({ shows, country, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const renderShows = () => {
    return shows.map((showItem, index) => {
      const { show } = showItem;

      return (
        <li key={index}>
          <Thumbnail
            imageUrl={(show.image && show.image.medium) || undefined}
            caption={show.name}
            href="/[country]/[showId]"
            as={`/${country}/${show.id}`}
          />
        </li>
      );
    });
  };

  return (
    <div className="home">
      <ul className="tvshows-grid">
        {renderShows()}

        <style jsx>{`
          .tvshows-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        `}</style>
      </ul>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { defaultCountry } = cookies.get(context);
    const country = context.query.country || defaultCountry || "us";

    const response = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
    );

    return {
      props: {
        shows: response.data,
        country,
      },
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export default Home;

// // we need a simple refactor
// // import { useEffect } from "react";
// import axios from "axios";
// import Error from "next/error";
// import cookies from "nookies";
// import Thumbnail from "../../components/Thumbnail";

// const Home = ({ shows, country, statusCode }) => {
//   // create a method to render all those shows

//   if (statusCode) {
//     return <Error statusCode={statusCode} />;
//   }
//   // map function calls the callback function one time for each element in the array
//   const renderShows = () => {
//     return shows.map((showItem, index) => {
//       const { show } = showItem;
//       return (
//         <li key={index}>
//           <Thumbnail
//             imageUrl={show.image && show.image.medium}
//             caption={show.name}
//             href="/[country]/[showId]"
//             as={`/${country}/${show.id}`}
//           />
//         </li>
//       );
//     });
//   };

//   return (
//     <div className="home">
//       <ul className="tvshows-grid">
//         {renderShows()}
//         <style jsx>{`
//           .tvshows-grid {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 10px;
//           }
//         `}</style>
//       </ul>
//     </div>
//   );
// };

// // home is our component name, whatever you return here is
// //avaliable as props component
// //

// // we are fetching on the server side. getServier
// export async function getServerSideProps(context) {
//   try {
//     const country = context.query.country || "us";
//     console.log("TCL: get serversideprops", context);
//     const response = await axios.get(
//       `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
//     );
//     //   console.log("TCL: get serversideprops", response.data);

//     return {
//       props: { shows: response.data, country },
//     };
//   } catch (error) {
//     return {
//       statusCode: error.response ? error.response.status : 500,
//     };
//   }
// }
// export default Home;

// //   console.log("TCL: Home -> props", props.shows);
// // use a useEffect and pass a callback function side
// //  Syntax: useEffect(() => {}, []);
// // I dont want any dependency to be involved ??
// // I will be doing this only when component is mounting
// // install axios

// // fetch the data from api url on the client side
// //   useEffect(() => {
// //     axios
// //       .get("https://api.tvmaze.com/schedule?country=US&date=2014-12-01")
// //       .then((response) => console.log(response.data)); // display the data from api url
// //   }, []);
