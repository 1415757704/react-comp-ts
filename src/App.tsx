import React from 'react';
import logo from './logo.svg';
import Hello from './Hello';
import './styles/index.scss';
import './App.scss';
import Button from './components/Button';
import Menu, {MenuMode} from './components/Menu/menu';
import MenuItem from './components/Menu/menu-item';
import SubMenu from './components/Menu/sub-menu'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Menu defaultIndex="0" mode={MenuMode.HORIZONTAL}>
          <MenuItem>
            active
          </MenuItem>
          <MenuItem disabled>
            disabled
          </MenuItem>
          <MenuItem>
            xyz
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              drop1
            </MenuItem>
            <MenuItem>
              drop2
            </MenuItem>
          </SubMenu>
          <SubMenu title="opened">
            <MenuItem>
              opened1
            </MenuItem>
          </SubMenu>
        </Menu>
        <Button btnType="danger">Nice</Button>
        <Hello message="e1231" />
      </header>
    </div>
  );
}

export default App;
