//Lib
import _ from 'underscore';
import d3 from 'd3';

var Chart = function Chart(options){
    this.width = 360;
    this.height = 120;
    this.padding = 1;
}

Chart.prototype.dataFill = function(data,limit){

    if(data.length < limit){
        var num = limit - data.length;
        for(var i=0;i<num;i++){
            data.unshift({
                placeholder : true
            })
        }
    }
    return data;
}

Chart.prototype.dataRanges = function(data){

    var high = 0,
        low = 1000,
        div = 0;

    _.each(data,function(v){
        if(high < v.ave) high = v.ave;
        if(low > v.ave) low = v.ave;
    })

    div = Math.ceil((high - low) / 10)

    _.each(data,function(v){
        v.range = Math.ceil(((v.ave - low) / div))
    });

    return data;

}



Chart.prototype.bar = function(data,target){

    var w = this.width,
        h = this.height,
        t = target,
        p = this.padding,
        data = this.dataFill(data,30);

    var svg = d3.select(t)
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d,i) {
            return i * (w / data.length);
        })
        .attr("y",function(d){
            if(_.has(d,'placeholder')){
                return 0;
            }else{
                return h - ((d.ave / h ) * 100 )
            }
        })
        .attr("width", (w / data.length) - p)
        .attr("height",function(d){
            if(_.has(d,'placeholder')){
                return h;
            }else{
                return (d.ave / h ) * 100
            }
        })
        .attr("class", function(d){
            if(_.has(d,'placeholder')){
                return 'placeholder';
            }else{
                return 'range-10'
            }
        });

}

Chart.prototype.block = function(data,target){

    this.dataRanges(data)

    var w = this.width,
        h = this.height,
        t = target,
        p = this.padding,
        data = this.dataFill(data,396);

    var svg = d3.select(t)
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d,i) {
            return (Math.floor((i / 12)) * (10 + p))
        })
        .attr("y",function(d,i){
            return ((i % 12) * (9 + p))
        })
        .attr("width", 10)
        .attr("height",9)
        .attr("class", function(d){
            if(_.has(d,'placeholder')){
                return 'placeholder';
            }else{
                return 'range-'+d.range;
            }
        })
        .attr("data-value", function(d){
            if(_.has(d,'placeholder')){
                return 0;
            }else{
                return d.ave;
            }
        });

}

export default new Chart;