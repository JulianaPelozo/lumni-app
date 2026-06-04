import os
from datetime import datetime, timedelta
from flask import Flask, render_template, request, jsonify, session
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models import db, User, DailyLog
from auth import hash_password, verify_password, generate_token

from dotenv import load_dotenv

load_dotenv() 

app = Flask(__name__)


from dotenv import load_dotenv
load_dotenv()

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-fallback-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///lumni.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-dev-fallback')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/register')
def register_page():
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'msg': 'Campos obrigatórios faltando'}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'msg': 'Usuário já existe'}), 409
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'Email já cadastrado'}), 409
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hash_password(data['password'])
    )
    db.session.add(new_user)
    db.session.commit()
    token = generate_token(new_user.id)
    return jsonify({'access_token': token, 'user': {'id': new_user.id, 'username': new_user.username}}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if not user or not verify_password(data.get('password'), user.password):
        return jsonify({'msg': 'Credenciais inválidas'}), 401
    token = generate_token(user.id)
    return jsonify({'access_token': token, 'user': {'id': user.id, 'username': user.username}})

@app.route('/api/daily-log', methods=['POST'])
@jwt_required()
def save_daily_log():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    today = datetime.utcnow().date()
    
    log = DailyLog.query.filter_by(user_id=user_id, date=today).first()
    if not log:
        log = DailyLog(user_id=user_id, date=today)
    
    log.mood = data.get('mood')
    log.energy = data.get('energy')
    log.sleep_hours = data.get('sleep_hours')
    log.tasks_done = data.get('tasks_done')
    
    db.session.add(log)
    db.session.commit()
    return jsonify({'msg': 'Log salvo com sucesso'}), 200

@app.route('/api/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = int(get_jwt_identity())
    start_date = datetime.utcnow().date() - timedelta(days=30)
    logs = DailyLog.query.filter(
        DailyLog.user_id == user_id,
        DailyLog.date >= start_date
    ).order_by(DailyLog.date.asc()).all()
    
    data = []
    for log in logs:
        data.append({
            'date': log.date.isoformat(),
            'mood': log.mood,
            'energy': log.energy,
            'sleep_hours': log.sleep_hours,
            'tasks_done': log.tasks_done
        })
    
    alerts = generate_alerts(logs)
    
    return jsonify({'logs': data, 'alerts': alerts}), 200

def generate_alerts(logs):
    alerts = []
    if len(logs) < 5:
        alerts.append("Registre mais dias para receber insights personalizados 🌙")
        return alerts
    
    low_sleep_days = []
    for i in range(len(logs)-1):
        if logs[i].sleep_hours and logs[i].sleep_hours < 6:
            next_mood = logs[i+1].mood
            low_sleep_days.append(next_mood)
    if low_sleep_days:
        avg_mood_after_bad_sleep = sum(low_sleep_days)/len(low_sleep_days)
        all_moods = [l.mood for l in logs if l.mood]
        avg_mood_all = sum(all_moods)/len(all_moods)
        if avg_mood_after_bad_sleep < avg_mood_all - 0.8:
            alerts.append("Padrão detectado: depois de noites com menos de 6h de sono, seu humor costuma cair bastante. Tente priorizar o descanso!")
    
    low_energy_streak = 0
    for log in logs:
        if log.energy and log.energy <= 2:
            low_energy_streak += 1
        else:
            if low_energy_streak >= 3:
                alerts.append(f"Você ficou {low_energy_streak} dias seguidos com energia baixa. Considere uma pausa ou atividade leve.")
            low_energy_streak = 0
    
    good_mood_days = [l.tasks_done for l in logs if l.mood and l.mood >= 4]
    if len(good_mood_days) > 3 and sum(good_mood_days)/len(good_mood_days) < 2:
        alerts.append("Você se sente bem mesmo fazendo poucas tarefas? Isso é ótimo! Cuide para não se cobrar demais.")
    
    if not alerts:
        alerts.append("Nenhum padrão crítico detectado. Continue registrando seu bem-estar!")
    
    return alerts

if __name__ == '__main__':
    app.run(debug=True)