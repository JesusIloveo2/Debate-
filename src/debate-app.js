import { DebateEngine } from './debate-engine.js'
import { UIManager } from './ui-manager.js'

export class DebateApp {
  constructor() {
    this.debateEngine = new DebateEngine()
    this.uiManager = new UIManager()
    this.currentState = 'welcome' // welcome, debate, results
    this.setupEventListeners()
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'start-debate-btn') {
        this.startDebate()
      } else if (e.target.id === 'submit-response-btn') {
        this.submitUserResponse()
      } else if (e.target.id === 'new-debate-btn') {
        this.resetToWelcome()
      }
    })

    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.id === 'user-response') {
        e.preventDefault()
        this.submitUserResponse()
      }
    })
  }

  async startDebate() {
    this.currentState = 'debate'
    await this.debateEngine.initializeDebate()
    this.updateUI()
  }

  async submitUserResponse() {
    const responseInput = document.getElementById('user-response')
    const userResponse = responseInput.value.trim()
    
    if (!userResponse) return

    responseInput.value = ''
    responseInput.disabled = true
    document.getElementById('submit-response-btn').disabled = true

    await this.debateEngine.processUserResponse(userResponse)
    this.updateUI()

    responseInput.disabled = false
    document.getElementById('submit-response-btn').disabled = false
  }

  resetToWelcome() {
    this.currentState = 'welcome'
    this.debateEngine.reset()
    this.updateUI()
  }

  updateUI() {
    const container = document.getElementById('app')
    container.innerHTML = ''
    container.appendChild(this.render())
  }

  render() {
    switch (this.currentState) {
      case 'welcome':
        return this.uiManager.renderWelcomeScreen()
      case 'debate':
        return this.uiManager.renderDebateScreen(this.debateEngine.getDebateState())
      case 'results':
        return this.uiManager.renderResultsScreen(this.debateEngine.getDebateState())
      default:
        return this.uiManager.renderWelcomeScreen()
    }
  }
}