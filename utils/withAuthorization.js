import { Component } from "react";
import cookies from "nookies";
import Router from "next/router";

const authenticate = (context) => {
  const { token } = cookies.get(context);

  cookies.get(
    context,
    "plannedRoute",
    JSON.stringify({
      as: context.asPath || `/${context.query.country}/${context.query.showId}`,
      href: context.pathname || "/[country]/[showId]",
    }),
    { path: "/" }
  );

  // check whether you are in client side or server side
  // check if cookie is present, redirect user to sign page
  if (context.req && !token) {
    context.res.writeHead(302, { Location: "/signin" });
    context.res.end();
    return;
  }
  // check to redirect on client side
  // Check if cookies exists
  if (!token) {
    Router.push("/signin");
  }

  return token;
};
const isAuthenticated = (context) => {
  const { token } = cookies.get(context);

  return token;
};
const withAuthorization = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props.data} />;
  };
};
const withAuthServerSideProps = (getServerSidePropsFunc) => {
  return async (context) => {
    const token = authenticate(context);
    const data = await getServerSidePropsFunc(context);

    const resolve = {
      props: {
        data: data.props,
      },
    };

    return token ? { props: { ...resolve.props, token } } : resolve;
  };
};

export { withAuthorization, isAuthenticated, withAuthServerSideProps };
// const withAuthorization = (WrappedComponent) => {
//   return class extends Component {
//     static async getServerSideProps(context) {
//       const token = authenticate(context);
//       const componentProps =
//         WrappedComponent.getServerSideProps &&
//         (await WrappedComponent.getServerSideProps(context));

//       return { ...componentProps, token };
//     }
//     render() {
//       //we are recieving the component and adding the
//       // extra properties for this and sending it
//       // adding more information to that components
//       return <WrappedComponent {...this.props} />;
//     }
//   };
// };

// export { withAuthorization };
