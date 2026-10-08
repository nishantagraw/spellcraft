/**
 * SPELLCRAFT STUDIO • JAVASCRIPT ENGINE (V4)
 * Includes:
 * 1. Adaptive Performance Progression (XP, Levels, Rank Titles, Unlocks)
 * 2. Strict No-Repeat Queue (Words mastered on first try are never asked again)
 * 3. Full Paragraph Dictation Mode (Speak sentence-by-sentence, Type, Full Diff Breakdown)
 * 4. Everyday Grammar & Punctuation Studio (A/An/The, In/On/At, Apostrophes, Periods)
 * 5. Live Sentence Punctuation Cleaner (Transforms raw run-ons into polished English)
 * 6. Tricky Word Vault Spaced Repetition
 * 7. Shortcuts (R to speak, Spacebar, Ctrl+Enter)
 */

// ===================================================================
// 1. SOUND SYNTHESIZER (Web Audio API)
// ===================================================================

class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playChime() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  }

  playGentleBoop() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [330, 240];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + i * 0.12);

      gain.gain.setValueAtTime(0.001, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.25);
    });
  }

  playLevelUp() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.09);

      gain.gain.setValueAtTime(0.001, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.2, now + i * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.45);
    });
  }

  playClick() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }
}

const synth = new SoundSynth();

// ===================================================================
// 2. TEXT-TO-SPEECH (SPEECH SYNTHESIS ENGINE)
// ===================================================================

class VoiceNarrator {
  speak(text, slow = false) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = slow ? 0.65 : 0.92;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      v => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
    ) || voices.find(v => v.lang.startsWith("en"));

    if (preferred) utterance.voice = preferred;

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

const narrator = new VoiceNarrator();
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ===================================================================
// 3. CANVAS CONFETTI
// ===================================================================

class ConfettiSystem {
  constructor() {
    this.canvas = document.getElementById("confettiCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(count = 50) {
    const colors = ["#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#38bdf8", "#f43f5e"];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth / 2 + (Math.random() * 200 - 100),
        y: window.innerHeight * 0.4 + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.9) * 16,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    if (!this.animId) this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rSpeed;
      p.alpha -= 0.012;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.animate());
    } else {
      this.animId = null;
    }
  }
}

const confetti = new ConfettiSystem();

// ===================================================================
// 4. LEVEL TITLES & XP FORMULAS
// ===================================================================

const LEVEL_TITLES = [
  "Novice Reader",          // Lv 1
  "Word Explorer",          // Lv 2
  "Spelling Scout",         // Lv 3
  "Vocabulary Knight",      // Lv 4
  "Word Crafter",           // Lv 5
  "Linguistic Scholar",     // Lv 6
  "Grammar Master",         // Lv 7
  "Orthography Champion",   // Lv 8
  "English Artisan",        // Lv 9
  "SpellCraft Grandmaster"  // Lv 10+
];

function getLevelTitle(level) {
  const index = Math.min(level - 1, LEVEL_TITLES.length - 1);
  return LEVEL_TITLES[Math.max(0, index)];
}

function getXpRequired(level) {
  return level * 100;
}

// ===================================================================
// 5. APPLICATION STATE & PERSISTENCE
// ===================================================================

const STORAGE_KEY = "spellcraft_studio_v4";

class AppState {
  constructor() {
    this.currentMode = "hear-spell";
    this.currentLevel = "all";
    this.currentPackId = "all_words";
    this.searchQuery = "";
    this.currentWordIndex = 0;

    // Progression
    this.userLevel = 1;
    this.userXp = 0;
    this.streak = 0;

    // Mastered word tracker (NEVER REPEATED!)
    this.masteredWordSet = new Set();
    this.vaultWords = [];
    this.theme = "charcoal";

    // Vocabulary, Paragraphs & Grammar Challenges Data
    this.allWords = (typeof APP_VOCABULARY !== "undefined" && APP_VOCABULARY.words) ? APP_VOCABULARY.words : [];
    this.paragraphs = (typeof APP_VOCABULARY !== "undefined" && APP_VOCABULARY.paragraphs) ? APP_VOCABULARY.paragraphs : [];
    this.grammarChallenges = (typeof APP_VOCABULARY !== "undefined" && APP_VOCABULARY.grammar_challenges) ? APP_VOCABULARY.grammar_challenges : [];
    this.filteredWords = [];

    // Dictation state
    this.dictationParagraphIndex = 0;
    this.dictationSentenceIndex = 0;

    // Grammar Quiz state
    this.grammarCategory = "all";
    this.grammarQuestionIndex = 0;
    this.filteredGrammarQuestions = [];

    // Chunk Builder & Trap
    this.chunkAssembled = [];
    this.chunkPool = [];
    this.currentChunkWord = null;

    this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.userLevel = parsed.userLevel || 1;
        this.userXp = parsed.userXp || 0;
        this.streak = parsed.streak || 0;
        this.vaultWords = parsed.vaultWords || [];
        this.theme = parsed.theme || "charcoal";
        if (Array.isArray(parsed.masteredWords)) {
          this.masteredWordSet = new Set(parsed.masteredWords);
        }
      }
    } catch (e) {
      console.warn("LocalStorage load error:", e);
    }
  }

  save() {
    try {
      const payload = {
        userLevel: this.userLevel,
        userXp: this.userXp,
        streak: this.streak,
        vaultWords: this.vaultWords,
        theme: this.theme,
        masteredWords: Array.from(this.masteredWordSet)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  addXp(amount) {
    this.userXp += amount;
    const required = getXpRequired(this.userLevel);

    if (this.userXp >= required) {
      this.userXp -= required;
      this.userLevel += 1;
      synth.playLevelUp();
      confetti.fire(90);
      alert(`🎉 LEVEL UP! You reached Level ${this.userLevel}: ${getLevelTitle(this.userLevel)}! Keep soaring!`);
    }

    this.save();
    updateHeaderStats();
  }

  markWordMastered(wordStr) {
    this.masteredWordSet.add(wordStr.toLowerCase());
    this.vaultWords = this.vaultWords.filter(w => w.word.toLowerCase() !== wordStr.toLowerCase());
    this.save();
    updateHeaderStats();
  }

  addToVault(wordObj, userMistake = "") {
    const exists = this.vaultWords.find(w => w.word.toLowerCase() === wordObj.word.toLowerCase());
    if (!exists) {
      this.vaultWords.push({
        ...wordObj,
        lastMistake: userMistake,
        mistakeCount: 1,
        addedAt: Date.now()
      });
    } else {
      exists.mistakeCount = (exists.mistakeCount || 1) + 1;
      exists.lastMistake = userMistake;
    }
    this.masteredWordSet.delete(wordObj.word.toLowerCase());
    this.save();
    updateHeaderStats();
    renderVaultView();
  }

  removeFromVault(wordStr) {
    this.vaultWords = this.vaultWords.filter(w => w.word.toLowerCase() !== wordStr.toLowerCase());
    this.save();
    updateHeaderStats();
    renderVaultView();
  }

  applyFilters() {
    let list = [...this.allWords];

    if (this.currentLevel !== "all") {
      list = list.filter(w => w.level === this.currentLevel);
    }

    if (this.currentPackId !== "all_words") {
      if (this.currentPackId === "vault_pack") {
        list = [...this.vaultWords];
      } else {
        list = list.filter(w => w.category === this.currentPackId);
      }
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(w => 
        w.word.toLowerCase().includes(q) || 
        (w.hinglishMeaning && w.hinglishMeaning.toLowerCase().includes(q)) ||
        (w.hinglishRead && w.hinglishRead.toLowerCase().includes(q))
      );
    }

    // STRICT NO REPEAT RULE: Exclude mastered words
    if (this.currentPackId !== "vault_pack") {
      list = list.filter(w => !this.masteredWordSet.has(w.word.toLowerCase()));
    }

    this.filteredWords = list;
    this.currentWordIndex = 0;
  }
}

const state = new AppState();

// ===================================================================
// 6. DOM ELEMENTS CACHE
// ===================================================================

const elements = {
  themeSelect: document.getElementById("themeSelect"),
  userLevelTitle: document.getElementById("userLevelTitle"),
  levelXpBarFill: document.getElementById("levelXpBarFill"),
  userXpText: document.getElementById("userXpText"),
  streakVal: document.getElementById("streakVal"),
  masteredVal: document.getElementById("masteredVal"),
  vaultVal: document.getElementById("vaultVal"),
  vaultCountText: document.getElementById("vaultCountText"),
  vaultHeaderPill: document.getElementById("vaultHeaderPill"),
  categoryPills: document.getElementById("categoryPills"),
  currentPackTag: document.getElementById("currentPackTag"),
  currentLevelBadge: document.getElementById("currentLevelBadge"),
  cardProgressText: document.getElementById("cardProgressText"),
  progressBarFill: document.getElementById("progressBarFill"),
  globalWordSearch: document.getElementById("globalWordSearch"),

  // Audio & Phonetic Guides
  btnPlayNormal: document.getElementById("btnPlayNormal"),
  btnPlaySlow: document.getElementById("btnPlaySlow"),
  hinglishSpeakText: document.getElementById("hinglishSpeakText"),
  hinglishMeaningText: document.getElementById("hinglishMeaningText"),

  // Clues & Hints
  clueDefinition: document.getElementById("clueDefinition"),
  clueSentence: document.getElementById("clueSentence"),
  btnToggleChunk: document.getElementById("btnToggleChunk"),
  btnToggleMnemonic: document.getElementById("btnToggleMnemonic"),
  chunkRevealBox: document.getElementById("chunkRevealBox"),
  mnemonicRevealBox: document.getElementById("mnemonicRevealBox"),
  syllablesContainer: document.getElementById("syllablesContainer"),
  mnemonicText: document.getElementById("mnemonicText"),

  // Form & Input
  spellingForm: document.getElementById("spellingForm"),
  spellingInput: document.getElementById("spellingInput"),
  btnSubmitWord: document.getElementById("btnSubmitWord"),
  feedbackBox: document.getElementById("feedbackBox"),
  btnSkipWord: document.getElementById("btnSkipWord"),
  btnNextWord: document.getElementById("btnNextWord"),

  // Paragraph Dictation Mode
  dictationParagraphTabs: document.getElementById("dictationParagraphTabs"),
  btnDictationPlayCurrent: document.getElementById("btnDictationPlayCurrent"),
  btnDictationPrevSentence: document.getElementById("btnDictationPrevSentence"),
  dictationSentenceCounter: document.getElementById("dictationSentenceCounter"),
  btnDictationNextSentence: document.getElementById("btnDictationNextSentence"),
  btnDictationPlayFull: document.getElementById("btnDictationPlayFull"),
  dictationSlowToggle: document.getElementById("dictationSlowToggle"),
  dictationTextarea: document.getElementById("dictationTextarea"),
  dictationWordCount: document.getElementById("dictationWordCount"),
  btnClearDictation: document.getElementById("btnClearDictation"),
  btnVerifyDictation: document.getElementById("btnVerifyDictation"),
  dictationResultBox: document.getElementById("dictationResultBox"),
  dictationScoreCircle: document.getElementById("dictationScoreCircle"),
  dictationScoreHeadline: document.getElementById("dictationScoreHeadline"),
  dictationScoreSubtext: document.getElementById("dictationScoreSubtext"),
  dictationDiffDisplay: document.getElementById("dictationDiffDisplay"),
  dictationMistakesGrid: document.getElementById("dictationMistakesGrid"),

  // Everyday Grammar & Punctuation Studio
  grammarCatTag: document.getElementById("grammarCatTag"),
  grammarCounter: document.getElementById("grammarCounter"),
  grammarQuestionText: document.getElementById("grammarQuestionText"),
  grammarOptionsGrid: document.getElementById("grammarOptionsGrid"),
  grammarExplanationBox: document.getElementById("grammarExplanationBox"),
  grammarExplainTitle: document.getElementById("grammarExplainTitle"),
  grammarExplainText: document.getElementById("grammarExplainText"),
  btnNextGrammarQuestion: document.getElementById("btnNextGrammarQuestion"),
  rawSentenceInput: document.getElementById("rawSentenceInput"),
  btnCleanSentence: document.getElementById("btnCleanSentence"),
  fixerOutputBox: document.getElementById("fixerOutputBox"),
  fixerCleanText: document.getElementById("fixerCleanText"),
  fixerBreakdownNotes: document.getElementById("fixerBreakdownNotes"),

  // Paragraph Reading Studio
  paragraphSelectorTabs: document.getElementById("paragraphSelectorTabs"),
  paraTitle: document.getElementById("paraTitle"),
  paraHinglishTitle: document.getElementById("paraHinglishTitle"),
  btnPlayFullParagraph: document.getElementById("btnPlayFullParagraph"),
  btnStopParagraphAudio: document.getElementById("btnStopParagraphAudio"),
  paraEnglishContent: document.getElementById("paraEnglishContent"),
  paraHinglishContent: document.getElementById("paraHinglishContent"),
  wordQuickInspector: document.getElementById("wordQuickInspector"),
  inspectorWord: document.getElementById("inspectorWord"),
  inspectorPhonetic: document.getElementById("inspectorPhonetic"),
  inspectorHinglishSpeak: document.getElementById("inspectorHinglishSpeak"),
  inspectorHinglishMeaning: document.getElementById("inspectorHinglishMeaning"),
  inspectorChunks: document.getElementById("inspectorChunks"),
  btnInspectorSpeak: document.getElementById("btnInspectorSpeak"),
  btnInspectorPractice: document.getElementById("btnInspectorPractice"),
  btnCloseInspector: document.getElementById("btnCloseInspector"),

  // Chunk Builder
  chunkTargetMeaning: document.getElementById("chunkTargetMeaning"),
  assembledSlots: document.getElementById("assembledSlots"),
  scrambledPool: document.getElementById("scrambledPool"),
  btnResetChunks: document.getElementById("btnResetChunks"),
  btnVerifyChunks: document.getElementById("btnVerifyChunks"),
  chunkFeedback: document.getElementById("chunkFeedback"),
  btnNextChunkWord: document.getElementById("btnNextChunkWord"),
  btnChunkPlayAudio: document.getElementById("btnChunkPlayAudio"),

  // Spot The Trap
  trapQuestionText: document.getElementById("trapQuestionText"),
  trapWordMeaning: document.getElementById("trapWordMeaning"),
  trapOptionsGrid: document.getElementById("trapOptionsGrid"),
  trapExplanation: document.getElementById("trapExplanation"),
  btnNextTrapWord: document.getElementById("btnNextTrapWord"),

  // Vault
  btnTrainVault: document.getElementById("btnTrainVault"),
  customWordInput: document.getElementById("customWordInput"),
  customHintInput: document.getElementById("customHintInput"),
  btnAddCustomWord: document.getElementById("btnAddCustomWord"),
  btnClearVault: document.getElementById("btnClearVault"),
  vaultItemsGrid: document.getElementById("vaultItemsGrid")
};

// ===================================================================
// 7. INITIALIZATION & HEADER STATS
// ===================================================================

function initApp() {
  applyTheme(state.theme);
  elements.themeSelect.value = state.theme;

  renderCategoryPills();
  state.applyFilters();
  loadCurrentWord();
  loadChunkBuilderWord();
  loadTrapWord();
  initDictationMode();
  initParagraphStudio();
  initGrammarStudio();

  updateHeaderStats();
  renderVaultView();

  bindEventListeners();
}

function updateHeaderStats() {
  const required = getXpRequired(state.userLevel);
  const pct = Math.min(100, Math.round((state.userXp / required) * 100));

  elements.userLevelTitle.textContent = `Lv. ${state.userLevel} ${getLevelTitle(state.userLevel)}`;
  elements.levelXpBarFill.style.width = `${pct}%`;
  elements.userXpText.textContent = `${state.userXp}/${required} XP`;

  elements.streakVal.textContent = state.streak;
  elements.masteredVal.textContent = state.masteredWordSet.size;
  elements.vaultVal.textContent = state.vaultWords.length;
  elements.vaultCountText.textContent = state.vaultWords.length;
}

function applyTheme(themeName) {
  document.body.setAttribute("data-theme", themeName);
  state.theme = themeName;
  state.save();
}

// ===================================================================
// 8. CATEGORY PILLS & FILTERS
// ===================================================================

function renderCategoryPills() {
  elements.categoryPills.innerHTML = "";

  const cats = ["all_words", "Daily Basics", "Food", "Work", "Animals", "Home", "Emotions", "School", "Travel"];

  cats.forEach(c => {
    const pill = document.createElement("button");
    pill.className = `pack-pill ${c === state.currentPackId ? "active" : ""}`;
    pill.textContent = c === "all_words" ? "🌟 All Pack" : c;
    pill.addEventListener("click", () => {
      synth.playClick();
      state.currentPackId = c;
      document.querySelectorAll(".pack-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.applyFilters();
      loadCurrentWord();
      loadChunkBuilderWord();
      loadTrapWord();
    });
    elements.categoryPills.appendChild(pill);
  });

  const vaultPill = document.createElement("button");
  vaultPill.className = `pack-pill ${state.currentPackId === "vault_pack" ? "active" : ""}`;
  vaultPill.textContent = "🎯 My Tricky Vault";
  vaultPill.addEventListener("click", () => {
    synth.playClick();
    if (state.vaultWords.length === 0) {
      alert("Your Tricky Vault is empty! Mistake words land here automatically.");
      return;
    }
    state.currentPackId = "vault_pack";
    state.applyFilters();
    loadCurrentWord();
  });
  elements.categoryPills.appendChild(vaultPill);
}

// ===================================================================
// 9. MODE 1: HEAR & SPELL (ADAPTIVE NO-REPEAT)
// ===================================================================

function getCurrentWordObj() {
  if (state.filteredWords.length === 0) return null;
  return state.filteredWords[state.currentWordIndex];
}

function loadCurrentWord() {
  const current = getCurrentWordObj();

  if (!current) {
    elements.cardProgressText.textContent = "0 unmastered words left";
    elements.progressBarFill.style.width = "100%";
    elements.clueDefinition.textContent = "All words in this pack have been mastered without repeat!";
    elements.clueSentence.innerHTML = "🏆 You conquered this set! Switch levels above or try Dictation Mode!";
    elements.hinglishSpeakText.textContent = "शाबाश! (Shaabaash!)";
    elements.hinglishMeaningText.textContent = "Set Complete";
    elements.spellingInput.disabled = true;
    elements.btnSkipWord.classList.add("hidden");
    elements.btnNextWord.classList.add("hidden");
    return;
  }

  elements.spellingInput.value = "";
  elements.spellingInput.disabled = false;
  elements.spellingInput.focus();
  elements.feedbackBox.classList.add("hidden");
  elements.feedbackBox.className = "feedback-box hidden";
  elements.btnNextWord.classList.add("hidden");
  elements.btnSkipWord.classList.remove("hidden");
  elements.chunkRevealBox.classList.add("hidden");
  elements.mnemonicRevealBox.classList.add("hidden");

  const total = state.filteredWords.length;
  elements.cardProgressText.textContent = `Remaining: ${total} unmastered words`;
  const pct = Math.max(8, Math.min(100, Math.round(((state.currentWordIndex + 1) / total) * 100)));
  elements.progressBarFill.style.width = `${pct}%`;

  elements.currentPackTag.textContent = current.category || "General";
  elements.currentLevelBadge.textContent = 
    current.level === "beginner" ? "🟢 Beginner" : 
    (current.level === "medium" ? "🟡 Medium" : "🔴 Hard");

  elements.hinglishSpeakText.textContent = current.hinglishRead || current.word;
  elements.hinglishMeaningText.textContent = current.hinglishMeaning || "Practice word";

  elements.clueDefinition.textContent = current.hinglishMeaning 
    ? `${current.hinglishMeaning} (${current.mnemonic || "Everyday word"})` 
    : "Key vocabulary word";
  
  elements.clueSentence.innerHTML = current.sentence.replace(
    /_______/g,
    `<span class="word-blank">_______</span>`
  );

  elements.mnemonicText.innerHTML = current.mnemonic;
  elements.syllablesContainer.innerHTML = "";
  current.chunks.forEach((chunk, idx) => {
    const span = document.createElement("span");
    span.className = "s-chunk";
    span.textContent = chunk;
    elements.syllablesContainer.appendChild(span);

    if (idx < current.chunks.length - 1) {
      const dot = document.createElement("span");
      dot.className = "s-dot";
      dot.textContent = "•";
      elements.syllablesContainer.appendChild(dot);
    }
  });

  narrator.speak(current.word);
}

function checkCurrentSpelling() {
  const current = getCurrentWordObj();
  if (!current) return;

  const userTyped = elements.spellingInput.value.trim().toLowerCase();
  const target = current.word.toLowerCase();

  if (!userTyped) {
    elements.spellingInput.focus();
    return;
  }

  elements.feedbackBox.classList.remove("hidden");

  if (userTyped === target) {
    synth.playChime();
    confetti.fire(45);

    state.streak += 1;
    state.addXp(25 + Math.min(20, state.streak * 2));
    state.markWordMastered(current.word);
    state.filteredWords.splice(state.currentWordIndex, 1);

    elements.feedbackBox.className = "feedback-box correct";
    elements.feedbackBox.innerHTML = `
      <div class="feedback-title-row">
        <span>🎉 Perfect! Word Mastered (+${25 + Math.min(20, state.streak * 2)} XP)</span>
      </div>
      <div class="breakdown-row">
        <span class="breakdown-label">Spelling:</span>
        <span class="spelling-compare letter-correct">${target.toUpperCase()}</span>
      </div>
      <p style="margin-top: 8px; font-size: 13px; color: var(--accent-mint);">
        🔒 <strong>Locked into Mastered List!</strong> You got it right, so it will <strong>never repeat</strong> again in this level!
      </p>
    `;

    elements.spellingInput.disabled = true;
    elements.btnSkipWord.classList.add("hidden");
    elements.btnNextWord.classList.remove("hidden");
    elements.btnNextWord.focus();

  } else {
    synth.playGentleBoop();
    state.streak = 0;
    state.addToVault(current, userTyped);
    updateHeaderStats();

    elements.feedbackBox.className = "feedback-box incorrect";
    const diffHtml = generateLetterDiff(userTyped, target);

    elements.feedbackBox.innerHTML = `
      <div class="feedback-title-row">
        <span>🌱 Close attempt! Here is the fix:</span>
      </div>
      <div class="breakdown-row">
        <span class="breakdown-label">Correct:</span>
        <span class="spelling-compare letter-correct">${target}</span>
      </div>
      <div class="breakdown-row">
        <span class="breakdown-label">Your spelling:</span>
        <span class="spelling-compare">${diffHtml}</span>
      </div>
      <p style="margin-top: 8px; font-size: 13px;">💡 <strong>Memory Tip:</strong> ${current.mnemonic}</p>
      <div style="margin-top: 6px; font-size: 12px; color: var(--accent-coral);">
        ✨ Saved to your <strong>Tricky Word Vault</strong> so you can practice until perfect!
      </div>
    `;

    state.currentWordIndex++;
    elements.btnSkipWord.classList.add("hidden");
    elements.btnNextWord.classList.remove("hidden");
    elements.btnNextWord.focus();
  }
}

function generateLetterDiff(userStr, targetStr) {
  let html = "";
  const maxLen = Math.max(userStr.length, targetStr.length);

  for (let i = 0; i < maxLen; i++) {
    const uChar = userStr[i] || "";
    const tChar = targetStr[i] || "";

    if (uChar === tChar) {
      html += `<span class="letter-correct">${uChar}</span>`;
    } else {
      html += `<span class="letter-wrong">${uChar || "_"}</span>`;
    }
  }
  return html;
}

function nextWord() {
  synth.playClick();
  if (state.currentWordIndex >= state.filteredWords.length) {
    state.currentWordIndex = 0;
  }
  loadCurrentWord();
}

function skipWord() {
  synth.playClick();
  const current = getCurrentWordObj();
  if (current) state.addToVault(current, "[Skipped]");
  state.currentWordIndex++;
  nextWord();
}

// ===================================================================
// 10. MODE 2: FULL PARAGRAPH DICTATION (SPEAK & WRITE)
// ===================================================================

function initDictationMode() {
  if (state.paragraphs.length === 0) return;

  elements.dictationParagraphTabs.innerHTML = "";

  state.paragraphs.forEach((p, idx) => {
    const btn = document.createElement("button");
    btn.className = `para-tab-btn ${idx === state.dictationParagraphIndex ? "active" : ""}`;
    btn.textContent = p.title;
    btn.addEventListener("click", () => {
      synth.playClick();
      state.dictationParagraphIndex = idx;
      state.dictationSentenceIndex = 0;
      document.querySelectorAll("#dictationParagraphTabs .para-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadDictationParagraph();
    });
    elements.dictationParagraphTabs.appendChild(btn);
  });

  loadDictationParagraph();
}

function loadDictationParagraph() {
  const p = state.paragraphs[state.dictationParagraphIndex];
  if (!p) return;

  state.dictationSentenceIndex = 0;
  elements.dictationTextarea.value = "";
  elements.dictationWordCount.textContent = "0 words typed";
  elements.dictationResultBox.classList.add("hidden");
  updateDictationSentenceBadge();
  speakCurrentDictationSentence();
}

function updateDictationSentenceBadge() {
  const p = state.paragraphs[state.dictationParagraphIndex];
  const total = p.sentences ? p.sentences.length : 1;
  elements.dictationSentenceCounter.textContent = `Sentence ${state.dictationSentenceIndex + 1} of ${total}`;
}

function speakCurrentDictationSentence() {
  const p = state.paragraphs[state.dictationParagraphIndex];
  if (!p || !p.sentences) return;

  const sentence = p.sentences[state.dictationSentenceIndex];
  const isSlow = elements.dictationSlowToggle.checked;
  narrator.speak(sentence, isSlow);
}

function verifyParagraphDictation() {
  const p = state.paragraphs[state.dictationParagraphIndex];
  if (!p) return;

  const targetText = p.text;
  const userText = elements.dictationTextarea.value.trim();

  if (!userText) {
    alert("Please type the sentence or paragraph first before checking!");
    elements.dictationTextarea.focus();
    return;
  }

  const cleanTargetWords = targetText.split(/\s+/).map(w => w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase());
  const cleanUserWords = userText.split(/\s+/).map(w => w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase());
  const rawTargetWords = targetText.split(/\s+/);

  let correctCount = 0;
  const mistakeWordsList = [];
  let diffHtml = "";

  cleanTargetWords.forEach((targetW, idx) => {
    const userW = cleanUserWords[idx] || "";
    const rawTarget = rawTargetWords[idx] || targetW;

    if (userW === targetW) {
      correctCount++;
      diffHtml += `<span class="dict-word-ok">${rawTarget}</span> `;
    } else if (!userW) {
      diffHtml += `<span class="dict-word-missing">[missing: ${rawTarget}]</span> `;
    } else {
      diffHtml += `<span class="dict-word-wrong" title="Typed: ${userW}">${rawTarget}</span> `;
      const matchedMeta = state.allWords.find(w => w.word.toLowerCase() === targetW) || {
        word: targetW,
        hinglishRead: targetW,
        hinglishMeaning: "Paragraph word",
        mnemonic: "Practice spelling this word"
      };
      mistakeWordsList.push({
        target: targetW,
        typed: userW,
        meta: matchedMeta
      });
      state.addToVault(matchedMeta, userW);
    }
  });

  const accuracy = Math.round((correctCount / cleanTargetWords.length) * 100);

  elements.dictationResultBox.classList.remove("hidden");
  elements.dictationScoreCircle.textContent = `${accuracy}%`;

  if (accuracy >= 90) {
    synth.playChime();
    confetti.fire(70);
    state.addXp(75);
    elements.dictationScoreHeadline.textContent = "🏆 Phenomenal Dictation! (+75 XP)";
    elements.dictationScoreSubtext.textContent = `You accurately spelled ${correctCount} of ${cleanTargetWords.length} words!`;
  } else if (accuracy >= 70) {
    synth.playChime();
    state.addXp(40);
    elements.dictationScoreHeadline.textContent = "🌟 Solid Effort! (+40 XP)";
    elements.dictationScoreSubtext.textContent = `You spelled ${correctCount} of ${cleanTargetWords.length} words correctly. Check your weak spots below!`;
  } else {
    synth.playGentleBoop();
    state.addXp(15);
    elements.dictationScoreHeadline.textContent = "🌱 Good Practice! (+15 XP)";
    elements.dictationScoreSubtext.textContent = `Missed words are highlighted in red below and saved to your Vault.`;
  }

  elements.dictationDiffDisplay.innerHTML = diffHtml;

  elements.dictationMistakesGrid.innerHTML = "";
  if (mistakeWordsList.length === 0) {
    elements.dictationMistakesGrid.innerHTML = `<div style="color: var(--accent-mint); font-weight: 700;">Zero mistakes! 100% perfect spelling!</div>`;
  } else {
    mistakeWordsList.forEach(m => {
      const card = document.createElement("div");
      card.className = "dict-mistake-card";
      card.innerHTML = `
        <span class="mistake-target-word">${m.target.toUpperCase()}</span>
        <span class="mistake-user-typed">You typed: <del>${m.typed}</del></span>
        <span class="mistake-speak-hint">🗣️ Speak: ${m.meta.hinglishRead || m.target}</span>
        <span style="font-size: 11px; color: var(--accent-mint);">🇮🇳 Meaning: ${m.meta.hinglishMeaning || "Saved to Vault"}</span>
      `;
      elements.dictationMistakesGrid.appendChild(card);
    });
  }

  elements.dictationResultBox.scrollIntoView({ behavior: "smooth" });
}

// ===================================================================
// 11. MODE 3: EVERYDAY GRAMMAR & PUNCTUATION STUDIO
// ===================================================================

function initGrammarStudio() {
  state.filteredGrammarQuestions = [...state.grammarChallenges];
  loadGrammarQuestion(0);

  // Sub-tabs for grammar
  document.querySelectorAll(".grammar-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      synth.playClick();
      document.querySelectorAll(".grammar-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-cat");
      state.grammarCategory = cat;
      if (cat === "all") {
        state.filteredGrammarQuestions = [...state.grammarChallenges];
      } else {
        state.filteredGrammarQuestions = state.grammarChallenges.filter(q => q.category === cat);
      }
      state.grammarQuestionIndex = 0;
      loadGrammarQuestion(0);
    });
  });

  // Next question
  elements.btnNextGrammarQuestion.addEventListener("click", () => {
    synth.playClick();
    if (state.grammarQuestionIndex < state.filteredGrammarQuestions.length - 1) {
      state.grammarQuestionIndex++;
      loadGrammarQuestion(state.grammarQuestionIndex);
    } else {
      confetti.fire(60);
      alert("🌟 Great job! You finished all grammar questions in this category!");
      state.grammarQuestionIndex = 0;
      loadGrammarQuestion(0);
    }
  });

  // Sentence Fixer button
  elements.btnCleanSentence.addEventListener("click", cleanUpUserSentence);
}

function loadGrammarQuestion(idx) {
  const q = state.filteredGrammarQuestions[idx];
  if (!q) return;

  elements.grammarCatTag.textContent = getGrammarCatLabel(q.category);
  elements.grammarCounter.textContent = `Question ${idx + 1} of ${state.filteredGrammarQuestions.length}`;
  elements.grammarQuestionText.textContent = q.question;
  elements.grammarExplanationBox.classList.add("hidden");
  elements.btnNextGrammarQuestion.classList.add("hidden");

  elements.grammarOptionsGrid.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "grammar-option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      handleGrammarOptionClick(btn, opt, q);
    });
    elements.grammarOptionsGrid.appendChild(btn);
  });
}

function getGrammarCatLabel(cat) {
  switch (cat) {
    case "a_an_the": return "🅰️ A vs An vs The";
    case "in_on_at": return "📍 In vs On vs At";
    case "apostrophes": return "🔤 Don't & Can't (Apostrophes)";
    case "common_traps": return "⚠️ Common Traps (Able to / Means)";
    case "punctuation": return "🎯 Periods & Capitalization";
    case "word_order": return "📐 Sentence Word Order";
    default: return "🌟 Grammar Rule";
  }
}

function handleGrammarOptionClick(button, selectedStr, questionObj) {
  document.querySelectorAll(".grammar-option-btn").forEach(b => {
    b.disabled = true;
    if (b.textContent === questionObj.answer) {
      b.classList.add("correct-choice");
    }
  });

  elements.grammarExplanationBox.classList.remove("hidden");
  elements.grammarExplainText.textContent = questionObj.explanation;

  if (selectedStr === questionObj.answer) {
    synth.playChime();
    confetti.fire(35);
    state.addXp(20);
    elements.grammarExplainTitle.textContent = "✨ Correct! (+20 XP)";
  } else {
    synth.playGentleBoop();
    button.classList.add("wrong-choice");
    elements.grammarExplainTitle.textContent = "💡 Helpful Explanation:";
  }

  elements.btnNextGrammarQuestion.classList.remove("hidden");
}

/**
 * Heuristic Sentence Cleaner:
 * Transforms unpunctuated thoughts into clean English with proper periods,
 * capital letters, and fixes common Hindi-English traps.
 */
function cleanUpUserSentence() {
  const raw = elements.rawSentenceInput.value.trim();
  if (!raw) {
    alert("Please type or paste a sentence to clean up!");
    return;
  }

  const notes = [];

  let text = raw;

  // 1. Trap: "i dont able to" / "dont able to" -> "I am not able to"
  if (/i\s+dont\s+able\s+to|i\s+don't\s+able\s+to/i.test(text)) {
    text = text.replace(/i\s+dont\s+able\s+to|i\s+don't\s+able\s+to/gi, "I am not able to");
    notes.push("Replaced 'I don't able to' with 'I am not able to' (use 'am not' with 'able').");
  }

  // 2. Trap: "as a indian" -> "as an Indian"
  if (/as\s+a\s+indian/i.test(text)) {
    text = text.replace(/as\s+a\s+indian/gi, "as an Indian");
    notes.push("Changed 'a Indian' to 'an Indian' (use 'an' before vowel sounds).");
  }

  // 3. Contraction apostrophes: cant -> can't, dont -> don't
  if (/\bcant\b/i.test(text)) {
    text = text.replace(/\bcant\b/gi, "can't");
    notes.push("Added apostrophe to 'can't'.");
  }
  if (/\bdont\b/i.test(text)) {
    text = text.replace(/\bdont\b/gi, "don't");
    notes.push("Added apostrophe to 'don't'.");
  }

  // 4. Trap: "what its mean" -> "what it means"
  if (/what\s+its\s+mean\b/i.test(text)) {
    text = text.replace(/what\s+its\s+mean\b/gi, "what it means");
    notes.push("Corrected 'what its mean' to 'what it means'.");
  }

  // 5. Break run-on connecting words: "like before start let me" -> ". Before starting, let me"
  text = text.replace(/\s+like\s+before\s+/gi, ". Before ");
  text = text.replace(/\s+and\s+as\s+an\s+indian\s+/gi, ". As an Indian, ");
  text = text.replace(/\s+and\s+now\s+we\s+/gi, ". Now we ");

  // 6. Split into sentences by periods, capitalize each
  let sentences = text.split(/(?<=[.?!])\s+/);
  if (sentences.length === 1 && text.length > 50) {
    // Break on coordinating conjunctions if missing punctuation
    text = text.replace(/(\b(?:hindi|english|write|understand|bad)\b)\s+(i\s+)/gi, "$1. $2");
    sentences = text.split(/(?<=[.?!])\s+/);
  }

  const polished = sentences.map(s => {
    s = s.trim();
    if (!s) return "";
    // Capitalize first character
    s = s.charAt(0).toUpperCase() + s.slice(1);
    // Capitalize standalone 'i'
    s = s.replace(/\bi\b/g, "I");
    s = s.replace(/\bhindi\b/gi, "Hindi");
    s = s.replace(/\benglish\b/gi, "English");
    if (!/[.?!]$/.test(s)) {
      s += ".";
    }
    return s;
  }).filter(Boolean).join(" ");

  if (notes.length === 0) {
    notes.push("Added periods (.) to separate thoughts and capitalized starting letters.");
  }

  elements.fixerCleanText.textContent = polished;
  elements.fixerBreakdownNotes.innerHTML = notes.map(n => `<div class="fix-note-item">✅ ${n}</div>`).join("");
  elements.fixerOutputBox.classList.remove("hidden");
  synth.playChime();
}

// ===================================================================
// 12. MODE 4: PARAGRAPH READING STUDIO
// ===================================================================

let selectedInspectorWord = null;

function initParagraphStudio() {
  if (state.paragraphs.length === 0) return;

  elements.paragraphSelectorTabs.innerHTML = "";

  state.paragraphs.forEach((p, idx) => {
    const btn = document.createElement("button");
    btn.className = `para-tab-btn ${idx === 0 ? "active" : ""}`;
    btn.textContent = p.title;
    btn.addEventListener("click", () => {
      synth.playClick();
      document.querySelectorAll("#paragraphSelectorTabs .para-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadParagraph(idx);
    });
    elements.paragraphSelectorTabs.appendChild(btn);
  });

  loadParagraph(0);
}

function loadParagraph(index) {
  const p = state.paragraphs[index];
  if (!p) return;

  elements.paraTitle.textContent = p.title;
  elements.paraHinglishTitle.textContent = p.hinglishTitle;
  elements.paraHinglishContent.textContent = p.hinglishTranslation;
  elements.wordQuickInspector.classList.add("hidden");

  const wordsArray = p.text.split(" ");
  elements.paraEnglishContent.innerHTML = "";

  wordsArray.forEach((w) => {
    const cleanWord = w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();
    const span = document.createElement("span");
    span.className = "para-word";
    span.textContent = w + " ";

    span.addEventListener("click", () => {
      synth.playClick();
      inspectParagraphWord(cleanWord, span);
    });

    elements.paraEnglishContent.appendChild(span);
  });
}

function inspectParagraphWord(wordStr, spanEl) {
  document.querySelectorAll(".para-word").forEach(w => w.classList.remove("highlighted"));
  spanEl.classList.add("highlighted");

  const matched = state.allWords.find(w => w.word.toLowerCase() === wordStr) || {
    word: wordStr,
    phonetic: wordStr.toUpperCase(),
    hinglishRead: wordStr,
    hinglishMeaning: "Vocabulary word",
    chunks: [wordStr]
  };

  selectedInspectorWord = matched;

  elements.inspectorWord.textContent = matched.word;
  elements.inspectorPhonetic.textContent = matched.phonetic || "";
  elements.inspectorHinglishSpeak.textContent = matched.hinglishRead || matched.word;
  elements.inspectorHinglishMeaning.textContent = matched.hinglishMeaning || "Vocabulary word";
  elements.inspectorChunks.textContent = matched.chunks ? matched.chunks.join(" • ") : matched.word;

  elements.wordQuickInspector.classList.remove("hidden");
  narrator.speak(matched.word);
}

function playEntireParagraph() {
  const p = state.paragraphs[state.dictationParagraphIndex];
  if (p) narrator.speak(p.text, false);
}

// ===================================================================
// 13. MODE 5: CHUNK BUILDER
// ===================================================================

function loadChunkBuilderWord() {
  const current = getCurrentWordObj();
  if (!current) return;

  state.currentChunkWord = current;
  state.chunkAssembled = [];
  state.chunkPool = [...current.chunks].sort(() => Math.random() - 0.5);

  elements.chunkTargetMeaning.textContent = `Meaning: ${current.hinglishMeaning || current.meaning}`;
  elements.chunkFeedback.className = "chunk-feedback hidden";
  elements.btnNextChunkWord.classList.add("hidden");

  renderChunkBuilderSlots();
  renderChunkScrambledPool();
}

function renderChunkBuilderSlots() {
  elements.assembledSlots.innerHTML = "";
  if (state.chunkAssembled.length === 0) {
    elements.assembledSlots.innerHTML = `<span style="color: var(--text-muted); font-size: 13px;">(Click sound chunks below in order)</span>`;
    return;
  }

  state.chunkAssembled.forEach((chunk, idx) => {
    const chip = document.createElement("button");
    chip.className = "chunk-chip";
    chip.textContent = chunk;
    chip.addEventListener("click", () => {
      synth.playClick();
      state.chunkAssembled.splice(idx, 1);
      renderChunkBuilderSlots();
      renderChunkScrambledPool();
    });
    elements.assembledSlots.appendChild(chip);
  });
}

function renderChunkScrambledPool() {
  elements.scrambledPool.innerHTML = "";

  const placedMap = {};
  state.chunkAssembled.forEach(c => {
    placedMap[c] = (placedMap[c] || 0) + 1;
  });

  const poolCounts = {};
  state.chunkPool.forEach(c => {
    poolCounts[c] = (poolCounts[c] || 0) + 1;
    const isPlaced = (placedMap[c] || 0) >= poolCounts[c];

    const chip = document.createElement("button");
    chip.className = `chunk-chip ${isPlaced ? "placed" : ""}`;
    chip.textContent = c;
    chip.addEventListener("click", () => {
      if (!isPlaced) {
        synth.playClick();
        state.chunkAssembled.push(c);
        renderChunkBuilderSlots();
        renderChunkScrambledPool();
      }
    });
    elements.scrambledPool.appendChild(chip);
  });
}

function verifyChunkBuilder() {
  const targetWord = state.currentChunkWord.word.toLowerCase();
  const assembledWord = state.chunkAssembled.join("").toLowerCase();

  elements.chunkFeedback.classList.remove("hidden");

  if (assembledWord === targetWord) {
    synth.playChime();
    confetti.fire(40);
    state.addXp(30);

    elements.chunkFeedback.className = "chunk-feedback correct";
    elements.chunkFeedback.innerHTML = `
      🎉 Bravo! <strong>${targetWord.toUpperCase()}</strong> assembled in rhythm! (+30 XP)
      <div style="font-size: 13px; margin-top: 4px;">🗣️ ${state.currentChunkWord.hinglishRead} • 🇮🇳 ${state.currentChunkWord.hinglishMeaning}</div>
    `;
    elements.btnNextChunkWord.classList.remove("hidden");
  } else {
    synth.playGentleBoop();
    elements.chunkFeedback.className = "chunk-feedback incorrect";
    elements.chunkFeedback.textContent = "Close, but chunks are out of order! Listen again and reset.";
  }
}

// ===================================================================
// 14. MODE 6: SPOT THE TRAP
// ===================================================================

function loadTrapWord() {
  const current = getCurrentWordObj();
  if (!current) return;

  elements.trapWordMeaning.textContent = `Meaning: ${current.hinglishMeaning || current.meaning}`;
  elements.trapExplanation.classList.add("hidden");
  elements.btnNextTrapWord.classList.add("hidden");

  const options = [...current.trapOptions].sort(() => Math.random() - 0.5);

  elements.trapOptionsGrid.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "trap-option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      handleTrapChoice(btn, opt, current);
    });
    elements.trapOptionsGrid.appendChild(btn);
  });
}

function handleTrapChoice(button, selectedStr, currentWordObj) {
  document.querySelectorAll(".trap-option-btn").forEach(b => {
    b.disabled = true;
    if (b.textContent === currentWordObj.word) {
      b.classList.add("correct-choice");
    }
  });

  elements.trapExplanation.classList.remove("hidden");

  if (selectedStr.toLowerCase() === currentWordObj.word.toLowerCase()) {
    synth.playChime();
    confetti.fire(35);
    state.addXp(20);
    elements.trapExplanation.innerHTML = `
      <strong>✨ Correct! You spotted the real spelling! (+20 XP)</strong><br/>
      🗣️ Speak: ${currentWordObj.hinglishRead} • ${currentWordObj.mnemonic}
    `;
  } else {
    synth.playGentleBoop();
    button.classList.add("wrong-choice");
    state.addToVault(currentWordObj, selectedStr);

    elements.trapExplanation.innerHTML = `
      <strong style="color: var(--accent-coral);">⚠️ That's the trap!</strong><br/>
      The real spelling is <strong>${currentWordObj.word}</strong>.<br/>
      ${currentWordObj.mnemonic}
    `;
  }

  elements.btnNextTrapWord.classList.remove("hidden");
}

// ===================================================================
// 15. MODE 7: TRICKY WORD VAULT & CUSTOM WORDS
// ===================================================================

function renderVaultView() {
  elements.vaultItemsGrid.innerHTML = "";

  if (state.vaultWords.length === 0) {
    elements.vaultItemsGrid.innerHTML = `
      <div class="empty-vault-state">
        <div class="empty-icon">🌱</div>
        <h3>Your Vault is Clean!</h3>
        <p>Every tricky word or spelling mistake you encounter lands here automatically so you can practice with zero anxiety.</p>
      </div>
    `;
    return;
  }

  state.vaultWords.forEach(w => {
    const card = document.createElement("div");
    card.className = "vault-card-item";

    card.innerHTML = `
      <div class="vault-item-top">
        <span class="vault-item-word">${w.word}</span>
        <button class="btn-remove-vault" title="Remove">✕</button>
      </div>
      <div style="font-size: 13px; color: var(--text-main); font-weight: 600;">${w.hinglishMeaning || w.meaning || "Custom Word"}</div>
      <div class="vault-item-mnemonic">${w.hinglishRead ? `🗣️ ${w.hinglishRead}` : w.mnemonic}</div>
      ${w.lastMistake ? `<div style="font-size: 11px; color: var(--accent-coral);">Previous slip: <s>${w.lastMistake}</s></div>` : ""}
      <button class="vault-item-btn-speak">🔊 Hear</button>
    `;

    card.querySelector(".btn-remove-vault").addEventListener("click", () => {
      synth.playClick();
      state.removeFromVault(w.word);
    });

    card.querySelector(".vault-item-btn-speak").addEventListener("click", () => {
      narrator.speak(w.word);
    });

    elements.vaultItemsGrid.appendChild(card);
  });
}

function addCustomWord() {
  const word = elements.customWordInput.value.trim().toLowerCase();
  const hint = elements.customHintInput.value.trim();

  if (!word) {
    alert("Please enter a word to add.");
    return;
  }

  const chunks = word.length > 5 
    ? [word.slice(0, Math.floor(word.length / 2)), word.slice(Math.floor(word.length / 2))]
    : [word];

  const newObj = {
    word: word,
    level: "custom",
    category: "My Custom Words",
    chunks: chunks,
    phonetic: word.toUpperCase(),
    hinglishRead: word,
    hinglishMeaning: hint || "Apna personal word",
    sentence: `The word _______ is saved in your custom vault.`,
    mnemonic: hint ? `Clue: ${hint}` : `Sound chunks: ${chunks.join(" - ")}`,
    trap: word + "e",
    trapOptions: [word, word + "e", word.slice(0, -1)]
  };

  state.addToVault(newObj);
  elements.customWordInput.value = "";
  elements.customHintInput.value = "";
  synth.playChime();
  confetti.fire(30);
  alert(`✨ Added "${word}" to your Tricky Word Vault!`);
}

// ===================================================================
// 16. EVENT LISTENERS & SHORTCUTS
// ===================================================================

function bindEventListeners() {
  elements.themeSelect.addEventListener("change", (e) => {
    applyTheme(e.target.value);
  });

  document.querySelectorAll(".level-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      synth.playClick();
      document.querySelectorAll(".level-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentLevel = btn.getAttribute("data-level");
      state.applyFilters();
      loadCurrentWord();
      loadChunkBuilderWord();
      loadTrapWord();
    });
  });

  elements.globalWordSearch.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    state.applyFilters();
    loadCurrentWord();
  });

  document.querySelectorAll(".mode-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      synth.playClick();
      switchMode(tab.getAttribute("data-mode"));
    });
  });

  elements.vaultHeaderPill.addEventListener("click", () => {
    synth.playClick();
    switchMode("vault");
  });

  elements.btnPlayNormal.addEventListener("click", () => {
    const current = getCurrentWordObj();
    if (current) narrator.speak(current.word, false);
  });

  elements.btnPlaySlow.addEventListener("click", () => {
    const current = getCurrentWordObj();
    if (current) narrator.speak(current.word, true);
  });

  elements.btnToggleChunk.addEventListener("click", () => {
    elements.chunkRevealBox.classList.toggle("hidden");
  });

  elements.btnToggleMnemonic.addEventListener("click", () => {
    elements.mnemonicRevealBox.classList.toggle("hidden");
  });

  elements.spellingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkCurrentSpelling();
  });

  elements.btnNextWord.addEventListener("click", nextWord);
  elements.btnSkipWord.addEventListener("click", skipWord);

  elements.btnDictationPlayCurrent.addEventListener("click", speakCurrentDictationSentence);
  elements.btnDictationPrevSentence.addEventListener("click", () => {
    synth.playClick();
    if (state.dictationSentenceIndex > 0) {
      state.dictationSentenceIndex--;
      updateDictationSentenceBadge();
      speakCurrentDictationSentence();
    }
  });
  elements.btnDictationNextSentence.addEventListener("click", () => {
    synth.playClick();
    const p = state.paragraphs[state.dictationParagraphIndex];
    if (p && p.sentences && state.dictationSentenceIndex < p.sentences.length - 1) {
      state.dictationSentenceIndex++;
      updateDictationSentenceBadge();
      speakCurrentDictationSentence();
    }
  });
  elements.btnDictationPlayFull.addEventListener("click", () => {
    const p = state.paragraphs[state.dictationParagraphIndex];
    if (p) narrator.speak(p.text, elements.dictationSlowToggle.checked);
  });
  elements.btnClearDictation.addEventListener("click", () => {
    elements.dictationTextarea.value = "";
    elements.dictationWordCount.textContent = "0 words typed";
  });
  elements.dictationTextarea.addEventListener("input", (e) => {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean);
    elements.dictationWordCount.textContent = `${words.length} words typed`;
  });
  elements.btnVerifyDictation.addEventListener("click", verifyParagraphDictation);

  elements.btnPlayFullParagraph.addEventListener("click", playEntireParagraph);
  elements.btnStopParagraphAudio.addEventListener("click", () => narrator.stop());
  elements.btnCloseInspector.addEventListener("click", () => {
    elements.wordQuickInspector.classList.add("hidden");
  });
  elements.btnInspectorSpeak.addEventListener("click", () => {
    if (selectedInspectorWord) narrator.speak(selectedInspectorWord.word);
  });
  elements.btnInspectorPractice.addEventListener("click", () => {
    if (selectedInspectorWord) {
      state.filteredWords = [selectedInspectorWord];
      state.currentWordIndex = 0;
      switchMode("hear-spell");
      loadCurrentWord();
    }
  });

  elements.btnChunkPlayAudio.addEventListener("click", () => {
    if (state.currentChunkWord) narrator.speak(state.currentChunkWord.word);
  });
  elements.btnResetChunks.addEventListener("click", () => {
    synth.playClick();
    loadChunkBuilderWord();
  });
  elements.btnVerifyChunks.addEventListener("click", verifyChunkBuilder);
  elements.btnNextChunkWord.addEventListener("click", () => {
    nextWord();
    loadChunkBuilderWord();
  });

  elements.btnNextTrapWord.addEventListener("click", () => {
    nextWord();
    loadTrapWord();
  });

  elements.btnAddCustomWord.addEventListener("click", addCustomWord);
  elements.btnClearVault.addEventListener("click", () => {
    if (confirm("Clear all words from your tricky vault?")) {
      state.vaultWords = [];
      state.save();
      updateHeaderStats();
      renderVaultView();
    }
  });
  elements.btnTrainVault.addEventListener("click", () => {
    if (state.vaultWords.length === 0) {
      alert("No words in your vault right now!");
      return;
    }
    state.currentPackId = "vault_pack";
    state.applyFilters();
    switchMode("hear-spell");
    loadCurrentWord();
  });

  window.addEventListener("keydown", (e) => {
    const activeEl = document.activeElement;
    const isTypingSpelling = activeEl === elements.spellingInput;
    const isTypingDictation = activeEl === elements.dictationTextarea;
    const isTypingCustom = activeEl === elements.customWordInput || 
                           activeEl === elements.customHintInput ||
                           activeEl === elements.globalWordSearch ||
                           activeEl === elements.rawSentenceInput;

    if (e.ctrlKey && e.key === "Enter" && isTypingDictation) {
      e.preventDefault();
      verifyParagraphDictation();
      return;
    }

    if ((e.key === "r" || e.key === "R") && !isTypingSpelling && !isTypingDictation && !isTypingCustom) {
      e.preventDefault();
      if (state.currentMode === "paragraph-dictation") {
        speakCurrentDictationSentence();
      } else {
        const current = getCurrentWordObj();
        if (current) narrator.speak(current.word);
      }
      return;
    }

    if (e.code === "Space" && !isTypingSpelling && !isTypingDictation && !isTypingCustom) {
      e.preventDefault();
      if (state.currentMode === "paragraph-dictation") {
        speakCurrentDictationSentence();
      } else if (state.currentMode === "paragraph-reader") {
        playEntireParagraph();
      } else {
        const current = getCurrentWordObj();
        if (current) narrator.speak(current.word);
      }
    }
  });
}

function switchMode(modeName) {
  state.currentMode = modeName;

  document.querySelectorAll(".mode-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-mode") === modeName);
  });

  document.querySelectorAll(".game-section").forEach(sec => sec.classList.remove("active-section"));

  if (modeName === "hear-spell") {
    document.getElementById("hearSpellSection").classList.add("active-section");
    loadCurrentWord();
  } else if (modeName === "paragraph-dictation") {
    document.getElementById("paragraphDictationSection").classList.add("active-section");
    loadDictationParagraph();
  } else if (modeName === "grammar-studio") {
    document.getElementById("grammarStudioSection").classList.add("active-section");
    loadGrammarQuestion(state.grammarQuestionIndex);
  } else if (modeName === "paragraph-reader") {
    document.getElementById("paragraphReaderSection").classList.add("active-section");
    loadParagraph(0);
  } else if (modeName === "syllable-builder") {
    document.getElementById("syllableBuilderSection").classList.add("active-section");
    loadChunkBuilderWord();
  } else if (modeName === "trap-detector") {
    document.getElementById("trapDetectorSection").classList.add("active-section");
    loadTrapWord();
  } else if (modeName === "vault") {
    document.getElementById("vaultSection").classList.add("active-section");
    renderVaultView();
  }
}

// Start app
window.addEventListener("DOMContentLoaded", initApp);
