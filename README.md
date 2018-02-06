# gestao-auto-app
Repositório do Projeto Gestão Auto - Ionic

# LocalNotification

1. Realizar as seguintes instalações na pasta do projeto:
- ionic cordova plugin add cordova-plugin-local-notification
- npm install --save @ionic-native/local-notifications

2. Download do android studio e SDK, que vem com o emulador android (não sei se tem separado pra baixar, acho que não)

3. Configurar as variáveis JAVA_HOME e ANDROID_HOME (Tutorial: https://cordova.apache.org/docs/en/latest/guide/platforms/android/#installing-the-requirements)

4. Abra o android studio (é necessário criar um projeto para abri-lo) e após isso vá em gerenciar AVD (é um ícone no fim da barra de tarefas) e crie um dispositivo. Use API 26 (a 27 não rola pois ainda é betha)

5. No projeto, todos as classes Providers devem chamar a URL apontando para o seguinte endereço: http://10.0.2.2:8080/ (é o localhost da tua maquina que o emulador reconhece)

6. No terminal na pasta de instalação do projeto execute os seguintes comandos:
- ionic cordova platform add android
- ionic cordova emulate android

7. No menu do app tem uma página temporária chamada "Notificação" com um botão que, ao clicá-lo, em 5 segundos é gerada uma notificação
