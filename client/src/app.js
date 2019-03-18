import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompaniesMain from './components/Main';
import ItemCompany from './components/ItemCompany';

export default function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CompaniesMain} />
        <Route exact path="/company/:sygla" component={ItemCompany} />
      </Switch>
    </BrowserRouter>
  );
}
