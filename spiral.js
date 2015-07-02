
var spiral = function(n){

    var direction;
    x=0
    y=0
    resultArray = [[0,0]]
    for (var k=1; k < n/2; k++){
        direction = k%2;
        if (direction === 1){
            var i = 0;
            var j = 0;
            while(i < k){
                x++;
                resultArray.push([x,y]);
                i++
            }
            while(j < k){
                y++;
                resultArray.push([x,y])
                j++
            }
        }
        if (direction === 0){
            var i = 0;
            var j = 0;
            while (i < k){
                x--;
                resultArray.push([x,y]);
                i++;
            }
            while (j < k){
                y--;
                resultArray.push([x,y]);
                j++
            }
        }
    }
    return resultArray;
}

var spiralData = spiral(20)

var width = 500;
var height = 500;

var svg = d3.select("td.spiral").append("svg")
    .attr("width", width)
    .attr("height", height)

var group = svg.selectAll('g')
    .data(spiralData)
    .enter().append('g')
    .attr('transform', 'translate(250,250)')

var line = d3.svg.line()
            .x(function(d){return d[0]*30})
            .y(function(d){return -d[1]*30})


function getInterpolation() {
  
  var interpolate = d3.scale.quantile()
      .domain([0,1])
      .range(d3.range(1, spiralData.length + 1));

  return function(t) {
      var interpolatedLine = spiralData.slice(0, interpolate(t));
      return line(interpolatedLine);
      }
  }


// group.append('text')
//     .attr('x', function(d){return d[0]*80+5})
//     .attr('y', function(d){return -d[1]*80+20})
//     .text(function(d){return '('+d[0]+','+d[1]+')'})

// group.append('circle')
//     .attr('cx', function(d){return d[0]*80})
//     .attr('cy', function(d){return -d[1]*80})
//     .attr('r', 5)

var path = group.append('path')
    .transition()
    .ease('linear')
    .duration(6000)
    .attrTween('d', getInterpolation)

// var path = group.append('path')
//         .attr('d', line(spiralData))

// var totalLength = path.node().getTotalLength();

// path
//     .attr("stroke-dasharray", totalLength + " " + totalLength)
//     .attr("stroke-dashoffset", totalLength)
//     .transition()
//         .duration(6000)
//         .ease("linear")
//         .attr("stroke-dashoffset", 0);

