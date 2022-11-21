//const saveAs = require("./FileSaver");

const generatePDF = async (name)=>{
    const {PDFDocument, rgb } = PDFLib;

    const exBytes = await fetch("./cert.pdf").then((res) => {
        return res.arrayBuffer();
    });

    const exFont = await fetch("./kapil.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);

    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(name, {
        x: 450,
        y: 480,
        size: 48,
        font: myFont,
        color: rgb(1,0.83,0.24),
      });

    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(uri, "Get_Certificate.pdf", { autoBom: true });
};

const submitBtn = document.getElementById("submitBtn")
const inputValue = document.querySelector("#name")

submitBtn.addEventListener("click", () => {
    const val= inputValue.value;
    generatePDF(val);
});