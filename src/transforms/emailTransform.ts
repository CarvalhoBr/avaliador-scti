import nodemailer from 'nodemailer';

export const verificationEmail = (workshop: any, speaker: any): nodemailer.SendMailOptions => {
  return {
    html: `
      <h1>Olá, ${speaker.name}</h1>
      <p> Um novo workshop foi atribuído a você na Semana Acadêmica da Ciência da Computação na UENF </p>
      <p> Nome do workshop: ${workshop.title} </p>
      <p> Descrição: ${workshop.description} </p>
      <p> Data do workshop: ${workshop.date} </p>
    `,
    text: `Olá ${speaker.name}, um novo workshop foi atribuído a você na Semana Acadêmica da Ciência da Computação na UENF. 
      Nome do workshop: ${workshop.name}
      Descrição: ${workshop.description}
      Data do workshop: ${workshop.date}
    `,
    subject: 'Novo workshop atribuído',
    to: speaker.email,
    from: process.env.FROM_EMAIL
  }
}

export const ratingReport = (body: any): nodemailer.SendMailOptions => {
  return {
    html: `
      <h1>Olá, ${body.name}</h1>
      <p> Aqui está seu relatório diário de avaliações </p>
      <p> Nome do workshop: ${body.title} </p>
      <p> Avaliação: ${Number(body.rating).toFixed(2)} </p>
    `,
    text: `Olá, ${body.name}
     Aqui está seu relatório diário de avaliações 
     Nome do workshop: ${body.title} 
     Avaliação: ${Number(body.rating).toFixed(2)} 
    `,
    subject: 'Relatório de avaliações do seu workshop',
    to: body.email,
    from: process.env.FROM_EMAIL
  }
}