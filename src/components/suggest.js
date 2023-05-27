import React, {useState} from "react";
import { StandaloneSearchBox } from '@react-google-maps/api';

function Suggest(props) {

    const [searchBox, setSearchBox] = useState(null);

    const onPlacesChanged = () => props.collectLocation(searchBox.getPlaces());

    const onLoad = ref => {
      setSearchBox(ref);
    };
  
    return (
          <StandaloneSearchBox
            style={{width: `100%`}}
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-teal-500 text-base px-4 py-2"
              type="text"
              placeholder="Location"
            />
          </StandaloneSearchBox>
    );
  }
export default Suggest;