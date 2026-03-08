Layouts automáticos no figma
Nas configurações do laytout automático, o STROKES DEVEM estar marcado a opção INCLUDED IN LAYOUT para seguir o comportamento do frontend

Qual é o reset basico para a estilização
Todos os elementos da página devem serguir o content box: box sixing para que o tamanho inclua a contagem da borda, e todos devem ter o padding e margin resetados para zero.

- {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  }

Qual é a regra base para o body da página?
Não é regra ser o body, mas entende-se o body como a raiz de todos os items, e esta deve serguir o background --root-bg, deve ser display flex, colunar, com os items alinhados ao centro , com gap de --spacing-5xl e deve definir a fonte padrão do Valorant Tips

.root {
font-family: "Poppins", serif;
font-weight: 400;
font-style: normal;

display: flex;
flex-direction: column;
align-items: center;
gap: var(--spacing-5xl);

background: var(--root-bg);
}

O que é a região de complemento?
É a região fora do centro, ou seja, menus, footer e coisas fora da região de conteudo, essa região não possue regras definidas, ela só deve estar dentro da região de conteudo.

O que é a região do conteudo?
A região do conteudo é o elemento HTML que contém as imagens, os pots, seleção, login, etc. Normalmente se localiza ao centro da tela, é o bloco central inteiro.

O que é a região do conteudo útil?
É a região dentro da região de conteúdo que está disponível para uso, que seria onde os elementos podem ocupar, é o que sobrou tirando bordas e paddings.

Qual é a regra geral a região do conteudo?
Para desktop, o tamanho da região do conteudo deve ser de 890 pixels, o padding deve ser de 24 pixels, e o componente deve ter borda de 1px conforme especificficado nesse DS, isso deve resultar na região do conteudo útil de 840 pixels.

A região de conteudo deve ter um width de 100%, e não deve ter margin, ou seja, em telas menores que 840px, a borda ficará colado as laterais e deve diminuir de tamanho conforme a tela

Por que a região de conteudo util deve ser de 840px?
Foi um tamanho bom visualmente, e divisivel por
840/2 - 420
840/3 - 280
840/4 - 210
840/5 - 168
840/6- 140
840/7 - 120
840/8 - 105

E quando se considera a remoção de gaps internos a 24px, a situação ainda fica boa, exemplos:
2 items, que é (840-24)/2 = 408
3 items (840-48)/3 = 264
4 items (840-72)/4 = 192

Assim os layouts se comportam melhor em situações de grid, sem que os objetos fiquem com tamanhos quebrados.

Como é um Componente ou bloco de componentes?
Componentes ou blocos devem ser anemicos, sem background ao redor, sem bordas ao redor e sem espaçamentos laterais ao redor, deixando o layout para o container principal e o jogo de cores também para o componente principal. Além disso devem ser pensados no contexto de reuso em vários cenários.

Para capturas de tela upadas no site
Capturas de telas devem ser exibidas com a expecificação 16x9 e ocupação os 840px disponíveis quando aplicável.

Criação de componentes
Preferencialmenmte, organismos devem ocupar os 840px para que o layout fique mais modular na vertical e para que não sobrem espaços desnecessários. Preferencialmente eles devem preencher o espaços restante da div content base

Arquitetura de layouts na Prática
Abaixo exemplos práticos de como o layout deve se comportar

O Modelo da região do conteudo deve seguir o abaixo, tendo 840px da região de conteudo útil, 24px de padding por todos os lados e borda de 1px, sendo que o content-box será box-sixing. Isso deve garantir 890px de largura total que é a região do conteudo.

O width deve ser aplicado na região do conteudo, a região do conteudo útil é consequência.

Abaixo um exemplo completo em HTML com todas as especificações para o layout, incluindo responsividade padrão que o figma irá seguir.

Note que o :root pode mudar de acordo com o figma, abaixo foi incluido apenas para facilitar a demonstração de como tudo deve ser comportar

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />

  <style>
    :root {
      --border-soft: #e8e8e8;
      --spacing-3xl: 24px;
      --spacing-5xl: 32px;
      --content-bg: #ffffff;
      --shadow-md: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
      --size-w-content-desktop: 890px;
      --spacing-xl: 16px;
      --spacing-2xl: 20px;
      --root-bg: #f7f7fa;
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    .root {
      font-family: "Poppins", serif;
      font-weight: 400;
      font-style: normal;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-5xl);

      background: var(--root-bg);
    }

    .content {
      max-width: var(--size-w-content-desktop);
      width: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--spacing-3xl);
      padding: var(--spacing-3xl);

      box-shadow: var(--shadow-md);
      background-color: var(--content-bg);
      border: 1px solid var(--border-soft);
    }

    @media (max-width: 1024px) {
      .content {
        gap: var(--spacing-2xl);
        padding: var(--spacing-2xl);
      }

      .root {
        gap: var(--spacing-2xl);
      }
    }

    @media (max-width: 640px) {
      .content {
        gap: var(--spacing-xl);
        padding: var(--spacing-xl);
      }

      .root {
        gap: var(--spacing-xl);
      }
    }
  </style>
  <body class="root">
    <div
      style="
        width: 100%;
        background-color: #fe9e2e;
        color: white;
        text-align: center;
        padding: 1rem;
      "
    >
      Menu
    </div>

    <div class="content">
      <div>title</div>
      <div>subtitle</div>
      <div>other content</div>
    </div>

    <div
      style="
        width: 100%;
        background-color: #d81e65;
        color: white;
        text-align: center;
        padding: 1rem;
      "
    >
      Footer
    </div>

  </body>
</html>

Icones
As regras abaixo visam facilitar alinhamento e reuso em diferenetes cenários para os icones

A Altura e Largura dos icones DEVE ser de 24px exatos.
O alinhamento X e Y deles deve ser INTEIRO, exemplo: 25 e NUNCA 25.2 por exemplo
O frontend DEVE obter o icone pelo frame de 24px e nunca pelo vetor que pode variar de tamanho
Problemas de alinhamento devem ser resolvidos na propria ajustando o vetor dentro do frame 24px.
Icones devem ter a cor CONTENT-FG
No código, svgs devem ter o atributo fill=”currentColor” ao invés das cores, e as cores podem estar no svg principal
Ao esticar um svg, o conteudo inteiro DEVE crescer junto
A nomenclatura de cada Variant DEVE ser Icon[NomeDoIcone][FILL|OUTLINE], exemplo: IconHeartOutline, o frontend DEVE serguir
Icones FILL são icones onde o conteudo principal está pintado, se o conteudo principal for apenas uma linha ou pontos, isso ainda é outline, e o fill seria essa versão com o fundo preenchido.
