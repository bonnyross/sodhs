var map = L.map('map', {
	center: [52.34970, -1.40193],
	maxZoom: 19,
	zoom: 18
}).fitBounds([[52.350488,-1.403351],[52.348505,-1.401002]]);

var imageUrl = '/sodhs/map',
	imageBounds = [[52.35258,-1.40714],[52.34787,-1.39664]];
var tile = L.imageOverlay(imageUrl, imageBounds).addTo(map);
tile.setOpacity(0.6)
	
function style(feature) {
    return {
        weight: 3,
        color: 'red',
        dashArray: '4'
    };
}

var trailpath	= new L.geoJson.ajax('/sodhs/trailpath', {
//var trailpath	= new L.geoJson.ajax('http://alecross-pc:3000/sodhs/trailpath', {
	style: style
}).addTo(map);
	
$.ajax({ 
	type: 'GET', 
	url: '/sodhs/trail', 
	dataType: 'json',
	success: function (data) {
		var photos = [];
		data = data.features;
		for (var i = 0; i < data.length; i++) {
			photos.push({
				lng: data[i].geometry.coordinates[0], 
				lat: data[i].geometry.coordinates[1],
				url: data[i].properties.url,
				caption: data[i].properties.caption,
				thumbnail: data[i].properties.thumbnail
			});
		}
		photoLayer.add(photos).addTo(map);
		map.fitBounds(photoLayer.getBounds());
	}
});

if (typeof window.orientation !== 'undefined') { 
	var photowidth = 325
} else {
	var photowidth = 600
}	

var photoLayer = L.photo.cluster( { spiderfyDistanceMultiplier: 1 }).on('click', function (evt) {
		evt.layer.bindPopup(L.Util.template('<img src="{url}"/></a><p>{caption}</p>', evt.layer.photo), {
		className: 'leaflet-popup-photo',
		minWidth: photowidth
	}).openPopup();
});


