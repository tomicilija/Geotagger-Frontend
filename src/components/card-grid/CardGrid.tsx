import { CardWrapper, NotFound } from "./CardGrid.style";
import Masonry from "react-masonry-css";
import Card from "../cards/card-new/CardNew";
import { GridProps } from "../../interfaces/LocationInterfaces";
import CardNew from "../cards/card-new/CardNew";
import CardEdit from "../cards/card-edit/CardEdit";
import CardGuessed from "../cards/card-guessed/CardGuessed";

// Recives array of locations and arranges them into collumns

const CardGrid: React.FC<GridProps> = ({ locations }) => {
  let breakpointColumnsObj;
  if (locations.length < 3) {
    breakpointColumnsObj = {
      default: locations.length,
      1440: locations.length,
      1000: 1,
    };
  } else {
    breakpointColumnsObj = {
      default: 3,
      1440: 2,
      1000: 1,
    };
  }

  if (locations) {
    if (!locations[0].distance) {
      return (
        <CardWrapper>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
          >
            {locations.map((value) => (
              <CardNew locationid={value.locationid} image={`${value.image}`} />
            ))}
          </Masonry>
        </CardWrapper>
      );
    } else {
      return (
        <CardWrapper>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
          >
            {locations.map((value) => (
              
              <CardGuessed locationid={value.locationid} image={`${value.image}`} distance={value.distance} />
            ))}
          </Masonry>
        </CardWrapper>
      );
    }
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
