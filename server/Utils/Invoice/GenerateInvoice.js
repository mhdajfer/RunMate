const generateHeader = (doc) => {
  doc
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
};

const generateUserInfo = (doc, order) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formattedDate = order.createdAt.toLocaleDateString("en-Us", options);
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
    .text(order._id.toString(), 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formattedDate, 150, customerInformationTop + 15)
    .text("Total Amount:", 50, customerInformationTop + 30)
    .text("Rs. " + order.total.toFixed(2), 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text("Customer Information:", 300, customerInformationTop)
    .font("Helvetica")
    .text("Name: " + order.name, 300, customerInformationTop + 15)
    .text("Address: " + order.address1, 300, customerInformationTop + 30)
    .text("State: " + (order.state || ""), 300, customerInformationTop + 45)
    .text("ZIP: " + (order.zip || ""), 300, customerInformationTop + 60)
    .text("Phone: " + (order.phone || ""), 300, customerInformationTop + 75)

    .moveDown();

  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, 292)
    .lineTo(550, 292)
    .stroke();

  const productsTop = 400;

  doc.font("Helvetica-Bold").fontSize(12).text("Products:", 50, productsTop);

  order.products.forEach((product, index) => {
    const productTop = productsTop + 20 + index * 15;
    doc
      .font("Helvetica")
      .text(
        `${index + 1}. ${product.productId.name} x ${product.quantity}`,
        50,
        productTop
      );
  });

  doc.moveDown();
};

module.exports = { generateHeader, generateUserInfo };
