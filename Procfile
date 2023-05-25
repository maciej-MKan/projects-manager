web: cd frontend && npm install && npm start
server: gunicorn backend.src.main:app --timeout 15 --keep-alive 5 --log-level debug