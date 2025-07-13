import './style.css'
import { DebateApp } from './debate-app.js'

const app = new DebateApp()
document.querySelector('#app').appendChild(app.render())