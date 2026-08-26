import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const today = "2026-08-26";
const site = "https://fppericiasjudiciais.com.br";
const phone = "5521920200117";

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}

function esc(text) {
  return encodeURIComponent(text);
}

function head({ title, description, url, prefix = "" }) {
  return `    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${description}">
    <title>${title}</title>
    <meta name="theme-color" content="#102a43">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${site}/assets/images/hero-juridico-tecnologia-web.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${site}/assets/images/hero-juridico-tecnologia-web.jpg">
    <link rel="canonical" href="${url}">
    <link rel="icon" href="${prefix}assets/images/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${prefix}assets/css/style.css">`;
}

function header(prefix = "", current = "") {
  const links = [
    ["Home", "index.html", "home"],
    ["Sobre", "sobre.html", "sobre"],
    ["Especialidades", "especialidades.html", "especialidades"],
    ["Artigos", "artigos.html", "artigos"],
    ["Contato", "contato.html", "contato"],
  ].map(([label, href, key]) => `          <a href="${prefix}${href}"${key === current ? ' aria-current="page"' : ""}>${label}</a>`).join("\n");
  return `    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="${prefix}index.html" aria-label="FP Per&iacute;cias Judiciais">
          <span class="brand-mark"><img src="${prefix}assets/images/logo-fp.svg" alt="" aria-hidden="true"></span>
          <span class="brand-copy"><strong><span>FP</span> Per&iacute;cias Judiciais</strong><small>Fernando Pires &middot; Perito Judicial</small></span>
        </a>
        <nav class="site-nav" aria-label="Navega&ccedil;&atilde;o principal">
${links}
        </nav>
      </div>
    </header>`;
}

function whatsappIcon() {
  return `<svg class="floating-whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 4.5A11.5 11.5 0 0 0 6.1 21.8L4.8 27l5.3-1.3A11.5 11.5 0 1 0 16 4.5Zm0 2.1a9.4 9.4 0 0 1 7.9 14.5 9.4 9.4 0 0 1-13.2 2.5l-.4-.3-2.7.7.7-2.7-.3-.4A9.4 9.4 0 0 1 16 6.6Zm-3.5 4.5c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4 6.4 5.4 3.1 1.2 3.8.9 4.5.8.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5l-2.5-1.2c-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.3-.2-1.4-.5-2.7-1.7-1-1-1.7-2.1-1.9-2.4-.2-.4 0-.6.2-.8.2-.2.3-.4.5-.6.2-.2.2-.4.4-.6.1-.3.1-.5 0-.7l-1.1-2.6c-.3-.6-.6-.6-.8-.6h-.5Z"/></svg>`;
}

function footer(prefix = "", context = "site") {
  const msg = esc(`Ola, encontrei o site da FP Pericias Judiciais e gostaria de solicitar uma analise inicial de uma demanda pericial. Pagina de origem: ${context}.`);
  return `    <footer class="site-footer">
      <div class="container footer-inner footer-rich">
        <div class="footer-brand">
          <strong>FP Per&iacute;cias Judiciais</strong>
          <span>Fernando Pires &middot; Perito Judicial</span>
          <span>Computa&ccedil;&atilde;o Forense &middot; Grafoscopia &middot; Documentoscopia &middot; TI</span>
        </div>
        <nav class="footer-links" aria-label="Links do rodap&eacute;">
          <a href="${prefix}sobre.html">Sobre</a>
          <a href="${prefix}especialidades.html">Especialidades</a>
          <a href="${prefix}artigos.html">Artigos</a>
          <a href="${prefix}contato.html">Contato</a>
          <a href="${prefix}privacidade.html">Pol&iacute;tica de Privacidade</a>
        </nav>
        <div class="footer-contact">
          <a href="mailto:fppericiasjudiciais@gmail.com">fppericiasjudiciais@gmail.com</a>
          <a href="https://wa.me/${phone}?text=${msg}" target="_blank" rel="noopener noreferrer">WhatsApp (21) 92020-0117</a>
        </div>
        <div class="footer-legal">
          <span>&copy; 2026 Fernando Pires &middot; Perito Judicial</span>
          <span class="content-protection">Conte&uacute;do protegido e monitorado contra reprodu&ccedil;&atilde;o n&atilde;o autorizada.</span>
          <span class="studio-credit">Desenvolvido e mantido por <a href="https://www.studiol4.com.br" target="_blank" rel="noopener noreferrer">Studio L4</a></span>
        </div>
      </div>
    </footer>
    <a class="floating-whatsapp" href="https://wa.me/${phone}?text=${msg}" target="_blank" rel="noopener noreferrer" aria-label="Falar pelo WhatsApp">
      ${whatsappIcon()}
      <span class="sr-only">Falar pelo WhatsApp</span>
    </a>`;
}

const specialties = [
  ["computacao-forense", "Computa&ccedil;&atilde;o Forense", "Per&iacute;cia em computa&ccedil;&atilde;o forense para evid&ecirc;ncias digitais.", "Arquivos digitais com autoria ou integridade questionada; Metadados de documentos e imagens; Logs e trilhas de auditoria; Conversas digitais e e-mails"],
  ["pericia-em-whatsapp", "Per&iacute;cia em WhatsApp", "An&aacute;lise forense de conversas e evid&ecirc;ncias de WhatsApp.", "Autenticidade de prints; Exporta&ccedil;&otilde;es de conversas; Sequ&ecirc;ncia de mensagens; Arquivos de m&iacute;dia associados"],
  ["grafoscopia", "Grafoscopia", "Per&iacute;cia grafosc&oacute;pica para assinaturas e manuscritos.", "Contesta&ccedil;&atilde;o de assinatura; Rubricas e manuscritos; Padr&otilde;es gr&aacute;ficos; Documentos assinados"],
  ["documentoscopia", "Documentoscopia", "Per&iacute;cia documentosc&oacute;pica para autenticidade e integridade documental.", "Documento adulterado; Montagem documental; Rasuras e inconsist&ecirc;ncias; Vers&otilde;es f&iacute;sicas e digitais"],
  ["assinaturas-digitais", "Assinaturas Digitais e Eletr&ocirc;nicas", "An&aacute;lise de assinaturas digitais, eletr&ocirc;nicas e trilhas de valida&ccedil;&atilde;o.", "Certificados digitais; Integridade do arquivo; Trilhas de aceite; Registros de plataforma"],
  ["pericia-em-tecnologia-da-informacao", "Per&iacute;cia em Tecnologia da Informa&ccedil;&atilde;o", "Per&iacute;cia em tecnologia da informa&ccedil;&atilde;o para sistemas, contratos e registros.", "Sistemas informatizados; Contratos de TI; Seguran&ccedil;a da informa&ccedil;&atilde;o; Registros eletr&ocirc;nicos"],
  ["assistencia-tecnica-pericial", "Assist&ecirc;ncia T&eacute;cnica Pericial", "Assist&ecirc;ncia t&eacute;cnica judicial para leitura cr&iacute;tica da prova.", "Formula&ccedil;&atilde;o de quesitos; Acompanhamento pericial; An&aacute;lise de laudo; Manifesta&ccedil;&otilde;es t&eacute;cnicas"],
  ["parecer-tecnico", "Parecer T&eacute;cnico Pericial", "Parecer t&eacute;cnico pericial para fundamentar an&aacute;lises e decis&otilde;es.", "An&aacute;lise preliminar; Resposta t&eacute;cnica a laudo; Apoio extrajudicial; Conclus&otilde;es fundamentadas"],
];

function listItems(text) {
  return text.split(";").map((item) => `              <li>${item.trim()}</li>`).join("\n");
}

function specialtyPage([slug, title, h1, problems]) {
  const description = `${title} pela FP Per&iacute;cias Judiciais: metodologia, evid&ecirc;ncias analisadas, atua&ccedil;&atilde;o judicial ou extrajudicial e pr&eacute;-an&aacute;lise da demanda.`;
  const related = specialties.filter(([s]) => s !== slug).slice(0, 3).map(([s, t]) => `<a class="text-link" href="../${s}/">${t}</a>`).join("");
  return `<!doctype html>
<html lang="pt-br">
  <head>
${head({ title: `${title} | FP Per&iacute;cias Judiciais`, description, url: `${site}/${slug}/`, prefix: "../" })}
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","name":"${title.replaceAll("&ccedil;", "c")}","provider":{"@type":"ProfessionalService","name":"FP Pericias Judiciais"},"areaServed":"Brasil","url":"${site}/${slug}/"}</script>
  </head>
  <body>
${header("../", "especialidades")}
    <main>
      <section class="page-hero page-hero-especialidades">
        <div class="container page-hero-inner">
          <nav class="breadcrumbs breadcrumbs-dark" aria-label="Breadcrumb"><a href="../index.html">Home</a><a href="../especialidades.html">Especialidades</a><strong>${title}</strong></nav>
          <span class="eyebrow">Especialidade pericial</span>
          <h1>${h1}</h1>
          <p>${description}</p>
          <div class="hero-actions"><a class="btn btn-primary" href="../contato.html?area=${esc(title)}">Solicitar pr&eacute;-an&aacute;lise</a><a class="btn btn-secondary" href="../especialidades.html">Ver especialidades</a></div>
        </div>
      </section>
      <section class="section"><div class="container two-column-detail"><article class="detail-block"><span class="eyebrow">Problemas atendidos</span><h2>Situa&ccedil;&otilde;es comuns.</h2><ul class="check-list">
${listItems(problems)}
            </ul></article><article class="detail-block"><span class="eyebrow">Evid&ecirc;ncias</span><h2>Materiais examinados.</h2><ul class="check-list">
${listItems("Documentos do processo; Arquivos digitais; Registros e metadados; Laudos, prints ou materiais correlatos")}
            </ul></article></div></section>
      <section class="section section-muted"><div class="container split-section"><div><span class="eyebrow">Metodologia</span><h2>Objeto delimitado, exame documentado e conclus&atilde;o proporcional.</h2><p>A an&aacute;lise come&ccedil;a pela compreens&atilde;o da controv&eacute;rsia, dos prazos e do material dispon&iacute;vel. Em seguida s&atilde;o definidos objeto, limita&ccedil;&otilde;es, procedimentos de exame, documenta&ccedil;&atilde;o dos achados e forma de entrega.</p></div><div class="process-list compact-process"><article class="process-item"><span>01</span><div><h3>Escopo</h3><p>Identifica&ccedil;&atilde;o dos pontos controvertidos.</p></div></article><article class="process-item"><span>02</span><div><h3>Exame</h3><p>Procedimentos compat&iacute;veis com a evid&ecirc;ncia.</p></div></article><article class="process-item"><span>03</span><div><h3>Entrega</h3><p>Laudo, parecer, quesitos ou manifesta&ccedil;&atilde;o.</p></div></article></div></div></section>
      <section class="section"><div class="container faq-section"><div class="section-heading"><span class="eyebrow">FAQ</span><h2>Perguntas frequentes sobre ${title}.</h2><p>Orienta&ccedil;&otilde;es iniciais para evitar coleta desnecess&aacute;ria de dados sens&iacute;veis.</p></div><div class="faq-list"><details class="faq-item"><summary>O que enviar no primeiro contato?</summary><p>Resumo objetivo, fase do processo, prazos e rela&ccedil;&atilde;o do material dispon&iacute;vel. Documentos sens&iacute;veis podem ser tratados em etapa posterior.</p></details><details class="faq-item"><summary>Pode ser judicial e extrajudicial?</summary><p>Sim. O formato depende do objetivo: per&iacute;cia, assist&ecirc;ncia t&eacute;cnica, parecer, quesitos ou an&aacute;lise cr&iacute;tica.</p></details><details class="faq-item"><summary>Existe garantia de resultado?</summary><p>N&atilde;o. A atua&ccedil;&atilde;o &eacute; independente e as conclus&otilde;es dependem do material analisado e das limita&ccedil;&otilde;es t&eacute;cnicas do caso.</p></details></div></div></section>
      <section class="section section-muted"><div class="container related-links"><span class="eyebrow">Links relacionados</span><h2>Especialidades conectadas.</h2><div>${related}</div></div></section>
      <section class="cta-section"><div class="container cta-inner"><div><span class="eyebrow">Pr&oacute;ximo passo</span><h2>Solicite uma pr&eacute;-an&aacute;lise de ${title}.</h2><p>Envie contexto, prazo e material dispon&iacute;vel para identifica&ccedil;&atilde;o do escopo t&eacute;cnico.</p></div><a class="btn btn-primary" href="../contato.html?area=${esc(title)}">Solicitar an&aacute;lise</a></div></section>
    </main>
${footer("../", title)}
  </body>
</html>`;
}

const specialtyCards = [
  ["pericia-em-tecnologia-da-informacao", "TI", "Tecnologia da Informa&ccedil;&atilde;o", "Sistemas, infraestrutura, seguran&ccedil;a, contratos, processos e registros eletr&ocirc;nicos."],
  ["computacao-forense", "CF", "Computa&ccedil;&atilde;o Forense", "Arquivos, logs, metadados, rastros digitais, dispositivos e evid&ecirc;ncias eletr&ocirc;nicas."],
  ["grafoscopia", "GR", "Grafoscopia", "Exame comparativo de assinaturas, rubricas e manuscritos."],
  ["documentoscopia", "DC", "Documentoscopia", "Autenticidade, adultera&ccedil;&atilde;o, montagem, rasura e consist&ecirc;ncia documental."],
  ["assinaturas-digitais", "AD", "Assinaturas Digitais e Eletr&ocirc;nicas", "Valida&ccedil;&atilde;o de certificados, integridade, autoria, trilhas e registros de assinatura."],
  ["assistencia-tecnica-pericial", "AT", "Assist&ecirc;ncia T&eacute;cnica Pericial", "Quesitos, acompanhamento, an&aacute;lise cr&iacute;tica de laudos e manifesta&ccedil;&otilde;es t&eacute;cnicas."],
].map(([slug, icon, title, text]) => `<a class="service-card" href="${slug}/"><span class="card-icon">${icon}</span><h3>${title}</h3><p>${text}</p></a>`).join("\n            ");

write(join(root, "index.html"), `<!doctype html>
<html lang="pt-br">
  <head>
${head({ title: "FP Per&iacute;cias Judiciais | Perito Judicial em TI e Computa&ccedil;&atilde;o Forense", description: "Per&iacute;cias judiciais, assist&ecirc;ncia t&eacute;cnica e pareceres em tecnologia da informa&ccedil;&atilde;o, computa&ccedil;&atilde;o forense, WhatsApp, grafoscopia, documentoscopia e assinaturas digitais.", url: `${site}/` })}
    <link rel="preload" href="assets/images/hero-juridico-tecnologia-web.jpg" as="image">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"FP Pericias Judiciais","alternateName":"Fernando Pires","founder":{"@type":"Person","name":"Fernando Alves Pires Neto"},"url":"${site}/","logo":"${site}/assets/images/logo-fp.svg","areaServed":"Brasil","telephone":"+55 21 92020-0117","email":"fppericiasjudiciais@gmail.com","knowsAbout":["Computacao Forense","Pericia em WhatsApp","Documentoscopia","Grafoscopia","Assinaturas Digitais","Tecnologia da Informacao","Assistencia Tecnica Judicial"]}</script>
  </head>
  <body>
${header("", "home")}
    <main>
      <section class="hero"><div class="container hero-grid"><div class="hero-copy"><span class="eyebrow">Forense &middot; Tecnologia &middot; Jur&iacute;dico &middot; Ci&ecirc;ncia</span><h1>Fernando Pires</h1><p class="hero-subtitle">Perito Judicial em Tecnologia da Informa&ccedil;&atilde;o, Computa&ccedil;&atilde;o Forense, Grafoscopia e Documentoscopia.</p><p>Per&iacute;cias Judiciais, Assist&ecirc;ncia T&eacute;cnica, Pareceres T&eacute;cnicos e An&aacute;lise de Evid&ecirc;ncias Digitais e Documentais com m&eacute;todo, rastreabilidade e independ&ecirc;ncia.</p><div class="hero-actions"><a class="btn btn-primary" href="contato.html">Solicitar an&aacute;lise da demanda</a><a class="btn btn-secondary" href="https://wa.me/${phone}?text=${esc("Ola, encontrei o site da FP Pericias Judiciais e gostaria de solicitar uma analise inicial de uma demanda pericial.")}" target="_blank" rel="noopener noreferrer">Falar com o perito</a><a class="btn btn-secondary" href="especialidades.html">Conhecer especialidades</a></div></div><aside class="hero-panel evidence-panel" aria-label="Resumo de atua&ccedil;&atilde;o"><strong>Atua&ccedil;&atilde;o orientada &agrave; prova</strong><dl><div><dt>Objeto</dt><dd>delimita&ccedil;&atilde;o t&eacute;cnica</dd></div><div><dt>Evid&ecirc;ncia</dt><dd>preserva&ccedil;&atilde;o e exame</dd></div><div><dt>Conclus&atilde;o</dt><dd>fundamenta&ccedil;&atilde;o clara</dd></div></dl></aside></div></section>
      <section class="section compact-section"><div class="container credibility-bar"><div><strong>TJRJ</strong><span>Cadastro profissional informado no site</span></div><div><strong>TJSP</strong><span>Atua&ccedil;&atilde;o cadastrada junto ao tribunal</span></div><div><strong>TJMG</strong><span>Demandas judiciais e extrajudiciais</span></div></div></section>
      <section class="section section-muted"><div class="container"><div class="section-heading"><span class="eyebrow">Como posso auxiliar no seu caso?</span><h2>Comece pelo problema; o site indica a especialidade aplic&aacute;vel.</h2><p>Demandas judiciais nem sempre chegam com o nome t&eacute;cnico correto. Esta navega&ccedil;&atilde;o aproxima a necessidade pr&aacute;tica da &aacute;rea pericial correspondente.</p></div><div class="case-grid"><a class="case-chip" href="grafoscopia/">Contesta&ccedil;&atilde;o de assinatura <span>Grafoscopia</span></a><a class="case-chip" href="documentoscopia/">Documento adulterado <span>Documentoscopia</span></a><a class="case-chip" href="pericia-em-whatsapp/">An&aacute;lise de WhatsApp <span>Computa&ccedil;&atilde;o forense</span></a><a class="case-chip" href="computacao-forense/">Conversas digitais <span>Evid&ecirc;ncia digital</span></a><a class="case-chip" href="computacao-forense/">E-mails e arquivos digitais <span>Metadados</span></a><a class="case-chip" href="assinaturas-digitais/">Assinaturas digitais e eletr&ocirc;nicas <span>Valida&ccedil;&atilde;o t&eacute;cnica</span></a><a class="case-chip" href="pericia-em-tecnologia-da-informacao/">Sistemas informatizados <span>TI</span></a><a class="case-chip" href="assistencia-tecnica-pericial/">Formula&ccedil;&atilde;o de quesitos <span>Assist&ecirc;ncia t&eacute;cnica</span></a><a class="case-chip" href="assistencia-tecnica-pericial/">An&aacute;lise de laudo pericial <span>Contradit&oacute;rio t&eacute;cnico</span></a><a class="case-chip" href="parecer-tecnico/">Parecer t&eacute;cnico <span>Conclus&atilde;o fundamentada</span></a></div></div></section>
      <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Especialidades</span><h2>Servi&ccedil;os organizados pela natureza da evid&ecirc;ncia.</h2><p>P&aacute;ginas pr&oacute;prias detalham problemas atendidos, metodologia, evid&ecirc;ncias analisadas e perguntas frequentes.</p></div><div class="services-grid linked-cards">${specialtyCards}</div></div></section>
      <section class="section section-dark"><div class="container split-section"><div><span class="eyebrow">Metodologia</span><h2>Processo t&eacute;cnico documentado do escopo &agrave; conclus&atilde;o.</h2><p>Objeto definido, evid&ecirc;ncia tratada com cuidado, exames compat&iacute;veis e conclus&otilde;es proporcionais aos achados.</p></div><div class="method-grid"><article><span>01</span><h3>An&aacute;lise inicial</h3><p>Contexto, objetivo e material.</p></article><article><span>02</span><h3>Objeto pericial</h3><p>Pontos controvertidos.</p></article><article><span>03</span><h3>Preserva&ccedil;&atilde;o</h3><p>Organiza&ccedil;&atilde;o das evid&ecirc;ncias.</p></article><article><span>04</span><h3>Exames</h3><p>Procedimentos t&eacute;cnicos.</p></article><article><span>05</span><h3>Documenta&ccedil;&atilde;o</h3><p>Achados e limita&ccedil;&otilde;es.</p></article><article><span>06</span><h3>Laudo ou parecer</h3><p>Conclus&atilde;o leg&iacute;vel.</p></article></div></div></section>
      <section class="section"><div class="container split-section"><div><span class="eyebrow">Modalidades</span><h2>Atua&ccedil;&atilde;o conforme o momento processual ou extrajudicial.</h2><p>Per&iacute;cia judicial, assist&ecirc;ncia t&eacute;cnica, parecer independente, formula&ccedil;&atilde;o de quesitos e an&aacute;lise cr&iacute;tica de laudos.</p></div><div class="differentials"><div class="differential-item"><strong>Per&iacute;cia judicial</strong><span>Exames sobre fatos controvertidos definidos no processo.</span></div><div class="differential-item"><strong>Assist&ecirc;ncia t&eacute;cnica</strong><span>Apoio a partes e advogados na leitura t&eacute;cnica da prova.</span></div><div class="differential-item"><strong>Parecer t&eacute;cnico</strong><span>Documento fundamentado para an&aacute;lise ou resposta t&eacute;cnica.</span></div></div></div></section>
      <section class="section section-muted"><div class="container profile-section"><div><span class="eyebrow">Sobre o perito</span><h2>Fernando Alves Pires Neto</h2><p>Atua como Perito Judicial e Assistente T&eacute;cnico em mat&eacute;rias que envolvem tecnologia, documentos, assinaturas e evid&ecirc;ncias digitais.</p><p>Forma&ccedil;&atilde;o em Gest&atilde;o da Tecnologia da Informa&ccedil;&atilde;o, Computa&ccedil;&atilde;o Forense, Grafoscopia e Documentoscopia, com registro CRA-RJ N&deg; 03-08121 e certifica&ccedil;&otilde;es Microsoft informadas no site.</p><a class="text-link" href="sobre.html">Conhecer perfil completo</a></div><figure class="profile-photo"><img src="assets/images/fernando-pires-forum-tecnologia-web.jpg" alt="Foto profissional de Fernando Pires em ambiente institucional" loading="lazy"></figure><div class="differentials"><div class="differential-item"><strong>Independ&ecirc;ncia</strong><span>Linguagem t&eacute;cnica sem promessas de resultado judicial.</span></div><div class="differential-item"><strong>Rastreabilidade</strong><span>Conclus&otilde;es vinculadas aos materiais examinados.</span></div><div class="differential-item"><strong>Clareza</strong><span>Organiza&ccedil;&atilde;o para leitura por profissionais do Direito.</span></div></div></div></section>
      <section class="section"><div class="container faq-section"><div class="section-heading"><span class="eyebrow">FAQ</span><h2>D&uacute;vidas comuns antes da an&aacute;lise t&eacute;cnica.</h2><p>Respostas objetivas para orientar o primeiro contato.</p></div><div class="faq-list"><details class="faq-item"><summary>Quando contratar um assistente t&eacute;cnico?</summary><p>Antes da per&iacute;cia, durante a produ&ccedil;&atilde;o da prova ou ap&oacute;s a entrega do laudo, especialmente para quesitos, acompanhamento e an&aacute;lise cr&iacute;tica.</p></details><details class="faq-item"><summary>Quais documentos enviar?</summary><p>Decis&atilde;o, peti&ccedil;&otilde;es relevantes, documentos questionados, laudos existentes, prints, arquivos digitais, contratos, logs ou registros relacionados.</p></details><details class="faq-item"><summary>O site armazena documentos?</summary><p>N&atilde;o. O formul&aacute;rio apenas organiza a mensagem para envio pelo WhatsApp.</p></details></div></div></section>
      <section class="cta-section"><div class="container cta-inner"><div><span class="eyebrow">Pr&oacute;ximo passo</span><h2>Solicite uma pr&eacute;-an&aacute;lise da demanda pericial.</h2><p>Envie um resumo objetivo para identifica&ccedil;&atilde;o da &aacute;rea aplic&aacute;vel, escopo e documentos necess&aacute;rios.</p></div><a class="btn btn-primary" href="contato.html">Solicitar an&aacute;lise inicial</a></div></section>
    </main>
${footer("", "Home")}
  </body>
</html>`);

write(join(root, "contato.html"), `<!doctype html>
<html lang="pt-br">
  <head>
${head({ title: "Pr&eacute;-an&aacute;lise da Demanda Pericial | FP Per&iacute;cias Judiciais", description: "Solicite pr&eacute;-an&aacute;lise de demanda pericial em tecnologia, computa&ccedil;&atilde;o forense, WhatsApp, documentos, assinaturas digitais, grafoscopia ou assist&ecirc;ncia t&eacute;cnica.", url: `${site}/contato.html` })}
  </head>
  <body>
${header("", "contato")}
    <main><section class="page-hero page-hero-contato"><div class="container page-hero-inner"><span class="eyebrow">Pr&eacute;-an&aacute;lise da demanda pericial</span><h1>Envie as informa&ccedil;&otilde;es essenciais para avalia&ccedil;&atilde;o inicial.</h1><p>O formul&aacute;rio organiza os dados principais e abre o WhatsApp com a mensagem pronta. N&atilde;o h&aacute; upload nem armazenamento de documentos no site.</p></div></section>
      <section class="section"><div class="container contact-grid"><div><span class="eyebrow">Canais</span><h2>Coleta m&iacute;nima, objetiva e compat&iacute;vel com LGPD.</h2><p>Informe apenas o necess&aacute;rio para compreender o tipo de demanda, a fase do caso, eventual prazo e o material dispon&iacute;vel.</p><div class="contact-cards"><article class="contact-card"><strong>E-mail</strong><span><a href="mailto:fppericiasjudiciais@gmail.com">fppericiasjudiciais@gmail.com</a></span></article><article class="contact-card"><strong>WhatsApp</strong><span><a href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">(21) 92020-0117</a></span></article><article class="contact-card"><strong>Atendimento</strong><span>Demandas judiciais e extrajudiciais em todo o territ&oacute;rio nacional</span></article></div></div>
      <form class="contact-form" id="contact-form" data-whatsapp="${phone}"><div class="form-row"><div class="form-field"><label for="name">Nome</label><input id="name" name="name" type="text" autocomplete="name" placeholder="Seu nome" required></div><div class="form-field"><label for="profile">Perfil</label><select id="profile" name="profile"><option value="">Selecione, se desejar</option><option>Advogado(a)</option><option>Parte no processo</option><option>Empresa</option><option>Escrit&oacute;rio</option><option>Outro</option></select></div></div><div class="form-row"><div class="form-field"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email" placeholder="seuemail@exemplo.com" required></div><div class="form-field"><label for="phone">Telefone</label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="DDD + n&uacute;mero" required></div></div><div class="form-field"><label for="subject">Prov&aacute;vel &aacute;rea da per&iacute;cia</label><select id="subject" name="subject" required><option value="">Selecione uma op&ccedil;&atilde;o</option>${specialties.map(([, t]) => `<option>${t}</option>`).join("")}<option>N&atilde;o sei informar</option></select></div><div class="form-row"><div class="form-field"><label for="matterType">Natureza da demanda</label><select id="matterType" name="matterType"><option value="">Selecione, se desejar</option><option>Processo judicial</option><option>Extrajudicial</option><option>An&aacute;lise preliminar</option></select></div><div class="form-field conditional-field" data-visible-when="matterType:Processo judicial"><label for="court">Tribunal</label><input id="court" name="court" type="text" placeholder="Ex.: TJRJ, TJSP, TJMG"></div></div><div class="form-row conditional-field" data-visible-when="matterType:Processo judicial"><div class="form-field"><label for="caseNumber">N&uacute;mero do processo</label><input id="caseNumber" name="caseNumber" type="text" placeholder="Opcional"></div><div class="form-field"><label for="phase">Fase processual</label><select id="phase" name="phase"><option value="">Selecione</option><option>Antes da nomea&ccedil;&atilde;o do perito</option><option>Per&iacute;cia j&aacute; designada</option><option>Laudo apresentado</option><option>Prazo para manifesta&ccedil;&atilde;o</option><option>N&atilde;o sei informar</option></select></div></div><div class="form-row"><div class="form-field"><label for="deadline">Existe prazo?</label><select id="deadline" name="deadline"><option value="">Selecione</option><option>N&atilde;o h&aacute; prazo imediato</option><option>Sim, at&eacute; 48 horas</option><option>Sim, at&eacute; 7 dias</option><option>Sim, mais de 7 dias</option></select></div><div class="form-field"><label for="material">Material dispon&iacute;vel</label><select id="material" name="material"><option value="">Selecione</option><option>Documentos digitalizados</option><option>Documento f&iacute;sico</option><option>Prints ou conversas</option><option>Arquivos digitais</option><option>Logs ou registros</option><option>Laudo existente</option></select></div></div><div class="form-field"><label for="serviceNeed">Necessidade principal</label><select id="serviceNeed" name="serviceNeed"><option value="">Selecione</option><option>Per&iacute;cia</option><option>Assist&ecirc;ncia t&eacute;cnica</option><option>Parecer t&eacute;cnico</option><option>Formula&ccedil;&atilde;o de quesitos</option><option>An&aacute;lise de laudo</option></select></div><div class="form-field"><label for="message">Resumo do caso</label><textarea id="message" name="message" rows="6" required></textarea></div><label class="consent-field"><input name="privacyConsent" type="checkbox" required><span>Li a Pol&iacute;tica de Privacidade e autorizo o uso das informa&ccedil;&otilde;es para avalia&ccedil;&atilde;o inicial.</span></label><p class="confidentiality-note">Este site n&atilde;o armazena documentos, arquivos ou dados sigilosos. As informa&ccedil;&otilde;es s&atilde;o direcionadas para envio pelo WhatsApp, em observ&acirc;ncia &agrave; LGPD. Consulte a <a href="privacidade.html">Pol&iacute;tica de Privacidade</a>.</p><button class="btn btn-primary" type="submit">Enviar pelo WhatsApp</button></form></div></section></main>
${footer("", "Contato")}
    <script src="assets/js/contact.js"></script>
  </body>
</html>`);

write(join(root, "especialidades.html"), `<!doctype html>
<html lang="pt-br">
  <head>
${head({ title: "Especialidades | FP Per&iacute;cias Judiciais", description: "Especialidades da FP Per&iacute;cias Judiciais em computa&ccedil;&atilde;o forense, WhatsApp, documentoscopia, grafoscopia, assinaturas digitais, tecnologia da informa&ccedil;&atilde;o e assist&ecirc;ncia t&eacute;cnica.", url: `${site}/especialidades.html` })}
  </head>
  <body>
${header("", "especialidades")}
    <main>
      <section class="page-hero page-hero-especialidades"><div class="container page-hero-inner"><span class="eyebrow">Especialidades</span><h1>Per&iacute;cias e assist&ecirc;ncia t&eacute;cnica para quest&otilde;es digitais e documentais.</h1><p>Escolha pela &aacute;rea t&eacute;cnica ou comece pela demanda concreta: documentos, assinaturas, conversas, sistemas, registros eletr&ocirc;nicos ou laudos j&aacute; apresentados.</p></div></section>
      <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Linhas de atua&ccedil;&atilde;o</span><h2>Servi&ccedil;os organizados por natureza da evid&ecirc;ncia.</h2><p>Cada p&aacute;gina possui conte&uacute;do pr&oacute;prio, metodologia, tipos de evid&ecirc;ncia, perguntas frequentes e CTA contextualizado.</p></div><div class="services-grid linked-cards">${[
        ...specialtyCards.split("\n            "),
        `<a class="service-card" href="pericia-em-whatsapp/"><span class="card-icon">WA</span><h3>Per&iacute;cia em WhatsApp</h3><p>An&aacute;lise de conversas, prints, exporta&ccedil;&otilde;es, anexos e contexto de mensagens.</p></a>`,
        `<a class="service-card" href="parecer-tecnico/"><span class="card-icon">PT</span><h3>Parecer T&eacute;cnico Pericial</h3><p>Documento t&eacute;cnico para an&aacute;lise preliminar, resposta a laudos e fundamenta&ccedil;&atilde;o.</p></a>`,
      ].join("\n            ")}</div></div></section>
      <section class="section section-muted"><div class="container split-section"><div><span class="eyebrow">Duas formas de navegar</span><h2>Problema pr&aacute;tico ou especialidade conhecida.</h2><p>Quem ainda n&atilde;o sabe o nome da per&iacute;cia pode partir das situa&ccedil;&otilde;es comuns. Quem j&aacute; conhece a &aacute;rea acessa diretamente a p&aacute;gina t&eacute;cnica correspondente.</p></div><div class="differentials"><div class="differential-item"><strong>Assinatura contestada</strong><span><a class="text-link" href="grafoscopia/">Grafoscopia</a> ou <a class="text-link" href="assinaturas-digitais/">assinaturas digitais</a>, conforme o suporte.</span></div><div class="differential-item"><strong>Documento suspeito</strong><span><a class="text-link" href="documentoscopia/">Documentoscopia</a> com apoio de <a class="text-link" href="computacao-forense/">computa&ccedil;&atilde;o forense</a> quando houver arquivo digital.</span></div><div class="differential-item"><strong>Laudo apresentado</strong><span><a class="text-link" href="assistencia-tecnica-pericial/">Assist&ecirc;ncia t&eacute;cnica</a> ou <a class="text-link" href="parecer-tecnico/">parecer t&eacute;cnico</a>.</span></div></div></div></section>
      <section class="cta-section"><div class="container cta-inner"><div><span class="eyebrow">Avalia&ccedil;&atilde;o inicial</span><h2>Tem uma demanda dentro dessas &aacute;reas?</h2><p>Envie um resumo para identifica&ccedil;&atilde;o do escopo t&eacute;cnico e dos documentos necess&aacute;rios.</p></div><a class="btn btn-primary" href="contato.html">Solicitar pr&eacute;-an&aacute;lise</a></div></section>
    </main>
${footer("", "Especialidades")}
  </body>
</html>`);

for (const spec of specialties) write(join(root, spec[0], "index.html"), specialtyPage(spec));

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (name === "node_modules") return [];
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith(".html") ? [path] : [];
  });
}

for (const file of htmlFiles(root)) {
  const rel = relative(root, file).replaceAll("\\", "/");
  const prefix = rel.startsWith("artigos/") || /^[^/]+\/index\.html$/.test(rel) ? "../" : "";
  const context = rel === "index.html" ? "Home" : rel === "contato.html" ? "Contato" : rel.replace(/\/index\.html$|\.html$/g, "");
  let html = readFileSync(file, "utf8");
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>\s*<a\s+class="floating-whatsapp"[\s\S]*?<\/a>/, footer(prefix, context));
  html = html.replaceAll('rel="noopener"', 'rel="noopener noreferrer"');
  write(file, html);
}

write(join(root, "assets/js/contact.js"), `const contactForm = document.querySelector("#contact-form");
const conditionalFields = document.querySelectorAll("[data-visible-when]");
const requestedArea = new URLSearchParams(window.location.search).get("area");

if (requestedArea && contactForm) {
  const subject = contactForm.querySelector("#subject");
  const match = subject && Array.from(subject.options).find((option) => option.textContent.trim().toLowerCase() === requestedArea.trim().toLowerCase());
  if (match) subject.value = match.value || match.textContent;
}

function updateConditionalFields() {
  conditionalFields.forEach((field) => {
    const [name, expectedValue] = field.dataset.visibleWhen.split(":");
    const visible = contactForm?.elements[name]?.value === expectedValue;
    field.hidden = !visible;
    if (!visible) field.querySelectorAll("input, select, textarea").forEach((input) => input.value = "");
  });
}

if (contactForm) {
  contactForm.addEventListener("change", updateConditionalFields);
  updateConditionalFields();
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const optional = (label, key) => formData.get(key) ? \`\${label}: \${formData.get(key)}\` : null;
    const lines = [
      "Ola, encontrei o site da FP Pericias Judiciais e gostaria de solicitar uma analise inicial de uma demanda pericial.",
      "",
      \`Nome: \${formData.get("name")}\`,
      \`E-mail: \${formData.get("email")}\`,
      \`Telefone: \${formData.get("phone")}\`,
      optional("Perfil", "profile"),
      \`Provavel area da pericia: \${formData.get("subject")}\`,
      optional("Natureza da demanda", "matterType"),
      optional("Tribunal", "court"),
      optional("Numero do processo", "caseNumber"),
      optional("Fase processual", "phase"),
      optional("Prazo", "deadline"),
      optional("Material disponivel", "material"),
      optional("Necessidade principal", "serviceNeed"),
      "",
      "Resumo do caso:",
      formData.get("message")
    ].filter(Boolean);
    window.open(\`https://wa.me/\${contactForm.dataset.whatsapp}?text=\${encodeURIComponent(lines.join("\\n"))}\`, "_blank", "noopener");
  });
}
`);

const cssPath = join(root, "assets/css/components.css");
let css = readFileSync(cssPath, "utf8");
if (!css.includes(".case-grid")) {
  css += `

.hero-subtitle{color:#fff;font-size:clamp(1.2rem,2.3vw,1.72rem);font-weight:800}.compact-section{padding:42px 0}.section-dark{color:#fff;background:#102a43}.section-dark p,.section-dark .method-grid p{color:rgba(255,255,255,.74)}.section-dark .eyebrow{color:#f1c46b}.evidence-panel dl{display:grid;gap:12px;margin:0}.evidence-panel div{display:grid;grid-template-columns:96px minmax(0,1fr);gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.14)}.evidence-panel div:last-child{border-bottom:0}.evidence-panel dt{color:#f1c46b;font-weight:900}.evidence-panel dd{margin:0;color:rgba(255,255,255,.8)}.case-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.case-chip{display:flex;min-height:112px;flex-direction:column;justify-content:space-between;gap:12px;padding:18px;border:1px solid var(--color-line);border-radius:var(--radius);background:#fff;color:var(--color-navy);font-weight:900;text-decoration:none;box-shadow:0 8px 24px rgba(16,42,67,.06)}.case-chip span{color:var(--color-muted);font-size:.82rem;font-weight:800}.case-chip:hover,.linked-cards .service-card:hover{border-color:rgba(199,154,59,.6);transform:translateY(-2px)}.linked-cards .service-card,.services-grid>a.service-card{color:inherit;text-decoration:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease}.method-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.method-grid article{padding:20px;border:1px solid rgba(255,255,255,.14);border-radius:var(--radius);background:rgba(255,255,255,.06)}.method-grid span{color:#f1c46b;font-weight:900}.method-grid h3{margin:8px 0;font-size:1.08rem}.method-grid p{margin:0}.two-column-detail{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.detail-block{padding:28px;border:1px solid var(--color-line);border-radius:var(--radius);background:#fff;box-shadow:var(--shadow-soft)}.detail-block h2{margin-bottom:18px;color:var(--color-navy);font-size:clamp(1.45rem,3vw,2.1rem)}.check-list{display:grid;gap:12px;margin:0;padding:0;list-style:none}.check-list li{position:relative;padding-left:28px;color:var(--color-muted)}.check-list li:before{position:absolute;left:0;top:.12em;display:grid;width:18px;height:18px;place-items:center;border-radius:50%;background:#edf3f9;color:var(--color-navy-2);content:"✓";font-size:.72rem;font-weight:900}.compact-process .process-item{padding:18px}.related-links div{display:flex;flex-wrap:wrap;gap:12px}.related-links .text-link{padding:10px 14px;border:1px solid var(--color-line);border-radius:6px;background:#fff}.form-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.consent-field{display:grid;grid-template-columns:18px minmax(0,1fr);gap:10px;align-items:start;color:var(--color-muted);font-size:.92rem}.consent-field input{margin-top:.25em;accent-color:var(--color-navy-2)}.footer-rich{grid-template-columns:minmax(220px,1.1fr) minmax(160px,.8fr) minmax(220px,1fr);justify-items:start;text-align:left}.footer-brand,.footer-contact,.footer-legal,.footer-links{display:grid;gap:7px}.footer-contact a,.footer-links a,.studio-credit a{text-decoration:none}.footer-contact a:hover,.footer-links a:hover,.studio-credit a:hover,.footer-contact a:focus-visible,.footer-links a:focus-visible,.studio-credit a:focus-visible{color:#fff;text-decoration:underline;text-underline-offset:4px}.footer-legal{grid-column:1/-1;width:100%;padding-top:18px;border-top:1px solid rgba(255,255,255,.12)}.breadcrumbs-dark,.breadcrumbs-dark a,.breadcrumbs-dark strong{color:rgba(255,255,255,.82)}.breadcrumbs-dark strong{color:#fff}:focus-visible{outline:3px solid rgba(199,154,59,.46);outline-offset:3px}@media(max-width:900px){.case-grid,.two-column-detail,.method-grid,.form-row,.footer-rich{grid-template-columns:1fr}.footer-rich{justify-items:center;text-align:center}.footer-legal{align-items:center}}@media(max-width:620px){.case-grid{grid-template-columns:1fr}.case-chip{min-height:auto}.hero-copy h1{font-size:clamp(2.4rem,13vw,4rem)}.hero-actions{padding-right:62px}.hero-actions .btn{width:100%;min-width:0}.evidence-panel div{grid-template-columns:1fr;gap:2px}.floating-whatsapp{width:48px;height:48px}.floating-whatsapp-icon{width:28px;height:28px}}
`;
}
write(cssPath, css);

const urls = ["/", "/sobre.html", "/especialidades.html", "/contato.html", "/privacidade.html", "/artigos.html", ...specialties.map(([s]) => `/${s}/`), "/artigos/assistente-tecnico-judicial.html", "/artigos/assinatura-digital-eletronica.html", "/artigos/computacao-forense-prova-judicial.html", "/artigos/prints-como-prova-judicial.html", "/artigos/metadados-documentos-digitais.html", "/artigos/assinatura-contestada-grafotecnia.html", "/artigos/cadeia-de-custodia-digital.html"];
write(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${site}${url}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${url === "/" ? "1.0" : url.endsWith("/") ? "0.8" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`);

console.log("Reformulacao aplicada.");
