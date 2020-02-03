const url = "./samples.json";

var selectDropdown = d3.select("#selDataset")

d3.select("#selDataset").on('change', optionChanged)

function addOptions() {
    d3.json(url).then(function(data) {
        data.names.forEach((name, i) => {
            var appendOption = selectDropdown.append("option").text(name).attr('value', i)
        })
        selectDropdown.selectedIndex = 0
    })
}

addOptions()

function optionChanged() {
    d3.json(url).then(function(data) {
        console.log(selectDropdown.property("value"))
    for (i=0; i<153; i++) { 
        if (i == selectDropdown.property("value"))
        {    
            buildBar(i)
            buildBubble(i)
            buildMeta(i)
        break
        }
    }
    })
}

function init() {
    buildBar("0")
    buildBubble("0")
    buildMeta("0")
  }

init()

function buildBar(i) {
    d3.json(url).then(function(data) {

        var otu_id = data.samples[i].otu_ids.slice(0,10)
        var otu_id_str = otu_id.map(num => `OTU ID ${num.toString()}`)
        var sample_value = data.samples[i].sample_values.slice(0,10)

        var trace1 = {
            x: sample_value,
            y: otu_id_str,
            type: "bar",
            orientation: "h",
            text: data.samples[i].otu_labels
        };

        var data = [trace1]

        var layout = {
            title: "Occurences of OTU IDs",
            yaxis: {type: 'category'},
            width:500
        }

        Plotly.newPlot("bar", data, layout)
    })
}


function buildBubble(i) {
    d3.json(url).then(function(data) {

        var name = data.samples[i].id
        var otu_id = data.samples[i].otu_ids
        var sample_value = data.samples[i].sample_values

        var trace1 = {
            x: otu_id,
            y: sample_value,
            mode: 'markers',
            marker: {
              size: sample_value,
              color: otu_id
            },
            text: data.samples[i].otu_labels
          };
          
          var data = [trace1];
          
          var layout = {
            title: '',
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: { title: "OTU ID"}
            
          };
          
          Plotly.newPlot('bubble', data, layout); 
    })
}

function buildMeta(i) {
    d3.json(url).then(function(data) {

        var id = data.metadata[i].id
        var ethnicity = data.metadata[i].ethnicity
        var gender = data.metadata[i].gender
        var age = data.metadata[i].age
        var location = data.metadata[i].location
        var bbtype = data.metadata[i].bbtype
        var wfreq = data.metadata[i].wfreq

        var selectMetabody = d3.select("#sample-metadata")
        var appendUnorderedlist = selectMetabody.append("ul")
        var appendListelements = appendUnorderedlist.append("li")
        var appendText = appendListelements.text("ID: " + id)
        var appendListelements = appendUnorderedlist.append("li")
        var appendText = appendListelements.text("Ethnicity: " + ethnicity)
        var appendListelements = appendUnorderedlist.append("li")
        var appendText = appendListelements.text("Gender: " + gender)
        var appendListelements = appendUnorderedlist.append("li")
        var appendText = appendListelements.text("Age: " + age)
        var appendListelements = appendUnorderedlist.append("li")
        var appendText = appendListelements.text("Location: " + location)
        var appendListelements = appendUnorderedlist.append("li")
        var appendText = appendListelements.text("BBtype: " + bbtype)
        var appendListelements = appendUnorderedlist.append("li")
        var appendText = appendListelements.text("Wfreq: " + wfreq)

    })
}




