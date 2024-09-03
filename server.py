from flask import Flask, request, send_file, jsonify
import openpyxl
import re
import os

app = Flask(__name__)

# Ruta del archivo Excel temporal
TEMP_FILE_PATH = '/tmp/temp_excel.xlsx'

# Función para crear el archivo Excel temporal a partir de un modelo subido
def create_temp_excel_from_model(model_file):
    model_file.save(TEMP_FILE_PATH)

# Función para cargar el archivo Excel temporal
def load_temp_excel():
    if not os.path.exists(TEMP_FILE_PATH):
        raise FileNotFoundError('El archivo temporal no existe. Por favor, sube un modelo primero.')
    return openpyxl.load_workbook(TEMP_FILE_PATH)

# Función para extraer datos usando expresiones regulares
def extract_data_with_regex(text, pattern):
    match = re.search(pattern, text, re.DOTALL)
    return match.group(1).strip() if match else 'No encontrado'

# Función para actualizar el archivo Excel temporal con datos extraídos
def update_excel_with_data(extracted_data):
    try:
        wb = load_temp_excel()
        ws = wb.active

        headers = {
            'Fecha de Radicación': 1,
            'Hora de Radicación': 2,
            'Fecha de Petición': 3,
            'Hora de Petición': 4,
            '# de Petición': 5,
            'Solicitante': 6,
            'Correo de Solicitante': 7,
            'Entidad': 8,
            'Cargo': 9,
            'Asunto': 10
        }

        # Encuentra la primera fila vacía
        row = 2
        while any(ws.cell(row=row, column=col).value for col in headers.values()):
            row += 1

        # Añadir los datos en la fila vacía
        for key, col in headers.items():
            ws.cell(row=row, column=col, value=extracted_data.get(key, 'No encontrado'))

        wb.save(TEMP_FILE_PATH)

        return TEMP_FILE_PATH

    except Exception as e:
        print(f'Error al actualizar el archivo Excel: {e}')
        raise

@app.route('/upload_model', methods=['POST'])
def upload_model():
    if 'file' not in request.files:
        return 'No se proporcionó ningún archivo Excel.', 400

    file = request.files['file']
    if file.filename == '':
        return 'No seleccionó ningún archivo.', 400

    # Crear el archivo Excel temporal a partir del modelo subido
    create_temp_excel_from_model(file)

    return jsonify({'message': 'Modelo subido y archivo temporal creado con éxito.'})

@app.route('/update', methods=['POST'])
def update_file():
    if 'text' not in request.form:
        return 'Texto no proporcionado.', 400

    text = request.form['text']

    patterns = {
        'Fecha de Radicación': r'Fecha de Radicación:\s*(\d{2}/\d{2}/\d{4})',
        'Hora de Radicación': r'Fecha de Radicación:\s*\d{2}/\d{2}/\d{4} (\d{1,2}:\d{2} [ap]m)',
        'Fecha de Petición': r'Date:\s*\w{3}, (\d{2} \w{3} \d{4})',
        'Hora de Petición': r'Date:\s*\w{3}, \d{2} \w{3} \d{4} a las (\d{1,2}:\d{2})',
        '# de Petición': r'radicado/consecutivo ([^\s]+)',
        'Solicitante': r'Nombres:\s*([\w\s]+)',
        'Correo de Solicitante': r'Email:\s*([\w\.-]+@[\w\.-]+)',
        'Entidad': r'Empresa:\s*([^\n]+)',
        'Cargo': r'Cargo:\s*([^\n]+)',
        'Asunto': r'Asunto:\s*([^\n]+)'
    }

    extracted_data = {}
    for key, pattern in patterns.items():
        extracted_data[key] = extract_data_with_regex(text, pattern)

    updated_file_path = update_excel_with_data(extracted_data)

    return jsonify({'message': 'Archivo actualizado con éxito', 'file_path': updated_file_path})

@app.route('/download', methods=['GET'])
def download_file():
    if not os.path.exists(TEMP_FILE_PATH):
        return 'Archivo no encontrado.', 404
    try:
        return send_file(TEMP_FILE_PATH, as_attachment=True)
    except Exception as e:
        return f'No se pudo procesar el archivo: {e}', 500

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
