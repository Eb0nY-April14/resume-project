/* When our scipts are loaded, they will call this initMap() function which takes no parameters. */
function initMap() {
    /* The code on line 205 below creates a new map object which is provided by Google maps API, 
    we'll then use 'document.getElementById()' method to retrieve the div with an id of "map" & 
    this is where our map will be rendered. */
    // var map = new google.maps.Map(document.getElementById("map"), { // Old version used by Tutor
   const map = new google.maps.Map(document.getElementById("map"), { 
        zoom: 3,  // This sets the zoom parameter which is the initial zoom on the map.
        center: { lat: -28.024, lng: 140.887 },
         /* center: { //  Old Version used by tutor. We set the central coordinates within the curly braces below which is where the map initially displays.
            lat: 46.619261,
            lng: -33.134766
        } */    
    });
    /* ADDING SOME MARKERS BELOW TO SHOW WHERE CHRISTIANA HAS BEEN. EACH INDIVIDUAL LETTER 
    STORED IN 'locations' VARIABLE WILL APPEAR ON THE MARKERS. It creates an array of alphabetical 
    characters used to label the markers.*/
    /* var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; OLD VERSION USED BY TUTOR */
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    /* WE CREATE AN ARRAY CALLED 'locations' THAT WILL CONTAIN A SET OF OBJECTS. EACH OBJECT 
    WILL CONTAIN A LATITUDE & LONGITUDE OF THE DIFFERNT PLACES THAT CHRISTIANA HAS VISITED. */
   /* var locations = [   // All these latitudes & longitudes represent locations in Sydney
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ]; */


    const locations = [
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
      { lat: -33.848588, lng: 151.209834 },
      { lat: -33.851702, lng: 151.216968 },
      { lat: -34.671264, lng: 150.863657 },
      { lat: -35.304724, lng: 148.662905 },
      { lat: -36.817685, lng: 175.699196 },
      { lat: -36.828611, lng: 175.790222 },
      { lat: -37.75, lng: 145.116667 },
      { lat: -37.759859, lng: 145.128708 },
      { lat: -37.765015, lng: 145.133858 },
      { lat: -37.770104, lng: 145.143299 },
      { lat: -37.7737, lng: 145.145187 },
      { lat: -37.774785, lng: 145.137978 },
      { lat: -37.819616, lng: 144.968119 },
      { lat: -38.330766, lng: 144.695692 },
      { lat: -39.927193, lng: 175.053218 },
      { lat: -41.330162, lng: 174.865694 },
      { lat: -42.734358, lng: 147.439506 },
      { lat: -42.734358, lng: 147.501315 },
      { lat: -42.735258, lng: 147.438 },
      { lat: -43.999792, lng: 170.463352 },
    ];


    /* Here, we'll iterate through the locations array set up above & create a new marker that 
    has the label from our string. The 'map' method used here is a built-in JavaScript method 
    & should not be confused with the Google map that we are working with. The map method in 
    JS works similar to the forEach() function but the difference is that this returns an array 
    with the results of looping through each time in our locations array. The map method can 
    take up to 3 arguments but we'll use 2 here which are 'location' i.e the current value of 
    where we are in the array as we loop through & 'i' which is the index number of where we 
    currently are in the array. */
    // var markers = location.map(function(location, i) { // Old version used by the tutor
    const markers = locations.map((location, i) => { // New version in Google map's documentation   
        /* This will return a new google.maps.marker object that will have a 'position' value which 
        will be set to the 'current location' & a 'label' value which will be set to 'i % labels.length'.  */
        return new google.maps.Marker({
            position: location,
            /* The reason we use modulo to get the value of label is bcos we want to get just one of our 
            labels out of the string we created. Another reason is so that if we have more than 26 locations,
            it will loop around to the start of our string again & go from Z back to A instead of throwing
            an error */
            label: labels[i % labels.length],
        });
    });

    /* Add a marker clusterer to manage the markers. This is the latest version used in Google documentation */
    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    }); 

    /*Add a marker clusterer to manage the markers. This is the old version used by the tutor in the lesson video. */
    //var markerCluster = new MarkerClusterer(map, markers, 
    //{imagePath:
    //    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"});
}
