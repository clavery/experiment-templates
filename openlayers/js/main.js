(function() {

  var points = [[ 43.1762,-71.1819,174 ],
    [ 43.1684,-71.1711,158 ],
    [ 43.1753,-71.1826,145 ],
    [ 43.1670,-71.1694,151 ],
    [ 43.1750,-71.1832,176 ],
    [ 43.1746,-71.1835,174 ],
    [ 43.1746,-71.1835,174 ],
    [ 43.1746,-71.1832,168 ],
    [ 43.1744,-71.1826,165 ],
    [ 43.1737,-71.1836,170 ],
    [ 43.1732,-71.1834,169 ],
    [ 43.1713,-71.1852,186 ],
    [ 43.1707,-71.1845,195 ],
    [ 43.1718,-71.1817,143 ],
    [ 43.1775,-71.1802,168 ],
    [ 43.1764,-71.1809,144 ]];

  var map = new OpenLayers.Map('#map', {
    allOverlays: true
  });

  map.addLayer(new OpenLayers.Layer.OSM());
  var gphy = new OpenLayers.Layer.Google(
    "Google Physical",
    {type: google.maps.MapTypeId.TERRAIN}
    // used to be {type: G_PHYSICAL_MAP}
  );
  map.addLayer(gphy);

  var gsat = new OpenLayers.Layer.Google(
    "Google Satellite",
    {
      type: google.maps.MapTypeId.SATELLITE,
      numZoomLevels: 23,
      MAX_ZOOM_LEVEL: 22
    }
  );
  map.addLayer(gsat);

  // controls
  map.addControl(new OpenLayers.Control.LayerSwitcher());
  map.addControl(new OpenLayers.Control.PanZoomBar());


  var wayLayer = new OpenLayers.Layer.Vector('points');

  _.each(points, function(data) {
    var wayPoint = OpenLayers.Geometry.Point(data[0], data[1]);
    wayPoint = wayPoint.transform(proj, map.getProjectionObject());
    var addWayPoint = new OpenLayers.Feature.Vector(wayPoint, null); 
    wayLayer.addFeatures([addWayPoint]); 
  });

  map.addLayer(wayLayer);
  
})();
