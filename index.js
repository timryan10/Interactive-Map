
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},

    buildMap(){
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 11,
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(this.map)

    var marker = L.marker(this.coordinates)
    marker.addTo(this.map).bindPopup('<p1><b>You are here</b></p1>')
    },

    addBusinessMarkers(){
        for (var i = 0; i < this.business.length; i++){
            this.markers = L.marker([
                this.businesses[i].latitude,
                this.businesses[i].longitude
            ])
            .bindPopup('<p>${this.business[i].name}<p>')
            .addTo(this.map)
        }
    }
}

async function getUserLocation(){
    let position = await new Promise((resolve, reject) => {
    
    navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [position.coords.latitude, position.coords.longitude]
}

async function fourSquare(business){
    let client = 'LJZKAFBUJTRYQXGEPWL4NEFZEOZBP5NIQC3VJYL1GLTMXY1M'
    let clientSecret = 'HJ1E3ZWXYDJPK5CKFR5IJ32X02RPPO02CVDX2GN41VO5QYR0'
    let limit = 5
    let latitude = myMap.coordinates[0]
    let longitude = myMap.coordinates[1]
    let response = await fetch(
        'https://api.foursquare.com/v3/places/search?query=place%20type&ll=latitude%2C%20longitude&limit=5', options
        )

    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsed.Data.response.group[0].items
    return businesses
}

function getBusiness(data){
    let business = data.map((element) => { 
        let location = {
        name: element.venue.name,
        latitude: element.venue.location.latitude,
        longitude: element.venue.location.longitude,
        };
        return location
    })
    return business
}

window.onload = async () => {
    const coords = await getUserLocation()
    myMap.coordinates = coords
    myMap.buildMap()
}

document.getElementById('submit').addEventListener('click',  async (event) => {
    event.preventDefault()
    let business = document.getElementById('business').value;
    let data = await getBusiness(business)
    myMap.businesses = processBusinesses(data)
    myMap.addBusinessMarkers()
})