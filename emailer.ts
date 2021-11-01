const nodemailer = require("nodemailer"); //Se implementa el package instalado: npm install nodemailer: https://nodemailer.com/

//Se crea un transporte, se le dice a nodemailer que conexion utilizar

const createTrans = () => {
const transport = nodemailer.createTransport({

  //Utilizo mailtrap para realizar el testeo: https://mailtrap.io/

    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f26835b80622d1",
      pass: "7cc69a8025e460"

      //Configuración para Gmail

      /* host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "tucorreo@gmail.com",
        pass: "tuPassworrd" */


    }
  });

  return transport;
}


//Metodo encargado de enviar el correo
const sendMail = async (user) => {
  const transporter = createTrans()
  const info = await transporter.sendMail({
    from: '"Ecommerce" <info@info.com>', // Email remitente
    to: `${user.usuario}`,// Se utilizan literales de plantilla para el email del usuario registrado
    subject: `Hola ${user.nombreUsuario}, Bienvenido a Ecommerce!`, // Se utilizan literales de plantilla para personalizar el asunto con el nombre del usuario
    html: "<b>Su usuario fue registrado exitosamente!!</b>", // Cuerpo del email
  });

  console.log("Menssage sent: %s", info.messageId);

  return
}

exports.sendMail = (user) => sendMail(user);