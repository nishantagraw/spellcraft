# Append Grammar Studio & Sentence Fixer CSS to style.css
with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

grammar_css = """
/* ===================================================================
   GRAMMAR & PUNCTUATION STUDIO
   =================================================================== */

.grammar-header-zone {
  text-align: center;
  margin-bottom: 20px;
}

.grammar-header-zone h2 {
  font-size: 22px;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 4px;
}

.grammar-header-zone p {
  font-size: 13px;
  color: var(--text-muted);
}

.grammar-category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 18px;
  padding-bottom: 4px;
}

.grammar-tab-btn {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.grammar-tab-btn.active {
  background: var(--primary);
  color: var(--text-inverse);
  border-color: var(--primary);
}

.grammar-quiz-card {
  background: var(--surface-alt);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 24px;
  margin-bottom: 24px;
}

.grammar-progress-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.grammar-cat-tag {
  background: var(--primary-light);
  color: var(--primary);
  font-size: 12px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 999px;
}

.grammar-counter {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 700;
}

.grammar-question {
  font-size: 19px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 20px;
  line-height: 1.5;
}

.grammar-options-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}

.grammar-option-btn {
  background: var(--surface);
  border: 2px solid var(--border-strong);
  padding: 14px 20px;
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.grammar-option-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.grammar-option-btn.correct-choice {
  background: rgba(16, 185, 129, 0.12);
  border-color: var(--accent-mint);
  color: var(--accent-mint);
  font-weight: 800;
}

.grammar-option-btn.wrong-choice {
  background: rgba(244, 63, 94, 0.1);
  border-color: var(--accent-coral);
  color: var(--accent-coral);
}

.grammar-explanation-box {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: var(--radius-sm);
  margin-bottom: 16px;
  animation: fadeIn 0.25s ease;
}

.grammar-explanation-box.hidden {
  display: none;
}

.grammar-explain-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--accent-mint);
  margin-bottom: 4px;
}

.grammar-explanation-box p {
  font-size: 14px;
  color: var(--text-main);
  line-height: 1.5;
}

.grammar-actions-row {
  display: flex;
  justify-content: flex-end;
}

/* Sentence & Punctuation Cleaner Tool */
.sentence-fixer-card {
  background: var(--surface-alt);
  border: 1.5px dashed var(--border-strong);
  border-radius: var(--radius-md);
  padding: 22px;
}

.sentence-fixer-card h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 4px;
}

.sentence-fixer-card p {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.fixer-input-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.fixer-textarea {
  width: 100%;
  background: var(--surface);
  border: 2px solid var(--border-strong);
  border-radius: var(--radius-sm);
  padding: 14px;
  font-family: inherit;
  font-size: 15px;
  color: var(--text-main);
  outline: none;
  resize: vertical;
}

.fixer-textarea:focus {
  border-color: var(--primary);
}

.fixer-output-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 18px;
  animation: fadeIn 0.25s ease;
}

.fixer-output-box.hidden {
  display: none;
}

.fixer-badge {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--accent-mint);
  background: rgba(16, 185, 129, 0.12);
  padding: 3px 8px;
  border-radius: 5px;
}

.fixer-clean-text {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.6;
  color: var(--text-main);
  margin: 12px 0;
  padding: 12px;
  background: var(--surface-alt);
  border-radius: 8px;
  border-left: 4px solid var(--accent-mint);
}

.fixer-breakdown-notes {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
}

.fix-note-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
"""

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css + "\n" + grammar_css)

print("Appended Grammar Studio CSS to style.css successfully!")
