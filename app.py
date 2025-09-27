from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

# Database setup
conn = sqlite3.connect('cart.db')
conn.execute('CREATE TABLE IF NOT EXISTS items (name TEXT, price REAL)')
conn.close()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_item():
    name = request.form['name']
    price = request.form['price']
    conn = sqlite3.connect('cart.db')
    conn.execute('INSERT INTO items (name, price) VALUES (?, ?)', (name, price))
    conn.commit()
    conn.close()
    return "Item Added!"

if __name__ == "__main__":
    app.run(debug=True)
