import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './layout/Header';
import Footer from './layout/Footer';
import './layout/layout.sass';
import IdeaList from './features/idea/IdeaList';

function App() {
  return <div className="app">
    <Header />
    <Router>
      <Routes>
        <Route index element={<IdeaList />} />
      </Routes>
    </Router>
    <Footer />
  </div>
}

export default App;