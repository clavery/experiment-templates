(function() {

  var points = [[ 43.5,-71.5,174 ],
    [ 43.4,-71.4,158 ],
    [ 43.3,-71.3,145 ]
  ];

  var layers = [];

  var center = new ol.geom.Point([ -71.5, 43.5]);
  center.transform('EPSG:4326', 'EPSG:3857');

  var bingMapsLayer = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.BingMaps({
      key: 'AhBaGnyj9dWdEkCNmrmmaNfv7ItIkIbBtLg2ED5BMCLImGk5yv6miU9OPtvAqeUk',
      imagerySet: 'Aerial'
      // use maxZoom 19 to see stretched tiles instead of the BingMaps
      // "no photos at this zoom level" tiles
      // maxZoom: 19
    })
  })
  layers.push(bingMapsLayer);

  var features = new ol.source.Vector();

  _.each(points, function(data) {
     var wayPoint = new ol.geom.Point([data[1], data[0]]);
     wayPoint.transform('EPSG:4326', 'EPSG:3857');
     var wayPointFeature = new ol.Feature({
       geometry: wayPoint
     });
     features.addFeature(wayPointFeature);
  });

  var wayLayer = new ol.layer.Vector({
    title: 'Points',
    source: features,
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({color: 'red'})
      })
    })
  });
  layers.push(wayLayer);

  var map = new ol.Map({
    controls: ol.control.defaults().extend([
      new ol.control.FullScreen()
    ]),
    view: new ol.View({
      center: center.getCoordinates(),
      zoom: 16
    }),
    renderer: undefined,
    layers: layers,
    target: 'map'
  });

  // controls
  map.addControl(new ol.control.ZoomSlider());
  map.addControl(new ol.control.MousePosition({
    projection: 'EPSG:4326'
  }));

})();
