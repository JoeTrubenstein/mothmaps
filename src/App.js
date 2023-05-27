import * as React from "react";
import { useQuery } from "@apollo/client";
import { FIND_SIGHTINGS } from "./graphql-operations";
import AnchorLink from "react-anchor-link-smooth-scroll";

import Burger from "./components/burger";
import MapSection from "./components/mapSection";
import Contact from "./components/contact";
import Footer from "./components/footer";

import lampBro from "./images/moth.webp"

export default function App(props) {

  const { loading, error, data } = useQuery(FIND_SIGHTINGS);
  if (loading) console.log("fetching gql data");
  if (error) console.log(error);


  return (
    <div className="App">
      {/* NavBar Area */}
      <div className="bg-gray-900">
        <div className="mr-2 flex md:hidden w-screen items-right content-center">
          {/* Mobile menu button */}
          <Burger />
        </div>
        <nav className=" bg-gray-900">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0"></div>
                <div className="hidden md:block">
                  <div className="font-display ml-10 flex items-baseline pt-12">
                    <span className="ml-4 px-3 py-2 rounded-md text-xl font-medium text-teal-500 focus:outline-none">
                      mothMaps
                    </span>
                    <AnchorLink
                      href="#sights"
                      className="ml-4 px-3 py-2 rounded-md text-md font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      Sightings
                    </AnchorLink>
                    <AnchorLink
                      href="#map"
                      className="ml-4 px-3 py-2 rounded-md text-md font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      Map
                    </AnchorLink>
                    <AnchorLink
                      href="#contact"
                      className="ml-4 px-3 py-2 rounded-md text-md font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      Contact
                    </AnchorLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* NavBar Area */}

      {/* Hero Area */}
      <section className="text-gray-300 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Have you seen me?
            </h1>
            <p className="mb-8 leading-relaxed">
              The Mothman is a cryptid being who's legend originated in West
              Virginia in the 1960's. Since then he's been sighted all over the
              world, often claimed to be seen just before some great disaster. Is
              he simply trying to warn us? Or is the Mothman something less
              benevolent? Join a community that's working together to answer these
              questions.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">
                <AnchorLink href="#contact">Report a sighting</AnchorLink>
              </button>
              <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                <AnchorLink href="#map">See the map</AnchorLink>
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={lampBro}
            />
          </div>
        </div>
      </section>




      {/* Sighting Area */}
      <section id="sights" className="text-gray-300 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8">
            {data ? (
              <>
                {data.sightings.map((sight) => (
                  <div key={sight._id} className="py-8 px-4 lg:w-1/3">
                    <div className="h-full flex items-start">
                      <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                          New
                        </span>
                        <span className="font-medium text-xl text-gray-300 title-font">
                          {""}
                        </span>
                      </div>
                      <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                          lat: {sight.location.lat}
                          <br />
                          lng: {sight.location.lng}
                        </h2>
                        <h1 className="title-font text-l font-medium text-white mb-3">
                          {sight.submitDate}
                        </h1>
                        <p className="leading-relaxed mb-5">
                          {sight.description}
                        </p>
                        <div className="inline-flex items-center">
                          <span className="flex-grow flex flex-col">
                            <span className="title-font font-medium text-white">
                              {sight.witness}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="py-8 px-4 lg:w-1/3">
                  <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                      <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                        New
                      </span>
                      <span className="font-medium text-xl text-gray-300 title-font">
                        {""}
                      </span>
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                        lat: "loading"
                        <br />
                        lng: "loading"
                      </h2>
                      <h1 className="title-font text-l font-medium text-white mb-3">
                        "loading"
                      </h1>
                      <p className="leading-relaxed mb-5">"loading"</p>
                      <a href="../" className="inline-flex items-center">
                        <span className="flex-grow flex flex-col">
                          <span className="title-font font-medium text-white">
                            "loading"
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="py-8 px-4 lg:w-1/3">
                  <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                      <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                        New
                      </span>
                      <span className="font-medium text-xl text-gray-300 title-font">
                        {""}
                      </span>
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                        lat: "loading"
                        <br />
                        lng: "loading"
                      </h2>
                      <h1 className="title-font text-l font-medium text-white mb-3">
                        "loading"
                      </h1>
                      <p className="leading-relaxed mb-5">"loading"</p>
                      <a href="../" className="inline-flex items-center">
                        <span className="flex-grow flex flex-col">
                          <span className="title-font font-medium text-white">
                            "loading"
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="py-8 px-4 lg:w-1/3">
                  <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                      <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                        New
                      </span>
                      <span className="font-medium text-xl text-gray-300 title-font">
                        {""}
                      </span>
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                        lat: "loading"
                        <br />
                        lng: "loading"
                      </h2>
                      <h1 className="title-font text-l font-medium text-white mb-3">
                        "loading"
                      </h1>
                      <p className="leading-relaxed mb-5">"loading"</p>
                      <a href="../" className="inline-flex items-center">
                        <span className="flex-grow flex flex-col">
                          <span className="title-font font-medium text-white">
                            "loading"
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map Area */}
      <MapSection />

      {/* Contact Form Area */}
      <Contact />

      {/* Footer Area */}
      <Footer />

    </div>
  );
}
