import domtoimage from "dom-to-image";





export const condensed = text => {
	console.log(text);
  return text.split(" ").join("");
};

export const commaSeparateNumber = val => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
	val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return val;
}

export const cleanNumber = value => {
  return Number(
    value
      .split("$")
      .join("")
      .split(",")
      .join("")
      .split("%")
      .join("")
  );
};

export const rowObject = text => {
  let assets = text.split("\t");
  return { Name: assets[0], Value: cleanNumber(assets[1]) };
};

export const makeArray = input => {
  const rows = input.split("\n");
  const rowArray = [];

  for (let i = 0; i < rows.length; i += 1) {
    if (rows[i].indexOf("\t") !== -1) {
      rowArray.push(rowObject(rows[i]));
    }
  }
  return rowArray;
};

export const cleanArray = array => {
  const finalArray = [];
  for (let i = 0; i < array.length; i += 1) {
    let nameCondensed = condensed(array[i].Name);
    if (isNaN(Number(array[i].Value)) === false && array[i].Name) {
      finalArray.push(array[i]);
    }
  }
  finalArray.sort(function(a, b) {
    var aConcat = Number(a["Value"]);
    var bConcat = Number(b["Value"]);

    if (aConcat < bConcat) {
      return 1;
    } else if (aConcat > bConcat) {
      return -1;
    } else {
      return 0;
    }
  });
  return finalArray;
};

export const percent = (number, largest, percentage) => {
  return (percentage * number) / largest;
};

export const onDataChange = (e) => {
    const states = document.querySelectorAll(".state");
    let unusability;
    let largest_number = "";
    let input = e.target.value;
    let initialArray = makeArray(input);
    let data = cleanArray(initialArray);
    let valueArray = data.map(function(datum) {
      return Number(datum.Value);
    });

    if (data.length >= 2) {
      const statesData = Object.keys(data).map(function(key) {
        return data[key];
      });

      for (let i = 0; i < statesData.length; i += 1) {
        //console.log(statesData[i].Name);
        for (let j = 0; j < states.length; j += 1) {
          if (
            states[j].classList.contains(
              condensed(statesData[i].Name).toLowerCase()
            )
          ) {
            let opacity = percent(
              statesData[i].Value,
              Math.max.apply(Math, valueArray),
              1
            );
            states[j].style.fill = `rgba(${this.state.chart_color},${opacity})`;
            states[j].style.stroke = `rgba(${this.state.chart_color},1)`;
          }
        }
      }

      this.setState({
        unusable: false,
        chart_largest: Math.max.apply(Math, valueArray),
        chart_data: statesData,
        chart_datainput: e.target.value
      });
    } else {
      for (let j = 0; j < states.length; j += 1) {
        states[j].style.fill = "#EEE";
        states[j].style.stroke = "#AAA";
      }


      this.setState({
        unusable: true,
        chart_largest: 0,
        chart_data: data,
        chart_datainput: e.target.value
      });
      


    }
  }
  
export const colorChange = (statesData, color) => {

for (let i = 0; i < statesData.length; i += 1) {
      	let stateName = statesData[i].Name.toLowerCase().split(" ").join("").split(".").join("");
        let state_SVG = document.querySelector("."+stateName);
        let valueArray = statesData.map(function(statesDatum) {
      return Number(statesDatum.Value);
    });
		let largest_number = Math.max.apply(Math, valueArray);
			if (state_SVG !== null) {
            let opacity = percent(
              statesData[i].Value,
              largest_number,
              1
            );
            state_SVG.style.fill = `rgba(${color},${opacity})`;
            state_SVG.style.stroke = `rgba(${color},1)`;			
			}
      }

}

export const downloadImage = () => {
        domtoimage
        .toJpeg(document.getElementById("chart"), { quality: 1 })
        .then(function(dataUrl) {
          var link = document.createElement("a");
          link.download = "map-chart.jpeg";
          link.href = dataUrl;
          link.click();
        });
  }
