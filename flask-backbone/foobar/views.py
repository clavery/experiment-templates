
from flask import render_template, Blueprint, jsonify, request, abort

from .database import Session
from .models import Note


frontend = Blueprint('frontend', __name__)
api = Blueprint('api', __name__)


@frontend.route('/')
def index():
    return render_template('index.html')


@api.route('/notes', methods=['GET', 'POST'])
def notes():
    session = Session()
    if request.method == 'POST':
        raw_note = request.get_json()
        note = Note(**raw_note)
        session.add(note)
        session.commit()
        return jsonify(note.to_dict())
    else:
        notes = session.query(Note).all()
        return jsonify({"notes" : [n.to_dict() for n in notes]})


@api.route('/notes/<int:note_id>', methods=['GET', 'PUT', 'DELETE'])
def note(note_id):
    session = Session()
    note = session.query(Note).get(note_id)
    if not note:
        abort(404)

    if request.method == 'DELETE':
        session.delete(note)
        session.commit()
        return jsonify({})
    elif request.method == 'PUT':
        note_changes = request.get_json()
        [setattr(note, k, v) for (k,v) in note_changes.items()]
        session.add(note)
        session.commit()

    return jsonify(note.to_dict())
