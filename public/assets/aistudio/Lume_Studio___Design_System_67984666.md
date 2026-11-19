Lume Studio · Design System v1.0

# Clareza com calor humano.

Um sistema construído sobre grelhas suíças, geometria simples, espaçamento generoso e hierarquia tipográfica forte. Navy dá estrutura; laranja e amarelo dão energia.

01

## Princípios

### Ordem

Grelha de 12 colunas, alinhamentos rigorosos e muito espaço em branco.

### Simplicidade

Formas geométricas básicas: retângulos, círculos, linhas. Sem ornamento.

### Hierarquia

Títulos Montserrat fortes; texto Inter legível. Um foco por ecrã.

### Discrição

Movimento subtil que orienta, nunca distrai.

02

## Cores

Paleta oficial e escalas derivadas. Os sites de clientes podem ter paleta própria; este sistema é a base da marca Lume Studio.

### Paleta oficial

**Navy**`#101D35`

**Orange**`#F36B32`

**Yellow**`#F4C542`

**Warm White**`#F5F3EE`

### Escalas derivadas

Navy 900\
#101D35

800\
#1A2A4A

600\
#2A3D63

400\
#5B6B8C

200\
#B8C0D0

Orange 500\
#F36B32

600\
#D9531C

100\
#FDE3D6

Yellow 500\
#F4C542

600\
#D9A91F

100\
#FCF0C8

Warm White 50\
#F5F3EE

200\
#E7E3D9

### Cores semânticas

Sucesso #2E9E6B Erro #D64545 Info #3B82C4 Aviso #F4C542

### Contraste e uso

| Combinação | Rácio aprox. | Uso |
| --- | --- | --- |
| Warm White sobre Navy | \~15:1 (AAA) | Texto principal em fundos escuros |
| Navy sobre Warm White | \~15:1 (AAA) | Texto principal em fundos claros |
| Navy sobre Orange | \~5.9:1 (AA) | Botões primários |
| Navy sobre Yellow | \~9:1 (AAA) | Destaques, etiquetas |
| Orange sobre Navy | \~5.9:1 (AA) | Links, ícones, números grandes |
| Warm White sobre Orange | \~2.9:1 (falha) | Evitar para texto |

Regra de proporção: 60% Navy/Warm White · 25% neutros · 10% Orange · 5% Yellow.

03

## Tipografia

Montserrat para títulos e destaque. Inter para texto, navegação e conteúdo.

| Estilo | Fonte | Tamanho / Linha |
| --- | --- | --- |
| Display | Montserrat 800 | 72 / 76 (mobile 40 / 44) |
| Título H1 | Montserrat 700 | 48 / 52 |
| Título H2 | Montserrat 700 | 32 / 38 |
| Título H3 | Montserrat 600 | 20 / 28 |
| Texto grande | Inter 400 | 18 / 28 |
| Texto base | Inter 400 | 16 / 26 |
| Legenda e metadados | Inter 500 | 13 / 20 |
| Eyebrow | Montserrat 700 | 12 / 16 · MAIÚSCULAS · +12% |

Largura máxima de leitura: 65 caracteres. Letter-spacing de títulos: −2%.

04

## Espaçamento e grelha

Base de 8px. Secções respiram: 96–128px entre blocos principais em desktop.

4 · xs

8 · sm

16 · md

24 · lg

32 · xl

48 · 2xl

64 · 3xl

96 · 4xl

128 · 5xl

### Grelha suíça de 12 colunas

| Ponto | Largura | Colunas | Gutter | Margem |
| --- | --- | --- | --- | --- |
| Mobile | \< 640px | 4 | 16 | 20 |
| Tablet | 640–1024px | 8 | 24 | 32 |
| Desktop | > 1024px | 12 | 24 | max-width 1200px |

05

## Forma, elevação e movimento

### Raios

Pequeno 8px (inputs, tags) · Médio 12–16px (cartões) · Pílula 999px (botões e badges). Círculos para avatares e ícones.

### Elevação

Preferir bordas de 1px a sombras. Sombra só em overlays: `0 12px 32px rgba(16,29,53,.16)`.

### Movimento

Duração 150–300ms, easing `ease` ou `cubic-bezier(.2,.7,.2,1)`. Fade, translateY até 8px. Respeitar `prefers-reduced-motion`.

### Fotografia

Comercial natural: luz real, pessoas reais, enquadramentos limpos. Sem filtros pesados nem bancos de imagens artificiais.

06

## Componentes

### Botões

### Badges

Novo Em curso Concluído

### Cartão e formulário

Website

### Site institucional

Design à medida, rápido e pensado para converter visitas em contactos.

Nome\
\
Email\


### Estados

Hover: elevar 1px e escurecer o laranja para #D9531C. Foco: contorno de 2px em Orange com offset de 2px. Desativado: 40% de opacidade, sem hover.

07

## Usar e evitar

**Usar**

Navy ou Warm White como base. Laranja num único elemento de ação por ecrã. Amarelo como destaque pontual. Títulos grandes com muito ar à volta.

**Evitar**

Texto branco sobre laranja. Laranja e amarelo lado a lado em blocos grandes. Sombras pesadas, gradientes e animações longas.

08

## Tokens CSS

Copie para o seu projeto.

```
:root {
  /* Marca */
  --navy: #101D35;   --navy-800: #1A2A4A;  --navy-600: #2A3D63;
  --navy-400: #5B6B8C; --navy-200: #B8C0D0;
  --orange: #F36B32; --orange-600: #D9531C; --orange-100: #FDE3D6;
  --yellow: #F4C542; --yellow-600: #D9A91F; --yellow-100: #FCF0C8;
  --white: #F5F3EE;  --white-200: #E7E3D9;
  /* Semânticas */
  --ok: #2E9E6B; --err: #D64545; --info: #3B82C4;
  /* Tipografia */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  /* Espaçamento (base 8) */
  --s1: 4px; --s2: 8px; --s3: 16px; --s4: 24px;
  --s5: 32px; --s6: 48px; --s7: 64px; --s8: 96px; --s9: 128px;
  /* Forma e movimento */
  --r-sm: 8px; --r-md: 12px; --r-lg: 16px; --r-pill: 999px;
  --ease: cubic-bezier(.2,.7,.2,1); --dur: 200ms;
}
```