# Update paragraphs inside words_data.js with richer, longer paragraphs and sentence arrays
import json

with open("words_data.js", "r", encoding="utf-8") as f:
    text = f.read()

# Parse the JSON portion
prefix = "// SPELLCRAFT STUDIO: 1000+ Categorized Vocabulary & Paragraph Reading Bank\nconst APP_VOCABULARY = "
suffix = ";\n"
if text.startswith(prefix):
    json_str = text[len(prefix):].rstrip(";\n")
else:
    # fallback slice
    json_start = text.find("{")
    json_end = text.rfind("}") + 1
    json_str = text[json_start:json_end]

data = json.loads(json_str)

rich_paragraphs = [
    {
        "id": "p_b1",
        "title": "☕ Morning Routine & Fresh Start",
        "level": "beginner",
        "hinglishTitle": "Subah Ka Niyam Aur Taazgi",
        "text": "Every morning, I wake up early before the sunrise. I drink a warm cup of water and brush my teeth thoroughly. Having a healthy breakfast gives you strong energy throughout the entire day. Even if you feel tired or sleepy, taking a short walk outside makes you feel completely awake and cheerful.",
        "sentences": [
            "Every morning, I wake up early before the sunrise.",
            "I drink a warm cup of water and brush my teeth thoroughly.",
            "Having a healthy breakfast gives you strong energy throughout the entire day.",
            "Even if you feel tired or sleepy, taking a short walk outside makes you feel completely awake and cheerful."
        ],
        "hinglishTranslation": "Har subah main suraj nikalne se pehle jaldi uthta hoon. Main gunguna paani peeta hoon aur acche se daant brush karta hoon. Healthy breakfast karne se poore din acchi energy milti hai. Chahe aapko neend ya thakan lage, thodi der bahar ghoomne se aap taaza aur khush mehsus karte hain."
    },
    {
        "id": "p_b2",
        "title": "🛒 Weekend Shopping at the Market",
        "level": "beginner",
        "hinglishTitle": "Weekend Par Bazaar Mein Kharidari",
        "text": "Yesterday afternoon, my family went to the supermarket near our neighborhood. We took a basket and bought fresh vegetables, sweet apples, ripe bananas, and warm bread. My brother wanted chocolate cookies, but mother reminded him to eat healthy food first. Always check your receipt carefully before leaving the counter so that there is no confusion.",
        "sentences": [
            "Yesterday afternoon, my family went to the supermarket near our neighborhood.",
            "We took a basket and bought fresh vegetables, sweet apples, ripe bananas, and warm bread.",
            "My brother wanted chocolate cookies, but mother reminded him to eat healthy food first.",
            "Always check your receipt carefully before leaving the counter so that there is no confusion."
        ],
        "hinglishTranslation": "Kal dopahar mera parivaar paas ke supermarket gaya. Humne tokri li aur taazi sabziyan, seb, kele aur garam bread khareedi. Mere bhai ko chocolate cookies chahiye thi, lekin mummy ne pehle healthy khana khane ko kaha. Counter chhodne se pehle receipt dhyan se check karein taaki koi confusion na ho."
    },
    {
        "id": "p_m1",
        "title": "💼 Writing a Professional Work Email",
        "level": "medium",
        "hinglishTitle": "Office Email Likhne Ka Sahi Tareeqa",
        "text": "When writing a professional business email, clear communication is absolutely necessary. Always begin with a polite greeting and address the person respectfully. If you cannot attend a scheduled meeting tomorrow, apologize sincerely and suggest a separate convenient time. Remember to double-check your grammar and spelling before clicking the send button, because attention to detail builds immense trust with colleagues.",
        "sentences": [
            "When writing a professional business email, clear communication is absolutely necessary.",
            "Always begin with a polite greeting and address the person respectfully.",
            "If you cannot attend a scheduled meeting tomorrow, apologize sincerely and suggest a separate convenient time.",
            "Remember to double-check your grammar and spelling before clicking the send button, because attention to detail builds immense trust with colleagues."
        ],
        "hinglishTranslation": "Jab aap professional business email likhte hain, toh saaf communication behad zaroori hai. Hamesha polite namaste se shuru karein aur izzat se address karein. Agar aap kal ki meeting mein nahi aa sakte, toh maafi maangein aur doosra aasan time batayein. Send dabane se pehle spelling aur grammar double check karein, kyunki choti choti baaton ka dhyan rakhna colleagues ke sath bharosa banata hai."
    },
    {
        "id": "p_m2",
        "title": "✈️ Planning an International Vacation",
        "level": "medium",
        "hinglishTitle": "Videsh Yatra Ki Taiyari",
        "text": "Traveling to a foreign destination requires careful preparation and a disciplined budget. It is always wise to book your hotel accommodation and flight tickets several weeks in advance. Keep your identity documents and passport in a secure pocket. Exploring beautiful beaches, historic castles, and local restaurants creates memories that truly last a lifetime.",
        "sentences": [
            "Traveling to a foreign destination requires careful preparation and a disciplined budget.",
            "It is always wise to book your hotel accommodation and flight tickets several weeks in advance.",
            "Keep your identity documents and passport in a secure pocket.",
            "Exploring beautiful beaches, historic castles, and local restaurants creates memories that truly last a lifetime."
        ],
        "hinglishTranslation": "Videsh yatra par jaane ke liye acchi taiyari aur budget ki zaroorat hoti hai. Hotel aur flight ki tickets hafte pehle book kar lena samajhdari hai. Apne zaroori documents aur passport safe jeb mein rakhein. Sundar beaches, puraane qile aur restaurants ghoomna zindagi bhar ki yaadein banata hai."
    },
    {
        "id": "p_h1",
        "title": "🚀 Overcoming Fear & Building Confidence",
        "level": "hard",
        "hinglishTitle": "Darr Par Kaabu Aur Aatmavishwas",
        "text": "Feeling anxious when asked to write or speak in public is a universal human experience. However, consistent daily practice can completely dismantle performance anxiety. By embracing occasional embarrassments as natural stepping stones, you build genuine confidence. Persistence and enthusiasm are indispensable qualities that guarantee eventual triumph over your deepest fears.",
        "sentences": [
            "Feeling anxious when asked to write or speak in public is a universal human experience.",
            "However, consistent daily practice can completely dismantle performance anxiety.",
            "By embracing occasional embarrassments as natural stepping stones, you build genuine confidence.",
            "Persistence and enthusiasm are indispensable qualities that guarantee eventual triumph over your deepest fears."
        ],
        "hinglishTranslation": "Logon ke samne bolne ya likhne mein ghabrahat hona ek aam insani baat hai. Lekin rozana thodi practice karne se yeh darr poori tarah khatam ho sakta hai. Choti moti galtiyon ko seekhne ka hissa maanein, isse sachha aatmavishwas banta hai. Lagan aur josh aisi khasiyatein hain jo darr par pakki jeet dilati hain."
    },
    {
        "id": "p_h2",
        "title": "🌿 Science, Nature & Sustainable Tech",
        "level": "hard",
        "hinglishTitle": "Vigyan Aur Paryavaran Ka Sanrakshan",
        "text": "The delicate balance of our global environment is threatened by industrial pollution and rapid climate change. Modern scientific research offers sophisticated and sustainable solutions, including renewable solar energy and eco-friendly infrastructure. Preserving the natural world for future generations requires simultaneous collective action from governments and citizens worldwide.",
        "sentences": [
            "The delicate balance of our global environment is threatened by industrial pollution and rapid climate change.",
            "Modern scientific research offers sophisticated and sustainable solutions, including renewable solar energy and eco-friendly infrastructure.",
            "Preserving the natural world for future generations requires simultaneous collective action from governments and citizens worldwide."
        ],
        "hinglishTranslation": "Hamare paryavaran ka naazuk santulan factory pollution aur climate change ki wajah se khatre mein hai. Modern scientific research naye aur behtar tareeqe de rahi hai jaise solar energy. Aane wali peedhiyon ke liye dharti ko bachane ke liye sabhi sarkaron aur nagrikon ko ek sath milkar kadam uthane honge."
    }
]

data["paragraphs"] = rich_paragraphs

with open("words_data.js", "w", encoding="utf-8") as f:
    f.write(prefix + json.dumps(data, ensure_ascii=False) + suffix)

print("Updated words_data.js with rich dictation paragraphs!")
