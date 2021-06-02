import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import './LazyLoader/css/LazyLoader.css';
import ErrorBoundary from './Common/JS/ErrorBoundary';
import BackgroundLoader from './BackgroundLoader';
const TechChefs = React.lazy(() => import('./Home/View/TechChefs'));



class App extends React.Component {

  componentDidCatch(err) {
    this.props.history.push({
      pathname: '/',
    });
  }
  render(){
  return (
<ErrorBoundary>
        <div>
          <React.Suspense fallback={<BackgroundLoader />}>
            <BrowserRouter>

                    <Route exact path="/" component={TechChefs} />

            </BrowserRouter>
          </React.Suspense>
        </div>
      </ErrorBoundary>


  )
  }
}

export default App;

