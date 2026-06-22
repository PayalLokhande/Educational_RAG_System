#!/usr/bin/env python3
"""
Database Initialization & ETL Pipeline Script
Transforms unstructured JSON interview questions into an indexed relational SQLite DB.
"""

import json
import sqlite3
from pathlib import Path

# Target database configuration file
DB_NAME = "technical_questions.db"
JSON_SRC = "cleaned_technical_questions.json"


def clean_text(text: str) -> str:
    """Cleans up encoding noise or broken characters found during data parsing."""
    if not text:
        return ""
    # Standardizing common artifacts seen in automated json exporters
    text = text.replace("\u00e2\u2019", "→")
    text = text.replace("\u00c2\u00b2", "²")
    text = text.replace("\u00e2\u2030\u00a5", "≥")
    return text.strip()


def build_schema(cursor: sqlite3.Cursor):
    """Executes DDL statements ensuring relational constraints are enforced."""
    # Enable foreign keys support in SQLite runtime context
    cursor.execute("PRAGMA foreign_keys = ON;")

    # 1. Create Lookup Master Tables
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS difficulties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            level TEXT UNIQUE NOT NULL
        );
    """)

    # 2. Create Core Entity Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS questions (
            question_id TEXT PRIMARY KEY,
            topic_id INTEGER NOT NULL,
            difficulty_id INTEGER NOT NULL,
            question_text TEXT NOT NULL,
            model_answer TEXT NOT NULL,
            keywords TEXT,
            FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE RESTRICT,
            FOREIGN KEY (difficulty_id) REFERENCES difficulties(id) ON DELETE RESTRICT
        );
    """)

    # 3. Establish Optimization Indexes
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty_id);")


def populate_database(conn: sqlite3.Connection, json_data: list):
    """Parses JSON input arrays and pipes normalized structural rows into the storage backend."""
    cursor = conn.cursor()

    # Pre-populate and normalize lookups to keep execution efficient
    unique_topics = sorted(list(set(row["Topic"] for row in json_data)))
    unique_diffs = sorted(list(set(row["Difficulty"] for row in json_data)))

    for topic in unique_topics:
        cursor.execute("INSERT OR IGNORE INTO topics (name) VALUES (?);", (topic,))
    
    for diff in unique_diffs:
        cursor.execute("INSERT OR IGNORE INTO difficulties (level) VALUES (?);", (diff,))

    # Cache lookup dictionaries to prevent scalar subqueries inside loops
    cursor.execute("SELECT id, name FROM topics;")
    topic_map = {name: tid for tid, name in cursor.fetchall()}

    cursor.execute("SELECT id, level FROM difficulties;")
    diff_map = {level: did for did, level in cursor.fetchall()}

    # Data ingestion
    insert_payload = []
    for item in json_data:
        q_id = item.get("ID")
        topic_name = item.get("Topic")
        diff_level = item.get("Difficulty")
        q_text = clean_text(item.get("Question"))
        m_ans = clean_text(item.get("Model_answer"))
        kw = clean_text(item.get("Keywords"))

        insert_payload.append((
            q_id,
            topic_map[topic_name],
            diff_map[diff_level],
            q_text,
            m_ans,
            kw
        ))

    cursor.executemany("""
        INSERT OR REPLACE INTO questions (question_id, topic_id, difficulty_id, question_text, model_answer, keywords)
        VALUES (?, ?, ?, ?, ?, ?);
    """, insert_payload)
    
    print(f"[Success] Initialized database and structured {len(insert_payload)} technical rows.")


def main():
    json_path = Path(JSON_SRC)
    if not json_path.exists():
        print(f"[Error] Source file '{JSON_SRC}' not detected. Please verify file paths.")
        return

    print(f"Reading target definitions out of: {json_path.resolve()}")
    with open(json_path, 'r', encoding='utf-8') as f:
        raw_payload = json.load(f)

    # Establish isolated atomic execution transaction
    with sqlite3.connect(DB_NAME) as connection:
        build_schema(connection.cursor())
        populate_database(connection, raw_payload)


if __name__ == "__main__":
    main()



# Setup Target Identifiers
DB_NAME = "viva_questions.db"
JSON_SRC = "cleaned_viva_questions.json"


def clean_text(text: str) -> str:
    """Cleans up encoding noise or character artifacts from input strings."""
    if not text:
        return ""
    # Address common escape anomalies seen in system exporters
    text = text.replace("\u2014", "—")
    return text.strip()


def build_schema(cursor: sqlite3.Cursor):
    """Executes structural DDL queries to create our tables and relational constraints."""
    # Enforce database runtime relation integrity
    cursor.execute("PRAGMA foreign_keys = ON;")

    # 1. Create Lookup Master Matrices
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS difficulties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            level TEXT UNIQUE NOT NULL
        );
    """)

    # 2. Create Transactional Question Bank Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS viva_questions (
            question_id INTEGER PRIMARY KEY,
            topic_id INTEGER NOT NULL,
            difficulty_id INTEGER NOT NULL,
            question_text TEXT NOT NULL,
            model_answer TEXT NOT NULL,
            keywords TEXT,
            FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE RESTRICT,
            FOREIGN KEY (difficulty_id) REFERENCES difficulties(id) ON DELETE RESTRICT
        );
    """)

    # 3. Create Optimization Indices
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_viva_topic ON viva_questions(topic_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_viva_difficulty ON viva_questions(difficulty_id);")


def populate_database(conn: sqlite3.Connection, json_data: list):
    """Transforms raw JSON objects and systematically inserts them into target tables."""
    cursor = conn.cursor()

    # Pre-populate relational maps to guarantee integrity constraints
    unique_topics = sorted(list(set(row["Topic"] for row in json_data)))
    unique_diffs = sorted(list(set(row["Difficulty"] for row in json_data)))

    for topic in unique_topics:
        cursor.execute("INSERT OR IGNORE INTO topics (name) VALUES (?);", (topic,))
    
    for diff in unique_diffs:
        cursor.execute("INSERT OR IGNORE INTO difficulties (level) VALUES (?);", (diff,))

    # Cache relational foreign keys to reduce compute lookup steps in iterative parsing
    cursor.execute("SELECT id, name FROM topics;")
    topic_map = {name: tid for tid, name in cursor.fetchall()}

    cursor.execute("SELECT id, level FROM difficulties;")
    diff_map = {level: did for did, level in cursor.fetchall()}

    # Data ingestion matrix parsing
    insert_payload = []
    for item in json_data:
        q_id = int(item.get("ID"))
        topic_name = item.get("Topic")
        diff_level = item.get("Difficulty")
        q_text = clean_text(item.get("Question"))
        m_ans = clean_text(item.get("Model Answer"))
        kw = clean_text(item.get("Keywords"))

        insert_payload.append((
            q_id,
            topic_map[topic_name],
            diff_map[diff_level],
            q_text,
            m_ans,
            kw
        ))

    cursor.executemany("""
        INSERT OR REPLACE INTO viva_questions (question_id, topic_id, difficulty_id, question_text, model_answer, keywords)
        VALUES (?, ?, ?, ?, ?, ?);
    """, insert_payload)
    
    print(f"[Success] Initialized data model. Normalization complete for {len(insert_payload)} viva data lines.")


def main():
    json_path = Path(JSON_SRC)
    if not json_path.exists():
        print(f"[Error] Source file path targeted ('{JSON_SRC}') not found.")
        return

    print(f"Opening data payload reference out of: {json_path.resolve()}")
    with open(json_path, 'r', encoding='utf-8') as f:
        raw_payload = json.load(f)

    # Wrap operational sequence inside transactions
    with sqlite3.connect(DB_NAME) as connection:
        build_schema(connection.cursor())
        populate_database(connection, raw_payload)


if __name__ == "__main__":
    main()