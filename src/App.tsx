import { Router, Route } from 'preact-router';
import Greeting from './components/Greeting';
import GreetingPage from './components/GreetingPage';
import AdTest from './components/AdTest';

const App = () => {
  return (
    <Router>
      <Route path="/" component={Greeting} />
      <Route path="/:name" component={GreetingPage} />
      <Route path="/test-ads" component={AdTest} />
    </Router>
  );
};

export default App;
