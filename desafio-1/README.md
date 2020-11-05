# Instruções:

## Como executar este projeto localmente:

1) Instale os pacotes de dependências:
```
npm install
```

2) Execute o comando para iniciar o `servidor` e o `client` ao mesmo tempo (utilizando um pacote chamado `concurrently`):
> O servidor irá executar na porta 3001 e o client na 3000;
```
npm run development

```

3) Caso aconteça algum problema com o script anterior, pode ser executado manualmente o script do `servidor` e do `client`:
> Será necessário abrir 2 terminais para executar separadamente;
```
// client:
npm run start

// servidor:
npm run server
```

4) Por fim, aguarde a execução dos comandos anteriores e acesse [http://localhost:3000/](http://localhost:3000/).
