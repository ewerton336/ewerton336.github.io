# 🚀 Portfolio Ewerton Guimarães

Portfolio pessoal moderno desenvolvido com tema dark cyberpunk, apresentando projetos e habilidades como desenvolvedor .NET Full Stack.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌟 Características

### ✨ Design Moderno
- **Tema Dark Cyberpunk**: Fundo escuro profundo com detalhes em neon roxo e verde
- **Efeitos de Brilho**: Text-shadow e box-shadow customizados para efeito neon
- **Animações Suaves**: Transições e animações em 60fps
- **Design Responsivo**: Totalmente adaptável para mobile, tablet e desktop

### 🎨 Efeitos Visuais
- **Sistema de Partículas**: Background animado com partículas conectadas
- **Cards 3D**: Efeito de profundidade ao passar o mouse
- **Scroll Animations**: Elementos aparecem conforme você rola a página
- **Typing Effect**: Texto animado no hero section

### 🔧 Funcionalidades
- **Integração GitHub API**: Projetos carregados dinamicamente do GitHub
- **Cache Inteligente**: SessionStorage para melhor performance
- **Formulário de Contato**: Validação completa de email
- **Navegação Suave**: Smooth scroll entre seções
- **Highlight Automático**: Menu destaca seção ativa

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: 
  - CSS Grid & Flexbox para layouts
  - CSS Custom Properties (variáveis)
  - Animações e transições
  - Glassmorphism e efeitos neon
- **Vanilla JavaScript ES6+**:
  - Classes e módulos
  - Async/Await para API calls
  - Intersection Observer API
  - Canvas API para partículas
- **GitHub REST API**: Integração para exibir repositórios
- **GitHub Pages**: Hospedagem gratuita e automática

## 📁 Estrutura do Projeto

```
ewerton336.github.io/
├── index.html              # Página principal com estrutura HTML
├── css/
│   └── styles.css         # Estilos completos com tema dark/neon
├── js/
│   ├── main.js           # Interações, animações e validações
│   ├── particles.js      # Sistema de partículas animadas
│   └── github.js         # Integração com GitHub API
├── assets/
│   └── images/           # Imagens (para uso futuro)
└── README.md             # Documentação

```

## 🚀 Deploy

### Opção 1: GitHub Pages (Atual)

O site está configurado para deploy automático via GitHub Pages:

1. **URL do Site**: [https://ewerton336.github.io](https://ewerton336.github.io)
2. **Branch**: `master` (ou `main`)
3. **Diretório**: `/` (root)

Qualquer push para o branch principal atualiza o site automaticamente em 1-2 minutos.

### Opção 2: Desenvolvimento Local

Para testar localmente antes de fazer deploy:

#### Usando Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Usando Node.js (http-server):
```bash
npm install -g http-server
http-server
```

#### Usando VS Code:
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

Acesse: `http://localhost:8000` (ou porta correspondente)

## 🎨 Personalização

### Cores

As cores estão definidas como variáveis CSS em `css/styles.css`:

```css
:root {
    --bg-dark: #0a0a0f;              /* Fundo principal */
    --purple-primary: #a855f7;        /* Roxo neon */
    --green-neon: #10ff00;           /* Verde neon */
    --text-light: #e2e8f0;           /* Texto claro */
    /* ... mais variáveis ... */
}
```

### Conteúdo

#### Informações Pessoais
Edite em `index.html`:
- Nome e título no hero section
- Biografia na seção About
- Skills e tecnologias
- Links de contato

#### Repositórios em Destaque
Edite em `js/github.js`:
```javascript
this.featuredRepos = [
    'BecomexRobo',
    'ExtratorZipZpl',
    'ServiceImpressaoZpl',
    'ApiReceitas'
];
```

#### Textos do Typing Effect
Edite em `js/main.js`:
```javascript
this.typingTexts = [
    'Desenvolvedor .NET',
    'Full Stack Developer',
    'Programador C#',
    'Aprendendo React',
    'Criando Soluções'
];
```

## 📊 Performance

- ✅ **Sem dependências externas**: Vanilla JS puro
- ✅ **Cache de API**: SessionStorage (1 hora)
- ✅ **Lazy Loading**: Animações sob demanda
- ✅ **Otimizado para mobile**: Design mobile-first
- ✅ **Fast Loading**: < 3 segundos em conexões 3G

## 🔄 Atualizações

### Para adicionar novos projetos:
1. Crie o repositório no GitHub
2. Adicione descrição e topics ao repositório
3. O site atualizará automaticamente (ou limpe o cache do navegador)

### Para modificar o design:
1. Edite `css/styles.css`
2. Commit e push para o repositório
3. Aguarde 1-2 minutos para atualização

## 📝 Seções do Portfolio

1. **Hero**: Introdução com efeito de digitação
2. **Sobre**: Biografia e estatísticas
3. **Skills**: Tecnologias organizadas por categoria
4. **Projetos**: Cards 3D com dados do GitHub
5. **Contato**: Formulário e métodos de contato

## 🌐 Compatibilidade

- ✅ Chrome (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Edge (últimas 2 versões)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsividade

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

Breakpoints definidos em `css/styles.css` com abordagem mobile-first.

## 🤝 Contribuindo

Este é um portfolio pessoal, mas sugestões são bem-vindas:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**Ewerton Guimarães**
- GitHub: [@ewerton336](https://github.com/ewerton336)
- LinkedIn: [Ewerton Guimarães](https://www.linkedin.com/in/ewerton-guimar%C3%A3es-b97579113/)
- Email: ewertonguimaraes2@gmail.com

## 🙏 Agradecimentos

- Inspiração de design: Comunidade de desenvolvedores no GitHub
- Ícones e efeitos: CSS puro e Canvas API
- Hospedagem: GitHub Pages

---

**⭐ Se você gostou deste projeto, considere dar uma estrela!**

Desenvolvido com 💜 e ☕ por Ewerton Guimarães

