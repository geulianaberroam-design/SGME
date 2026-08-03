import logging
import os

# Crear la carpeta de logs si aún no existe
LOGS_DIR = "logs"
if not os.path.exists(LOGS_DIR):
    os.makedirs(LOGS_DIR)

# Configuración del formato del Logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [%(levelname)s] - %(message)s",
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, "app.log"), encoding="utf-8"),
        logging.StreamHandler()  # Para ver también los mensajes en la consola de VS Code
    ]
)

# Instancia global para usar en todo el proyecto
logger = logging.getLogger("SGME_Logger")