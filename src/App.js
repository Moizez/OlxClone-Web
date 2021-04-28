import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import { Template } from './components/MainStyles'
import Header from './components/Header'
import Footer from './components/Footer'

import Routes from './routes/Routes'

const App = (props) => {
	return (
		<BrowserRouter>
			<Template>
				<Header />

				<Routes />

				<Footer />
			</Template>
		</BrowserRouter>
	);
}

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
