import Link from "next/link";
import ThumbnailStyles from "./styles";
const Thumbnail = ({
  imageUrl = "https://via.placeholder.com/210x295?text=?",
  caption,
  href = "",
  as = "",
  small = false,
}) => {
  return (
    <div className="thumbnail">
      <Link href={href} as={as}>
        <a>
          <img src={imageUrl} className="thumbnail_image" />
          <div className="thumbnail__caption">{caption}</div>
        </a>
      </Link>

      <style jsx>{`
        .thumbnail__image {
          width: ${small ? "100px" : "100%"};
        }

        .thumbnail__caption {
          text-align: center;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Thumbnail;

// "as" makes us navigate from the client side. It
// allows us to reload only a small part of the page
// instead of complete reload (which happens if href is not
// dynamic)
