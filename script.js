const { PDFDocument } = PDFLib;

document.getElementById('processBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    const btn = document.getElementById('processBtn');
    const fileList = document.getElementById('fileList');

    const files = Array.from(fileInput.files);
    if (files.length === 0) {
        alert('Por favor, selecione ao menos um boleto.');
        return;
    }

    fileList.innerHTML = '';
    btn.disabled = true;
    
    const zip = new JSZip();
    const isMultiple = files.length > 1;

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            status.style.color = '#27ae60';
            status.innerText = `Processando: ${file.name}`;
            
            if (!/\.pdf/i.test(file.name)) continue;

            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

            const uint8Array = new Uint8Array(pdfBytes);
            const header = "%PDF-1.4";
            for (let j = 0; j < header.length; j++) {
                uint8Array[j] = header.charCodeAt(j);
            }

            const blob = new Blob([uint8Array], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            if (isMultiple) {
                zip.file(`OK_${file.name}`, uint8Array);
                
                const item = document.createElement('div');
                item.className = 'file-item';
                item.innerHTML = `<span>✅ ${file.name.substring(0, 30)}...</span>`;
                fileList.appendChild(item);
            } else {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.innerHTML = `
                    <span title="${file.name}">${file.name}</span>
                    <a href="${url}" download="OK_${file.name}" class="download-link">Baixar PDF</a>
                `;
                fileList.appendChild(item);
            }
        }

        if (isMultiple) {
            status.innerText = 'Gerando pacote ZIP...';
            const zipContent = await zip.generateAsync({ type: "blob" });
            const zipUrl = URL.createObjectURL(zipContent);

            const zipDiv = document.createElement('div');
            zipDiv.className = 'zip-container';
            zipDiv.innerHTML = `
                <a href="${zipUrl}" download="boletos_ajustados.zip" class="download-all-btn">
                    📦 Baixar Todos (${files.length} PDFs)
                </a>
            `;
            fileList.prepend(zipDiv);
        }

        status.style.color = '#27ae60';
        status.innerText = isMultiple ? 'Tudo pronto! Baixe o arquivo ZIP abaixo.' : 'Concluído!';
        
    } catch (err) {
        console.error(err);
        status.style.color = '#e74c3c';
        status.innerText = 'Erro ao processar arquivos.';
    } finally {
        btn.disabled = false;
    }
}); 