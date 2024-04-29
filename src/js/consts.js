if (
  localStorage.getItem('width') == null &&
  localStorage.getItem('height') == null &&
  localStorage.getItem('mines') == null
) {
  localStorage.setItem('width', 10)
  localStorage.setItem('height', 10)
  localStorage.setItem('mines', 10)
}

export const boardParameters = {
  rows: localStorage.getItem('width'),
  columns: localStorage.getItem('height'),
  mines: localStorage.getItem('mines')
}