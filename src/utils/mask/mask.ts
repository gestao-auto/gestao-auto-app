import {Injectable} from '@angular/core';

@Injectable()
export class Mask {
  private len: any;

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
