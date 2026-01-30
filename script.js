const { PDFDocument } = PDFLib;

document.getElementById('processBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    const btn = document.getElementById('processBtn');

    const files = fileInput.files;

    if (files.length === 0) {
        alert('Por favor, selecione ao menos um boleto.');
        return;
    }

    try {
        btn.disabled = true;
        status.style.color = '#3498db';

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            status.innerText = `Processando (${i + 1}/${files.length}): ${file.name}`;

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
            const a = document.createElement('a');
            a.href = url;
            a.download = 'BOLETO_OK_' + file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        status.style.color = '#27ae60';
        status.innerText = `Sucesso! ${files.length} arquivo(s) convertidos.`;
    } catch (err) {
        console.error(err);
        status.style.color = '#e74c3c';
        status.innerText = 'Erro ao processar um dos arquivos.';
    } finally {
        btn.disabled = false;
    }
});