## React-Leaflet

 React Application to plot location route using leaflet.js

  ### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v12.14.1

    $ npm --version
    6.13.4

## Start & watch in Development (Local)

    $ npm install
    $ npm start

 
 ### Leaflet Installation
 React, React DOM and Leaflet are required peer dependencies. You must add them to your project if they are not already installed:
 
    $ npm install react-leaflet
    
   Finally, you can import the necessary components. For example:
   
    import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
    
  
### Documentaion
 
   [Getting Started](https://react-leaflet.js.org/)  
   [API Reference](https://react-leaflet.js.org/docs/api-map/)
   
   
 ### MQTT
 MQTT.js is a client library for the [MQTT](http://mqtt.org/) protocol, written
in JavaScript for node.js and the browser.

## Installation

```sh
npm install mqtt --save
```


### Block Diagram

![download](https://user-images.githubusercontent.com/52348398/148891310-a7f11839-8ccb-4bd2-bad3-2ad360d024b0.jpg)

<a name="example"></a>
## Example

For the sake of simplicity, let's put the subscriber and the publisher in the same file:

```js
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
```

output:
```
Hello mqtt
```

If you want to run your own MQTT broker, you can use
[Mosquitto](http://mosquitto.org) or
[Aedes-cli](https://github.com/moscajs/aedes-cli), and launch it.

You can also use a test instance: test.mosquitto.org.
