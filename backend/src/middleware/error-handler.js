export const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error.code === '23505') {
    return res.status(409).json({ error: 'Registro duplicado.' });
  }

  if (error.code === '23503') {
    return res.status(400).json({ error: 'Referencia invalida.' });
  }

  if (error.code === '22P02') {
    return res.status(400).json({ error: 'Formato invalido.' });
  }

  return res.status(error.statusCode || 500).json({
    error: error.message || 'Erro interno do servidor.',
  });
};
