import React, { Component } from "react";
import "../App.css";
import L from "leaflet";
import { Map, TileLayer, Marker, FeatureGroup, Polyline } from "react-leaflet";
import navPin from "../assets/placeholder.png";
import mapData from "../data/mock.json";

export default class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      zoom: 13,
      coordinates: "",
    };
  }

  navigationIcon = L.icon({
    iconUrl: navPin,
    iconSize: [50, 50], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [24, 45], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76],
  });

  componentDidMount = () => {
    const mqtt = require("async-mqtt");

    var client = mqtt.connect("wss://test.mosquitto.org:8083");
    // var client = mqtt.connect("ws://broker.emqx.io:8080");

    // Message recieved

    setTimeout(() => {
      client.publish("geodata", JSON.stringify(mapData));
      console.log("Connected and published");
    }, 3000);

    client.on("message", (topic, payload) => {
      console.log(topic);
      console.log(payload);
      var signBuffer = new ArrayBuffer(payload.length);
      let res0 = new Uint8Array(signBuffer);
      for (let i = 0; i < payload.length; ++i) {
        res0[i] = payload[i];
      }
      // const signblob = new Blob([signBuffer], { type: "text/*" });
      const blb = new Blob([signBuffer], { type: "text/plain" });
      const reader = new FileReader();

      // This fires after the blob has been read/loaded.
      reader.addEventListener("loadend", (e) => {
        const text = e.srcElement.result;
        console.log(text);
        const { features } = JSON.parse(text);
        let arr = [];
        let arr2 = [];
        let coordinates = features[0]?.geometry?.coordinates;
        console.log(coordinates);
        for (var i = 0; i <= coordinates.length - 1; i++) {
          let obj = {};
          obj.longitude = coordinates[i][0];
          obj.latitude = coordinates[i][1];

          arr.push(obj);
          arr2.push([coordinates[i][1], coordinates[i][0]]);
        }

        this.setState({ item: arr, coordinates: arr2 });
      });
      reader.readAsText(blb);
      client.end();
    });

    client.on("connect", () => {
      client.subscribe("geodata");
      console.log("Connected to MQTT Broker.");
    });

    // var client = mqtt.connect(options);

    client.on("error", (err) => {
      console.log(`Connection to wss URL failed`);
      console.log(err);
      client.end();
    });

    client.on("error", (err) => {
      console.log(`Connection to wss URL failed`);
      console.log(err);
      client.end();
    });
  };

  render() {
    const positionGreenIcon = [12.683214911818666, 78.3984375];
    return (
      <div>
        <Map className="map" center={positionGreenIcon} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            {this.state.item.map((data) => (
              <>
                <Marker
                  position={[data.latitude, data.longitude]}
                  icon={this.navigationIcon}
                ></Marker>
              </>
            ))}
          </FeatureGroup>
          <Polyline
            pathOptions={{ color: "red" }}
            positions={this.state.coordinates}
          />
        </Map>
      </div>
    );
  }
}
