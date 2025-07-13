export class DebateEngine {
  constructor() {
    this.topics = [
      'Healthcare reform and universal coverage',
      'Education funding and school choice',
      'Foreign policy and international relations',
      'Historical interpretations and their modern relevance',
      'Climate change and environmental protection',
      'Comic book characters: Marvel vs DC superiority',
      'Fantasy literature: Tolkien vs modern fantasy',
      'Renewable energy vs traditional energy sources'
    ]
    
    this.reset()
  }

  reset() {
    this.currentTopic = null
    this.currentRound = 1
    this.currentTurn = 1
    this.maxRounds = 3
    this.turnsPerRound = 6 // 3 computer, 3 user per round
    this.debateHistory = []
    this.roundRatings = []
    this.isDebateComplete = false
  }

  async initializeDebate() {
    this.currentTopic = this.getRandomTopic()
    await this.generateComputerArgument()
  }

  getRandomTopic() {
    return this.topics[Math.floor(Math.random() * this.topics.length)]
  }

  async generateComputerArgument() {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const arguments = this.getArgumentsForTopic(this.currentTopic)
    const randomArgument = arguments[Math.floor(Math.random() * arguments.length)]
    
    this.debateHistory.push({
      speaker: 'computer',
      round: this.currentRound,
      turn: this.currentTurn,
      content: randomArgument,
      timestamp: new Date()
    })
    
    this.currentTurn++
  }

  async processUserResponse(userResponse) {
    // Add user response
    this.debateHistory.push({
      speaker: 'user',
      round: this.currentRound,
      turn: this.currentTurn,
      content: userResponse,
      timestamp: new Date()
    })
    
    this.currentTurn++

    // Check if round is complete (6 turns per round)
    if (this.currentTurn > this.turnsPerRound) {
      await this.completeRound()
      return
    }

    // Generate computer response if debate continues
    if (!this.isDebateComplete) {
      await this.generateComputerArgument()
    }
  }

  async completeRound() {
    // Rate the round
    const rating = this.generateRoundRating()
    this.roundRatings.push({
      round: this.currentRound,
      userScore: rating.userScore,
      computerScore: rating.computerScore,
      feedback: rating.feedback
    })

    // Check if debate is complete
    if (this.currentRound >= this.maxRounds) {
      this.isDebateComplete = true
      return
    }

    // Start next round
    this.currentRound++
    this.currentTurn = 1
    await this.generateComputerArgument()
  }

  generateRoundRating() {
    // Simple random rating system for demo
    const userScore = Math.floor(Math.random() * 4) + 7 // 7-10
    const computerScore = Math.floor(Math.random() * 4) + 7 // 7-10
    
    const feedbacks = [
      "Strong logical arguments presented by both sides.",
      "Good use of evidence and reasoning.",
      "Compelling points made throughout the round.",
      "Well-structured arguments with clear positions.",
      "Effective counterarguments and rebuttals."
    ]
    
    return {
      userScore,
      computerScore,
      feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)]
    }
  }

  getArgumentsForTopic(topic) {
    const argumentBank = {
      'Healthcare reform and universal coverage': [
        "Universal healthcare ensures that medical treatment is a right, not a privilege based on economic status.",
        "A market-based healthcare system promotes innovation and efficiency through competition.",
        "Government-run healthcare systems often lead to longer wait times and reduced quality of care."
      ],
      'Education funding and school choice': [
        "School choice programs empower parents to find the best educational fit for their children.",
        "Public education funding should be increased to ensure equal opportunities for all students.",
        "Private school vouchers drain resources from public schools that serve the majority of students."
      ],
      'Foreign policy and international relations': [
        "Diplomatic engagement and multilateral cooperation are essential for global stability.",
        "Strong military deterrence prevents conflicts and protects national interests.",
        "Economic sanctions are more effective than military intervention in changing behavior."
      ],
      'Historical interpretations and their modern relevance': [
        "Understanding historical context is crucial for making informed decisions about current issues.",
        "Historical parallels can be misleading when applied to modern situations without considering changed circumstances.",
        "Learning from past mistakes helps prevent repeating them in contemporary policy-making."
      ],
      'Climate change and environmental protection': [
        "Immediate action on climate change is necessary to prevent catastrophic environmental damage.",
        "Economic growth and environmental protection can be balanced through technological innovation.",
        "Environmental regulations often harm economic development and job creation."
      ],
      'Comic book characters: Marvel vs DC superiority': [
        "Marvel characters are more relatable because they deal with real-world problems and personal struggles.",
        "DC characters represent timeless ideals and mythological archetypes that inspire hope.",
        "Marvel's interconnected universe creates more compelling storytelling opportunities."
      ],
      'Fantasy literature: Tolkien vs modern fantasy': [
        "Tolkien's work established the foundation that all modern fantasy builds upon.",
        "Modern fantasy offers more diverse perspectives and addresses contemporary social issues.",
        "Classic fantasy like Tolkien's provides timeless themes that transcend cultural boundaries."
      ],
      'Renewable energy vs traditional energy sources': [
        "Renewable energy is essential for reducing carbon emissions and combating climate change.",
        "Traditional energy sources provide reliable baseload power that renewables cannot match.",
        "The economic benefits of renewable energy include job creation and energy independence."
      ]
    }

    return argumentBank[topic] || [
      "This is an important topic that deserves careful consideration.",
      "There are valid arguments on multiple sides of this issue.",
      "Evidence-based reasoning should guide our discussion."
    ]
  }

  getDebateState() {
    return {
      topic: this.currentTopic,
      currentRound: this.currentRound,
      currentTurn: this.currentTurn,
      maxRounds: this.maxRounds,
      turnsPerRound: this.turnsPerRound,
      debateHistory: this.debateHistory,
      roundRatings: this.roundRatings,
      isComplete: this.isDebateComplete,
      isWaitingForUser: this.currentTurn % 2 === 0 && !this.isDebateComplete
    }
  }
}