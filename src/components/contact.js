import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Suggest from "./suggest";
import Modal from "./modal";

const PUSH_SIGHTINGS = gql`
  mutation AddSighting($sighting: SightingInsertInput!) {
    sighting: insertOneSighting(data: $sighting) {
      _id
      description
      witness
      email
      submitDate
      location {
        lat 
        lng
      }
      isApproved
    }
  }
`;

const timestamp = Date.now();

function Contact() {
  // disabling lint error because we're not using this 'data' variable quite as suggested, but I want to remember it's here
  // eslint-disable-next-line
  const [pushSighting, { data }] = useMutation(PUSH_SIGHTINGS);
  const [sightingObject, setSightingObject] = useState({});
  const [showModal, setShowModal] = useState(false);

  function collectWitness(event) {
    setSightingObject({
      ...sightingObject,
      witness: event.target.value,
      submitDate: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(timestamp),
    });
  }
  function collectLocation(suggest) {
    var lat = suggest[0].geometry.location.lat();
    var lng = suggest[0].geometry.location.lng();

     console.log(lat); // --> 37.7603726
     console.log(lng); // --> -122.47157

    setSightingObject({
      ...sightingObject,
      location: {lat, lng}
    });
  }
  function collectDescription(event) {
    setSightingObject({
      ...sightingObject,
      description: event.target.value,
    });
  }
  function collectEmail(event) {
    setSightingObject({
      ...sightingObject,
      email: event.target.value,
      isApproved: false
    });
  }

  async function handleSubmit(event) {
    // need to prevent default or else the page will reload before the data gets sent to mongo
    event.preventDefault();
    if (document.getElementById("bot-field").value) {
      alert(
        "Do not disrespect the MothMan 不要不尊重天蛾人 Не проявляйте неуважения к человеку-мотыльку"
      );
      return;
    } else console.log("not a bot");
    await pushSighting({ variables: { sighting: sightingObject } }).then(
      setShowModal(true)
    );
  }

  return (
    <section id="contact" className="text-gray-500 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Report a Sighting
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            All submissions will be taken seriously and will be responded to as
            quickly as possible.
          </p>
        </div>
        <form name="sightings" onSubmit={handleSubmit}>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <input
                  onChange={(e) => {
                    collectWitness(e);
                  }}
                  name="name"
                  required
                  className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-teal-500 text-base px-4 py-2"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="p-2 w-1/2">
                <input
                  onChange={(e) => {
                    collectEmail(e);
                  }}
                  required
                  className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-teal-500 text-base px-4 py-2"
                  placeholder="Email"
                  type="email"
                  name="email"
                />
              </div>
              <div className="p-2 w-full">
                <textarea
                  onChange={(e) => {
                    collectDescription(e);
                  }}
                  required
                  className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none h-48 focus:border-teal-500 text-base px-4 py-2 resize-none block"
                  placeholder="Message"
                  defaultValue={""}
                  name="description"
                />
              </div>
              <div className="p-2 mb-8 w-full flex items-center justify-center">

                {/* GeoSuggest Area */}
                <Suggest className="w-full" collectLocation={collectLocation} />



              </div>
              <div
                data-netlify-recaptcha="true"
                className="justify-center w-full"
              ></div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="flex mx-auto text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                >
                  Submit Report
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-gray-800 text-center">
                contact the developer <br></br>
                <a
                  href="https://baldmanjapan.com/contact/"
                  className="text-teal-500"
                >
                  Bald Man Japan
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showModal ? (
        <div>
          {" "}
          <Modal
            title={"Thank you!"}
            message={
              "We've received your submission and will notify you once it's approved and posted to the map."
            }
            signoff={"keep your eyes to the skies"}
            toggle={setShowModal}
          />{" "}
        </div>
      ) : (
        <></>
      )}
      <label className="hidden text-gray-900">
        Don’t fill this out if you’re human:{" "}
        <input className="bg-gray-900" name="bot-field" id="bot-field"></input>
      </label>
    </section>
  );
}

export default Contact;