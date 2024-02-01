const generateHeader = (doc) => {
  doc
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
};

const generateUserInfo = (doc, invoice) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formattedDate = invoice.createdAt.toLocaleDateString("en-Us", options);
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, 185)
    .lineTo(550, 185)
    .stroke();

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice._id, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formattedDate, 150, customerInformationTop + 15)
    .text("Total Amount :", 50, customerInformationTop + 30)
    .text("Rs." + invoice.total, 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text("AjferShipping", 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.address1, 300, customerInformationTop + 15)

    .moveDown();

  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, 252)
    .lineTo(550, 252)
    .stroke();
};

module.exports = { generateHeader, generateUserInfo };
