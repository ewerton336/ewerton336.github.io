function ao_clicar() {
  alert("Em desenvolvimento");
}

function alterar_elemento() {
  document.getElementById("agradecimento").innerHTML = "ooiiii";
}

function retorna_elemento() {
  document.getElementById("agradecimento").innerHTML = "a";
}

function mudarTema() {


  document.getElementById("corpo").classList.toggle("text-light");
  document.getElementById("corpo").classList.toggle("bg-dark");
  document.getElementById("corpo").classList.toggle("bg-light");
  document.getElementById("corpo").classList.toggle("text-dark");


}

// function yesnoCheck(that) {
//     if (that.value == "other") {
//         document.getElementById("ifYes").style.display = "block";
//     } else {
//         document.getElementById("ifYes").style.display = "none";
//     }
