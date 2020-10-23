import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import routerList from '../route/router';

import '../asset/css/index.css';


function App() {
  return (
    <div className="wrap">
      <Switch>
        {routerList.map((r,i)=>{
          return <Route
            key={i}
            path={r.path}
            exact={r.exact}
            render={(props)=>{
              return r.render(props);
            }}
          />
        })}
      </Switch>
    </div>
  );
}

export default App;
