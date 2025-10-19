const conversionOptions = {
  length: ["meter", "kilometer", "mile"],
  weight: ["gram", "kilogram", "pound"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
};

function updateUnits() {
  const type = document.getElementById("conversionType").value;
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  conversionOptions[type].forEach((unit) => {
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");
    opt1.text = unit;
    opt2.text = unit;
    fromUnit.add(opt1);
    toUnit.add(opt2);
  });
}

function convert() {
  const type = document.getElementById("conversionType").value;
  const value = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const resultText = document.getElementById("result");
  const historyList = document.getElementById("history");

  if (isNaN(value)) {
    resultText.innerText = "Please enter a valid number!";
    return;
  }

  let result;

  if (type === "length") {
    const inMeters =
      from === "kilometer"
        ? value * 1000
        : from === "mile"
        ? value * 1609.34
        : value;

    result =
      to === "kilometer"
        ? inMeters / 1000
        : to === "mile"
        ? inMeters / 1609.34
        : inMeters;
  } else if (type === "weight") {
    const inGrams =
      from === "kilogram"
        ? value * 1000
        : from === "pound"
        ? value * 453.592
        : value;

    result =
      to === "kilogram"
        ? inGrams / 1000
        : to === "pound"
        ? inGrams / 453.592
        : inGrams;
  } else if (type === "temperature") {
    let celsius;

    if (from === "Celsius") celsius = value;
    else if (from === "Fahrenheit") celsius = ((value - 32) * 5) / 9;
    else if (from === "Kelvin") celsius = value - 273.15;

    if (to === "Celsius") result = celsius;
    else if (to === "Fahrenheit") result = (celsius * 9) / 5 + 32;
    else if (to === "Kelvin") result = celsius + 273.15;
  }

  const roundedResult = result.toFixed(2);
  resultText.innerText = `${value} ${from} = ${roundedResult} ${to}`;

  // Add to history
  const listItem = document.createElement("li");
  listItem.innerText = `${value} ${from} → ${roundedResult} ${to}`;
  historyList.prepend(listItem); // latest on top
}

// Initialize units on page load
updateUnits();
