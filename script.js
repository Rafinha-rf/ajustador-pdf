const { PDFDocument } = PDFLib;

document.getElementById('processBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    const btn = document.getElementById('processBtn');

    if (fileInput.files.length === 0) {
        alert('Por favor, selecione um boleto.');
        return;
    }

    try {
        status.style.color = '#3498db';
        status.innerText = 'Processando e reestruturando...';
        btn.disabled = true;

        const file = fileInput.files[0];
        const arrayBuffer = await file.arrayBuffer();

        // Carrega o PDF original
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        // Salva sem Object Streams (formato legível para FPDI free)
        const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

        // Hack para forçar o header PDF 1.4
        const uint8Array = new Uint8Array(pdfBytes);
        const header = "%PDF-1.4";
        for (let i = 0; i < header.length; i++) {
            uint8Array[i] = header.charCodeAt(i);
        }

        // Gera o download
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BOLETO_OK_' + file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        status.style.color = '#27ae60';
        status.innerText = 'Sucesso! O arquivo agora é PDF 1.4.';
    } catch (err) {
        console.error(err);
        status.style.color = '#e74c3c';
        status.innerText = 'Erro ao processar. O PDF pode estar protegido por senha.';
    } finally {
        btn.disabled = false;
    }
});