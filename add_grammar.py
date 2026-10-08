# Append interactive grammar and punctuation data to words_data.js
import json

with open("words_data.js", "r", encoding="utf-8") as f:
    text = f.read()

prefix = "// SPELLCRAFT STUDIO: 1000+ Categorized Vocabulary & Paragraph Reading Bank\nconst APP_VOCABULARY = "
suffix = ";\n"

if text.startswith(prefix):
    json_str = text[len(prefix):].rstrip(";\n")
else:
    json_start = text.find("{")
    json_end = text.rfind("}") + 1
    json_str = text[json_start:json_end]

data = json.loads(json_str)

grammar_challenges = [
    {
        "id": "g1",
        "category": "a_an_the",
        "question": "Choose the correct word: 'I am proud to be ______ Indian.'",
        "options": ["an", "a", "the"],
        "answer": "an",
        "explanation": "Use 'an' before vowel sounds (A, E, I, O, U). 'Indian' begins with the sound of 'I', so say: 'an Indian'."
    },
    {
        "id": "g2",
        "category": "a_an_the",
        "question": "Choose the correct word: 'Look at ______ moon shining in the night sky.'",
        "options": ["the", "a", "an"],
        "answer": "the",
        "explanation": "Use 'the' for unique, one-of-a-kind things like 'the moon', 'the sun', or 'the sky'."
    },
    {
        "id": "g3",
        "category": "in_on_at",
        "question": "Choose the right preposition: 'Our flight leaves ______ 6:30 AM.'",
        "options": ["at", "in", "on"],
        "answer": "at",
        "explanation": "Use 'at' for exact clock times (at 6:30 AM, at 5 o'clock, at noon)."
    },
    {
        "id": "g4",
        "category": "in_on_at",
        "question": "Choose the right preposition: 'We have an important exam ______ Monday.'",
        "options": ["on", "in", "at"],
        "answer": "on",
        "explanation": "Use 'on' for specific days of the week and dates (on Monday, on Friday, on August 15th)."
    },
    {
        "id": "g5",
        "category": "in_on_at",
        "question": "Choose the right preposition: 'I like to drink warm tea ______ the morning.'",
        "options": ["in", "at", "on"],
        "answer": "in",
        "explanation": "Use 'in' for general chunks of the day: 'in the morning', 'in the afternoon', 'in the evening' (but 'at night')."
    },
    {
        "id": "g6",
        "category": "common_traps",
        "question": "Which sentence is grammatically natural and correct?",
        "options": [
            "I am not able to write Hindi properly.",
            "I don't able to write Hindi properly.",
            "I not able for write Hindi."
        ],
        "answer": "I am not able to write Hindi properly.",
        "explanation": "'Able' is an adjective, so you say 'I am not able to' or simply 'I cannot'."
    },
    {
        "id": "g7",
        "category": "apostrophes",
        "question": "Which spelling combines 'do not' correctly with an apostrophe?",
        "options": ["don't", "dont", "do'nt"],
        "answer": "don't",
        "explanation": "The apostrophe replaces the missing letter 'o' in 'not': d-o-n-'-t."
    },
    {
        "id": "g8",
        "category": "common_traps",
        "question": "Choose the correct phrase: 'Can you explain what ______?'",
        "options": [
            "it means",
            "its mean",
            "it mean"
        ],
        "answer": "it means",
        "explanation": "For singular third person (he, she, it), add 's' to the verb: 'what it means' (not 'what its mean')."
    },
    {
        "id": "g9",
        "category": "punctuation",
        "question": "Which sentence has correct capitalization and period usage?",
        "options": [
            "I want to practice daily. It will build my confidence.",
            "i want to practice daily it will build my confidence",
            "I want to practice daily it will build my confidence."
        ],
        "answer": "I want to practice daily. It will build my confidence.",
        "explanation": "Two separate thoughts must be separated by a period (.), and the next sentence must start with a Capital letter."
    },
    {
        "id": "g10",
        "category": "word_order",
        "question": "Choose the natural English word order:",
        "options": [
            "She speaks English with great confidence.",
            "She English speaks with great confidence.",
            "With confidence great she speaks English."
        ],
        "answer": "She speaks English with great confidence.",
        "explanation": "Standard English follows Subject + Verb + Object (She + speaks + English)."
    }
]

data["grammar_challenges"] = grammar_challenges

with open("words_data.js", "w", encoding="utf-8") as f:
    f.write(prefix + json.dumps(data, ensure_ascii=False) + suffix)

print("Added grammar challenges to words_data.js successfully!")
