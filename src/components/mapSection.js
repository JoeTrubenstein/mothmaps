import React from "react";
import CustomMap from "./customMap";


function MapSection(props) {

  return (
    <section id="map"className="bg-gray-900 lg:p-12 md:p-4 sm:p-2">
      {/* Child components, such as markers, info windows, etc. */}
        <div>
          <CustomMap
            id="myMap"
          />
        </div>
    </section>
  )
}
export default MapSection;