
const PROXY_CONFIG = [
  {
    context: [
      "/usuario",
      "/tarea",
      "/estado",
      "/tareaEstado",
    ],
    target: "https://localhost:7168",
    secure: false
  }
]
module.exports = PROXY_CONFIG;

