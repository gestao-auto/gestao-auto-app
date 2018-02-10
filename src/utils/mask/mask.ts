import {Injectable} from '@angular/core';

@Injectable()
export class Mask {
  private len: any;
  private alphMasc: string;


  /*
  Informações importantes para utilizar o método "atualizarValor" para montar a mascara:
  A = Aceitará exclusivamente letra e alterará a letra para maíscula.
  a = Aceitará exclusivamente letra e alterará a letra para minúscula.
  9 = Aceitará exclusivamente número.
  x = Aceitará qualquer caracter alfanumerico.
  *Qualquer outro caracter será entendido como separador e será aplicado assim na mascara.
  EXEMPLO: ATZ-6369 (Máscara = AAA-9999);

  */
  public atualizarValor(valor : string, mascara : string){
    this.alphMasc = mascara.replace(/\W|_/g, '');
    valor = (""+valor).replace(/\W|_/g, '');
    var i = valor.length > this.alphMasc.length ? this.alphMasc.length : valor.length;
    var novoValor = "";
    while(i > 0){
    novoValor =  this.validarCaractere(valor.substring((i-1), i),this.alphMasc.substring((i-1), i))+novoValor;
      i=i-1;
    }
    return this.aplicarMascara(novoValor,mascara);
  }

  private validarCaractere(carac : string, mask : string){
    if(mask.match(/x/g)){
      return carac;
    }
    if(mask.match(/[0-9]/g) && carac.match(/[0-9]/g)){
      return carac;
    } else if(!mask.match(/[0-9]/g) && !carac.match(/[0-9]/g)){
      if ( mask.toUpperCase() == mask) {
        return carac.toUpperCase();
        }
      return carac.toLowerCase();
    }
    return " ";
  }
  
  private aplicarMascara(valor : string, mascara : string){
    var contSeparador = 0;
    var MAX =  valor.length;
    var novoValor = "";
    var i = 0;
    while(i < MAX){
      if(!this.ehAlphaNumerico(mascara.substring((i+contSeparador), i+contSeparador+1))){
        novoValor = novoValor+ mascara.substring((i+contSeparador), i+contSeparador+1);
        contSeparador = contSeparador + 1;
      }
      novoValor = novoValor + valor.substring((i), i+1);
      i = i + 1;
    }
    return novoValor;
  }

  private ehAlphaNumerico(c){
    return !c.match(/\W|_/g);

  }

  gerarValorMonetario(v): string {
    if (v) {
      var pad = v.replace(/\D/g, '');
      return this.aplicarMascaraMonetaria(pad);
    }
  }

  private aplicarMascaraMonetaria(a): string {
    while (a.length < 3) {
      a = "0" + a;
    }
    while (a.length > 3 && (a[0] == '0')) {
      a = a.substring(1);
    }
    this.len = a.length;
    var inteiro = a.substring(0, this.len - 2);
    var decimal = a.substring(this.len - 2, this.len);
    a = "";
    if(inteiro.length > 3){
      var i = inteiro.length;
      while(i > 3){
        a = "."+ inteiro.substring((i-3), i)+a;
        i = i - 3;
      }
      a = inteiro.substring(0, i) + a;
    }else {
      a = inteiro;
    }
    a = a + "," + decimal;
    if (a[0] == ",") {
      a = "0" + a;
    }
    return (a);
  }
}
