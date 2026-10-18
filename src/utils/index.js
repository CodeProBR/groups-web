export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

export function formatarPercentual(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor / 100);
}

export function formatarNumero(valor) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

export function round(valor, casas = 2) {
  const multiplicador = Math.pow(10, casas);
  return Math.round(valor * multiplicador) / multiplicador;
}

export function formatarDataExtenso(dateStr) {
  if (!dateStr) return '';
  const date = new Date(typeof dateStr === 'string' && dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00`);
  if (isNaN(date.getTime())) return dateStr;
  const formatted = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatData(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function isBoostActive(boostDate) {
  if (!boostDate) return false;

  let date;
  if (boostDate instanceof Date) {
    date = boostDate;
  } else if (typeof boostDate === 'string') {
    // Se a string não indicar timezone/offset explicitamente (nem 'Z', nem '+' nem '-'), tratamos como UTC
    const hasTimezone = boostDate.endsWith('Z') || /[+-]\d{2}(:?\d{2})?$/.test(boostDate);
    date = new Date(hasTimezone ? boostDate : `${boostDate}Z`);
  } else {
    date = new Date(boostDate);
  }

  if (isNaN(date.getTime())) return false;

  return date.getTime() > Date.now();
}


