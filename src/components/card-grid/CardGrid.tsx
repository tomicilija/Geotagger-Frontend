import { CardWrapper, NotFound } from "./CardGrid.style";
import Masonry from "react-masonry-css";
import Card from "../cards/card-new/CardNew";
import { GridProps } from "../../interfaces/LocationInterfaces";
import CardNew from "../cards/card-new/CardNew";
import CardEdit from "../cards/card-edit/CardEdit";
import CardGuessed from "../cards/card-guessed/CardGuessed";
import CardLocked from "../cards/card-locked/CardLocked";

// Recives array of locations and arranges them into collumns

const CardGrid: React.FC<GridProps> = ({ locationId, cardStyle }) => {
  let breakpointColumnsObj;
  if (locationId.length < 3) {
    breakpointColumnsObj = {
      default: locationId.length,
      1440: locationId.length,
      1000: 1,
    };
  } else {
    if (cardStyle === "card-edit") {
      breakpointColumnsObj = {
        default: 4,
        1440: 3,
        1110: 2,
        900: 1,
      };
    } else {
      breakpointColumnsObj = {
        default: 3,
        1440: 2,
        1000: 1,
      };
    }
  }

  if (locationId) {
    return (
      <CardWrapper>
        {cardStyle === "card-edit" ? (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
            >
              {locationId.map((value) => (
                <CardEdit locationid={value} />
              ))}
            </Masonry>
          </>
        ) : cardStyle === "card-new" ? (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
            >
              {locationId.map((value) => (
                <CardNew locationid={value} />
              ))}
            </Masonry>
          </>
        ) : cardStyle === "card-guessed" ? (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
            >
              {locationId.map((value) => (
                <CardGuessed locationid={value} />
              ))}
            </Masonry>
          </>
        ) : cardStyle === "card-guessed" ? (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
            >
              {locationId.map((value) => (
                <CardLocked locationid={value} />
              ))}
            </Masonry>
          </>
        ) : (
          <></>
        )}
      </CardWrapper>
    );
  } else {
    /* If no quotes exist */
    return (
      <NotFound>
        <h1>OOPS!</h1> <p>This is looking a little empty</p>
      </NotFound>
    );
  }
};

export default CardGrid;
