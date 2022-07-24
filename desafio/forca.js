class Forca {

  vidas;
  letrasChutadas;
  palavra;
  palavraSecreta;
  estado;

  constructor(palavraSecreta){
    this.palavraSecreta = palavraSecreta;
    this.letrasChutadas = [];
    this.palavra = [];
    this.vidas = 6;
    this.inicializarPalavra(this.palavraSecreta);
    this.estado = "aguardando chute";
  }

  chutar(letra) {
  //método para manipular o chute, verifica se é válido e se já foi feito esse chute, e inclui no letrasChutadas; se o chute for correto,
  //executa o método que inclui na palavra a letra acertada, se for incorreto, retira uma vida, e ao final de cada chute faz a verificação
  //se o jogador perdeu ou ganhou naquela rodada
    if ((this.verificaValidadeChute(letra) == true) && (this.verificaChutesFeitos(letra) == false)){
      this.incluiChutes(letra);
      if (this.verificaAcertouChute(letra) == true){
        this.chuteCorreto(letra);
      }else if (this.verificaAcertouChute(letra) == false){
        this.retiraVidas(this.vidas);
      }
    }
    this.verificaGanhou();
    this.verificaPerdeu();
  }

  verificaChutesFeitos(letra){
    //verifica se aquela letra está contida no array letrasChutadas, retorna true(se sim) ou false(se não); ou seja, espera-se um false para chute válido
    let letrasChutadas = this.letrasChutadas;
    return letrasChutadas.includes(letra);
  }


  inicializarPalavra(palavraSecreta){
    //percorre o array palavra e inclui _ para todos os índices
    for (let i = 0; i < (palavraSecreta.length); i++){
      this.palavra[i] = '_';
    }
  }

  verificaValidadeChute(letra){
    //verificar se possui apenas 1 caractere no chute e se não está vazio
    if ((letra.length != 1) || (letra == " ")){
      return false;
    }
    return true;
  }

  incluiChutes(letra){
    //inclui os chutes ao array letrasChutadas
    this.letrasChutadas.push(letra);
    return this.letrasChutadas;
  }

  verificaAcertouChute(letra){
    //verifica se a letra chutada está no array palavraSecreta ou não, ou seja, se acertou
    return this.palavraSecreta.includes(letra);
  }

  chuteCorreto(letra){
    //encontrar em quais posições a letra acertada está na palavraSecreta, e incluir ela no array posições;
    let posicoes = [];
    for (let i = 0; i < (this.palavraSecreta.length); i++){
      if (letra === this.palavraSecreta[i]){
        posicoes.push(i)
      }
    }

    //de acordo com os índices incluídos como elementos do array posicoes, incluir essa letra no array palavra, mostrando a letra acertada;
    for (let i = 0; i < (posicoes.length); i++){
      this.palavra[posicoes[i]] = letra
    }
  }

  retiraVidas(){
    //retira uma unidade do atributo vidas
    this.vidas--;
    return this.vidas;
  }

  buscarEstado() {
    //retorna o estado do jogo
    return this.estado;
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
  
  verificaPerdeu(){
    //verifica se as vidas chegaram a zero, e inclui o estado "perdeu" ao atributo estado
    if (this.vidas == 0){
      this.estado = "perdeu";
      return true;
    }
    return false;
  }

  verificaGanhou(){
    //verifica se ainda existem _ na palavra, se não existirem, inclui o estado "ganhou" ao atributo estado
    if (this.palavra.includes("_") == false){
      this.estado = "ganhou";
      return true;
    }
    return false;
  }
  
  buscarDadosDoJogo() {
  // retorna os dados do jogo e os retorna 
    let letrasChutadas = this.letrasChutadas;
    let vidas = this.vidas;
    let palavra = this.palavra;
      return {
        letrasChutadas, // Deve conter todas as letras chutadas
        vidas, // Quantidade de vidas restantes
        palavra// Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;
