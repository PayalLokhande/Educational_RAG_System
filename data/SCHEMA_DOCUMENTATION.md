Technical Questions Database Schema Documentation
This document outlines the data model and structural schema designed to store, manage, and query the technical interview question bank compiled from cleaned_technical_questions.json.

1. Architecture Overview
To avoid repeating string labels and to allow for seamless filtering, scalability, and performance optimization, the data is normalized into three relational tables:

topics: Master table defining specific technological sub-domains.
difficulties: Master lookup table handling core skill-tier classifications.
questions: Core entity table mapping individual unique problems, answers, and indexable keywords back to their conceptual categories.
2. Entity-Relationship (ER) Diagram
+------------------+ +-------------------+ | TOPICS | | DIFFICULTIES | +------------------+ +-------------------+ | PK | id (INT) | | PK | id (INT) | | | name (TEXT) | | | level (TEXT) | +--------+---------+ +---------+---------+ | | | 1 | 1 | | | 0..* | 0..* +--------v---------------------------------v---------+ | QUESTIONS | +----------------------------------------------------+ | PK | question_id (TEXT) | | FK | topic_id (INT) | | FK | difficulty_id (INT) | | | question_text (TEXT) | | | model_answer (TEXT) | | | keywords (TEXT) | +----------------------------------------------------+

3. Data Dictionary
Table 1: topics
Maintains distinct categories (e.g., Python Basics, Data Structures, Web Security).

Column Name	Data Type	Constraints	Description
id	INTEGER	PRIMARY KEY, AUTOINCREMENT	Internal unique surrogate identifier.
name	TEXT	UNIQUE, NOT NULL	Name of the engineering domain or language subset.
Table 2: difficulties
Lookup reference for standardized evaluation categories.

Column Name	Data Type	Constraints	Description
id	INTEGER	PRIMARY KEY, AUTOINCREMENT	Internal unique surrogate identifier.
level	TEXT	UNIQUE, NOT NULL	Assessment tier standard (Easy, Medium, Hard).
Table 3: questions
Contains the core evaluation payloads mapped to the categorization dimensions.

Column Name	Data Type	Constraints	Description
question_id	TEXT	PRIMARY KEY	Alpha-numeric key preserved from source document (e.g., P001, DB011).
topic_id	INTEGER	FOREIGN KEY -> topics(id)	References the parent topic category.
difficulty_id	INTEGER	FOREIGN KEY -> difficulties(id)	References the targeted competency tier.
question_text	TEXT	NOT NULL	The core prompt presented to a user.
model_answer	TEXT	NOT NULL	Explanatory text detailing solution frameworks.
keywords	TEXT	NULLABLE	Search tokens or phrase highlights for text matching.
4. Query Performance Optimization (Indexes)
To ensure rapid pagination, search functionality, and sub-category routing across large question banks, the following explicit composite B-Tree indexes are deployed:

idx_questions_topic: Speeds up dynamic routing filters when a user browses problems exclusively by subject domain.
idx_questions_difficulty: Speeds up filtering operations targeting specific mock interview conditions or difficulty milestones.
