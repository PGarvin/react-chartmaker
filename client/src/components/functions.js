const condensed = text => {
  return text.split(" ").join("");
};

const cleanNumber = value => {
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

const rowObject = text => {
  let assets = text.split("\t");
  return { Name: assets[0], Value: cleanNumber(assets[1]) };
};

const makeArray = input => {
  const rows = input.split("\n");
  const rowArray = [];

  for (let i = 0; i < rows.length; i += 1) {
    if (rows[i].indexOf("\t") !== -1) {
      rowArray.push(rowObject(rows[i]));
    }
  }
  return rowArray;
};

const cleanArray = array => {
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

const percent = (number, largest, percentage) => {
  return (percentage * number) / largest;
};

const onDataChange = (e) => {
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
            states[j].style.fill = `rgba(88,136,158,${opacity})`;
            states[j].style.stroke = "rgba(88,136,158,1)";
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

console.log("Line 163 || "+this.state.chart_headline);
console.log("Line 164 || "+this.state.chart_intro);

      this.setState({
        unusable: true,
        chart_largest: 0,
        chart_data: data,
        chart_datainput: e.target.value
      });
      
console.log("Line 173 || "+this.state.chart_headline);
console.log("Line 174 || "+this.state.chart_intro);

    }
  }

exports.condensed = condensed;
exports.cleanNumber = cleanNumber;
exports.rowObject = rowObject;
exports.makeArray = makeArray;
exports.cleanArray = cleanArray;
exports.percent = percent;
exports.onDataChange = onDataChange;