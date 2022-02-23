mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc2huYXNhd2FudCIsImEiOiJja3VjeTd6bDYxMjNtMm9teGFscXczcWcwIn0.ONGVQyfTzFfLf2DjqdoCbw';

/* DEFAULT MAP WHILE CLICKING IN THE OPTION 'MAP'*/
const coords = [72.932, 19.029];
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/krishnasawant/ckuwgt16u65w919o3t71i8y5c',
    center: coords,
    zoom: 10.27
});


const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// create DOM element for the marker
const el = document.createElement('div');
el.id = 'marker';

// create the marker
new mapboxgl.Marker(el)
    .setLngLat(coords)
    .addTo(map);

var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
});

map.addControl(directions, 'top-left');

/* LIVE LOCATION ON THE MAP WHILE CLICKING ON 'LIVE LOCATION'*/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successlocation,
            errorlocation, { enableHighAccuracy: true });
    }
    else {
        body.innerHTML = "Access to Live Location is Denied";
    }
}

function successlocation(position) {
    console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude]);
    console.log("Latitude : " + position.coords.latitude + "<br>Longitude : " + position.coords.longitude);
}

function errorlocation() {

}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/krishnasawant/ckuwgt16u65w919o3t71i8y5c',
        center: center,
        zoom: 12
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');


    // create DOM element for the marker
    const el = document.createElement('div');
    el.id = 'marker';

    // create the marker
    new mapboxgl.Marker(el)
        .setLngLat(center)
        .addTo(map);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
    });

    map.addControl(directions, 'top-left');
}

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);