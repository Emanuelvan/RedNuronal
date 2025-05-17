// Crear la red neuronal
const network = new brain.NeuralNetwork();

// Entrenar la red neuronal con ejemplos
network.train([
  // femenino (0)
  {
    input: { age: 1 / 100, gender: 0 },
    output: { red: 1, green: 0.6, blue: 0.6, fontSize: 0.5, textColor: 1 },
  },
  {
    input: { age: 100 / 100, gender: 0 },
    output: { red: 1, green: 0.31, blue: 0.31, fontSize: 5, textColor: 0 },
  },

  // masculino (1)
  {
    input: { age: 1 / 100, gender: 1 },
    output: { red: 0.8, green: 0.9, blue: 1, fontSize: 0.5, textColor: 1 },
  },
  {
    input: { age: 100 / 100, gender: 1 },
    output: { red: 0, green: 0.39, blue: 1, fontSize: 5, textColor: 0 },
  },

  // neutro (0.5)
  {
    input: { age: 50 / 100, gender: 0.5 },
    output: { red: 0.8, green: 0.8, blue: 0.8, fontSize: 2.5, textColor: 0.5 },
  },
]);

function updateSliders() {
  const age = document.getElementById("SliderAge").value;
  const gender = document.getElementById("SliderGender").value;
  const GenderText = document.getElementById("GenderText");

  document.getElementById("ageValue").innerText = age;
  document.getElementById("genderValue").innerText = gender;

  // Normalizar las entradas
  const input = {
    age: age / 100,
    gender: parseFloat(gender),
  };

  const output = network.run(input);

  // Aplicar el color y el tamaño del texto
  const red = Math.round(output.red * 255);
  const green = Math.round(output.green * 255);
  const blue = Math.round(output.blue * 255);
  const fontSize = output.fontSize * 100;
  const textColorValue = Math.round(output.textColor * 255);

  GenderText.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  GenderText.style.fontSize = `${fontSize}px`;
  GenderText.style.color = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`;

  // Actualizar el texto según el género
  if (gender < 0.5) {
    GenderText.innerText = "Femenino";
  } else if (gender > 0.5) {
    GenderText.innerText = "Masculino";
  } else {
    GenderText.innerText = "Género Neutro";
  }
}
updateSliders();
