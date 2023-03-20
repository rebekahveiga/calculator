// obtém os elementos dos botões
var botaoNum = document.querySelectorAll(".num");
var operadorNum = document.querySelectorAll(".operator");
var decimalButton = document.querySelector(".decimal");
var igualNum = document.querySelector(".igualdade");
var display = document.getElementById("display");

// função para adicionar um valor ao display
function incrementaDisplay(value) {
    // verifica se o valor é um número, operador ou ponto decimal
    var numeros = /^[0-9]+$/;
	if (numeros.test(value)|| (value==".")) {
        // se for um número ou ponto decimal, adiciona ao display
        display.value += value;
    } else if (value == "C") {
        // se for o botão de limpar, limpa o valor do display
        display.value = "";
    } else if (achaOperador(value)) {
        // se for um operador, adiciona ao display
        display.value += " " + value + " ";
    } else if (value == "Del") {
        // se for o botão de deletar, remove o último caractere do display
        display.value = display.value.slice(0, -1);
    } else if (value == "+/-") {
		// se for o botão +/-, negativa ou positiva o número escolhido
		var valor = parseFloat(display.value);
		if (valor >= 0) {
  			display.value = -valor;
		} else {
			display.value = Math.abs(valor);
		}
	}
}


// função para verificar se um valor é um operador aritmético
function achaOperador(value) {
	return value == "+" || value == "-" || value == "*" || value == "/"
		|| value == "%";
}

// adiciona um evento de clique para cada botão numérico
for (var i = 0; i < botaoNum.length; i++) {
    botaoNum[i].addEventListener("click", function() {
        incrementaDisplay(this.textContent);
    });
}

// adiciona um evento de clique para botão decimal
for (var i = 0; i < decimalButton.length; i++) {
    decimalButton[i].addEventListener("click", function() {
        incrementaDisplay(this.textContent);
    });
}

for (var i = 0; i < operadorNum.length; i++) {
    operadorNum[i].addEventListener("click", function() {
        incrementaDisplay(this.textContent);
    });
}

// função para somar dois números
function add(a, b) {
  return a + b;
}

// função para subtrair dois números
function subtrair(a, b) {
  return a - b;
}

// função para multiplicar dois números
function multiplicar(a, b) {
  return a * b;
}

// função para dividir dois números
function dividir(a, b) {
  if (b === 0) {
    throw new Error("Divisão por zero");
  }
  return a / b;
}
function porcent(a){
 if(a === 0){
	throw new Error("% por zero");
 }
 return (a)/100;
}


// adiciona um evento de clique para o botão de igualdade
igualNum.addEventListener("click", function() {
	// obtém a expressão do display
	var conta = display.value;
  
	// numeros para identificar números e operadores
	var numeros =  /(\d+|\+|\-|\*|\/|\%|\.)+/g;
  
	// array para armazenar os números e operadores
	var salvaNum = [];
  
	// percorre a expressão e separa os números e operadores
	while (match = numeros.exec(conta)) {
	  salvaNum.push(match[0]);
	}
  
	try {
	  // calcula o resultado da expressão
	  var resultado = parseFloat(salvaNum[0]);
	  for (var i = 1; i < salvaNum.length; i += 2) {
		var operador = salvaNum[i];
		var operando = parseFloat(salvaNum[i + 1]);
		switch (operador) {
		  case "+":
			resultado = add(resultado, operando);
			break;
		  case "-":
			resultado = subtrair(resultado, operando);
			break;
		  case "*":
			resultado = multiplicar(resultado, operando);
			break;
		  case "/":
			resultado = dividir(resultado, operando);
			break;
		  case "%":
			resultado = multiplicar(resultado, porcent(operando));
			break;
		  default:
			throw new Error("Operador inválido");
		}
	  }
  
	  // atualiza o display com o resultado
	  display.value = resultado;
	} catch (e) {
	  // se ocorrer um erro, exibe uma mensagem de erro no display
	  display.value = "Erro";
	}
  });
  