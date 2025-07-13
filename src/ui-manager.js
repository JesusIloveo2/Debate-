export class UIManager {
  renderWelcomeScreen() {
    const container = document.createElement('div')
    container.className = 'welcome-screen'
    container.innerHTML = `
      <div class="welcome-content">
        <h1>Welcome to this debate website</h1>
        <p>Engage in structured debates on various topics and improve your argumentation skills!</p>
        <button id="start-debate-btn" class="primary-btn">Start Debate</button>
      </div>
    `
    return container
  }

  renderDebateScreen(debateState) {
    const container = document.createElement('div')
    container.className = 'debate-screen'
    
    const progressHtml = this.renderProgress(debateState)
    const topicHtml = this.renderTopic(debateState.topic)
    const historyHtml = this.renderDebateHistory(debateState.debateHistory)
    const ratingsHtml = this.renderRoundRatings(debateState.roundRatings, debateState.isWaitingForRoundDecision)
    const inputHtml = debateState.isWaitingForRoundDecision ?
      this.renderRoundDecision(debateState.currentRound, debateState.maxRounds) :
      debateState.isComplete ? 
      this.renderDebateComplete() : 
      this.renderUserInput(debateState.isWaitingForUser)

    container.innerHTML = `
      ${progressHtml}
      ${topicHtml}
      ${historyHtml}
      ${ratingsHtml}
      ${inputHtml}
    `
    
    return container
  }

  renderProgress(debateState) {
    const progress = ((debateState.currentRound - 1) * debateState.turnsPerRound + debateState.currentTurn - 1) / 
                   (debateState.maxRounds * debateState.turnsPerRound) * 100
    
    return `
      <div class="progress-section">
        <div class="progress-info">
          <span>Round ${debateState.currentRound} of ${debateState.maxRounds}</span>
          <span>Turn ${debateState.currentTurn} of ${debateState.turnsPerRound}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `
  }

  renderTopic(topic) {
    return `
      <div class="topic-section">
        <h2>Debate Topic</h2>
        <p class="topic">${topic}</p>
      </div>
    `
  }

  renderDebateHistory(history) {
    if (history.length === 0) return ''
    
    const historyItems = history.map(entry => `
      <div class="debate-entry ${entry.speaker}">
        <div class="entry-header">
          <span class="speaker">${entry.speaker === 'computer' ? 'AI Opponent' : 'You'}</span>
          <span class="round-turn">Round ${entry.round}, Turn ${entry.turn}</span>
        </div>
        <div class="entry-content">${entry.content}</div>
      </div>
    `).join('')

    return `
      <div class="debate-history">
        <h3>Debate History</h3>
        <div class="history-entries">
          ${historyItems}
        </div>
      </div>
    `
  }

  renderRoundRatings(ratings, showLatestOnly = false) {
    if (ratings.length === 0) return ''
    
    // If showing latest only (for round decision), show just the most recent rating
    const ratingsToShow = showLatestOnly ? [ratings[ratings.length - 1]] : ratings
    
    const ratingsHtml = ratingsToShow.map(rating => `
      <div class="round-rating">
        <h4>Round ${rating.round} Results</h4>
        <div class="scores">
          <div class="score">
            <span class="label">Your Score:</span>
            <span class="value">${rating.userScore}/10</span>
          </div>
          <div class="score">
            <span class="label">AI Score:</span>
            <span class="value">${rating.computerScore}/10</span>
          </div>
        </div>
        <div class="explanations">
          <div class="explanation">
            <h5>Your Performance:</h5>
            <p>${rating.userExplanation}</p>
          </div>
          <div class="explanation">
            <h5>AI Performance:</h5>
            <p>${rating.computerExplanation}</p>
          </div>
        </div>
        ${rating.feedback ? `<p class="general-feedback">${rating.feedback}</p>` : ''}
      </div>
    `).join('')

    return `
      <div class="ratings-section">
        <h3>${showLatestOnly ? 'Round Complete!' : 'Round Ratings'}</h3>
        ${ratingsHtml}
      </div>
    `
  }

  renderRoundDecision(currentRound, maxRounds) {
    const isLastRound = currentRound >= maxRounds
    
    return `
      <div class="round-decision-section">
        <h3>${isLastRound ? 'Debate Complete!' : 'Round Complete'}</h3>
        <p>${isLastRound ? 
          'You have completed all rounds of this debate. Review your performance above.' : 
          'You have completed this round. Would you like to continue to the next round or end the debate here?'
        }</p>
        <div class="decision-buttons">
          ${!isLastRound ? `
            <button id="continue-round-btn" class="primary-btn">Continue to Round ${currentRound + 1}</button>
            <button id="end-debate-btn" class="secondary-btn">End Debate</button>
          ` : `
            <button id="new-debate-btn" class="primary-btn">Start New Debate</button>
          `}
        </div>
      </div>
    `
  }

  renderUserInput(isWaitingForUser) {
    if (!isWaitingForUser) {
      return `
        <div class="waiting-section">
          <p class="waiting-message">AI is preparing their argument...</p>
          <div class="loading-spinner"></div>
        </div>
      `
    }

    return `
      <div class="input-section">
        <h3>Your Turn</h3>
        <textarea 
          id="user-response" 
          placeholder="Enter your argument here..."
          rows="4"
        ></textarea>
        <button id="submit-response-btn" class="primary-btn">Submit Response</button>
      </div>
    `
  }

  renderDebateComplete() {
    return `
      <div class="completion-section">
        <h3>Debate Complete!</h3>
        <p>Thank you for participating in this debate. Review the ratings above to see how you performed.</p>
        <button id="new-debate-btn" class="primary-btn">Start New Debate</button>
      </div>
    `
  }

  renderResultsScreen(debateState) {
    // For now, this is the same as the completion section in debate screen
    return this.renderDebateScreen(debateState)
  }
}