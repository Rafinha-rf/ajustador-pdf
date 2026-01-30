# 📄 Ajustador de PFDS (PDF Compatibility Fix)

Esta é uma ferramenta web simples e segura para converter arquivos PDF modernos (versão 1.5 a 1.7) para a versão **PDF 1.4**. 

### 🚀 Por que usar esta ferramenta?
Muitos sistemas legados que utilizam a biblioteca **FPDI (versão gratuita)** em PHP não conseguem processar arquivos PDF gerados recentemente por bancos ou administradoras. O erro comum retornado é:
> *"This document probably uses a compression technique which is not supported by the free parser shipped with FPDI."*

Este utilitário reconstrói o PDF internamente, remove a compressão de objetos moderna e altera o cabeçalho para a versão 1.4, tornando o arquivo 100% compatível com importadores PHP.

### 🛡️ Privacidade e Segurança
* **Processamento Local:** O arquivo **NÃO é enviado para nenhum servidor**. 
* Todo o ajuste é feito diretamente no navegador da administradora usando a biblioteca `pdf-lib`.
* Ideal para lidar com boletos e documentos sensíveis, mantendo a conformidade com a LGPD.

### 🛠️ Como usar
1. Acesse o link do projeto (ex: `[https://seu-usuario.github.io/ajustador-boletos/](https://rafinha-rf.github.io/ajustador-pdf/)`).
2. Selecione o arquivo PDF do boleto que está apresentando erro.
3. Clique em **"Converter para PDF 1.4"**.
4. O download do arquivo ajustado (com o prefixo `BOLETO_OK_`) começará automaticamente.
5. Use este novo arquivo para fazer o upload no seu sistema de gestão.

### 💻 Tecnologias utilizadas
* [pdf-lib](https://pdf-lib.js.org/) - Manipulação de PDF em JavaScript puro.
* **GitHub Pages** - Hospedagem estática gratuita e segura.

---
*Desenvolvido para facilitar o fluxo de importação de boletos bancários.*
