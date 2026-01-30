const { PDFDocument } = PDFLib;

document.getElementById('processBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    const btn = document.getElementById('processBtn');
    const fileList = document.getElementById('fileList');

    const files = fileInput.files;
    if (files.length === 0) {
        alert('Por favor, selecione ao menos um boleto.');
        return;
    }

    fileList.innerHTML = '';
    btn.disabled = true;

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            status.innerText = `Processando: ${file.name}`;

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


            const item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML = `
                <span title="${file.name}">${file.name.substring(0, 25)}${file.name.length > 25 ? '...' : ''}</span>
                <a href="${url}" download="OK_${file.name}" class="download-link">Baixar PDF</a>
            `;
            fileList.appendChild(item);
        }

        status.style.color = '#27ae60';
        status.innerText = 'Conversão concluída! Baixe os arquivos abaixo:';
    } catch (err) {
        console.error(err);
        status.style.color = '#e74c3c';
        status.innerText = 'Erro ao processar arquivos.';
    } finally {
        btn.disabled = false;
    }
});