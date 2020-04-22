---
title: How to switch themes by using useContext
date: 2020-04-22
path: /how-to-switch-themes-with-usecontext
abstract: This post shows with a very simple application in React that switches betweeen dark and light theme by clicking a button.
tags: ["programming","react","hooks"]
author: Wilman Arambillete
---

Since last year, React introduced hooks and with that a nicer way of solving common programming situations that previously required other third-party technologies or even complex props propagation scenarios.

Nowadays, React applications have become easier to implement and its code is more organized. One of the caveats about non opinionated frameworks is that its code might become cluttered somehow; in particular when they need of other tools to solve simple issues.

*Context* is a feature that allows developers to share *global* data along multiple React components. 

In the following sample application that can be downloaded [here](https://github.com/warambil/theme-context), we will show step by step how to implement a *theme switcher*, by clicking an icon located at the header. 

This feature is a nice to have one, now that the *dark mode* has become so popular.

## Objective

The objective is to define a few components with children, define a Context (in a our case will be the theme) and finally determine how we are going modify this theme from within a child component.

## Solution

Firstly, we are going to define a few components:

- components/Header.js - It has a menu, logo, serach bar and an icon for switching themes

- components/Main.js - It is the main container displaying some random data

- components/Layout.js - It is a common component to include the Header and other sub components

- components/ThemeSwitcher.js - It is a component that has the button with the function for switching between themes.

- contexts/ThemeContext.js - It is a component where the *Context* is created and initialized.

Before diving into the solution, here are the extra packages I have used:

```json
{
  "name": "theme-context",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    ...
    "bootstrap": "^4.4.1",
    "node-sass": "^4.13.1",
    "react-bootstrap": "^1.0.0",
    "react-helmet": "^6.0.0",
    ...
  },
  ...
}

```

By the way, for this solution I have used *react-bootstrap*  and *sass*

Let's start by defining *ThemeContext* (*src/context/ThemeContext.js*).

```javascript
import React from 'react'

const  ThemeContext = React.createContext({
  theme: "light",
  setTheme: () => {}
})

export default ThemeContext
```

The *React.createContext()* function is used to create the context. Then we will use ThemeContext.Provider to enclose all the components we would like to share the context with.

When creating a Context we can optionally initizalize its data. In our case we need a *theme* variable to hold the actual value of the current theme and since we want to be able to update this variable, we also define a function *setTheme*.

Now, let's see our Header component 
(*/src/components/Header.js*)

```javascript
import React, { useContext } from 'react'
import { Form, Navbar, Nav, FormControl, Button } from 'react-bootstrap'
import ThemeContext from '../contexts/ThemeContext'
import ThemeSwitcher from './ThemeSwitcher'


const Header = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <Navbar bg={theme} variant={theme}>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <ThemeSwitcher />
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" className="search-button">Search</Button>
        </Form>
      </Navbar>
    </>
  )
}

export default Header
```

This code is self explanatory, a *Header* functional component  is defined where a set of basic Bootstrap components are used to render a top navbar with a logo, a menu and a search box.

In addition, we make use of the *Context* by calling *useContext()* and passing the *ThemContext* context we have previously defined, as parameter.

So the *useContext* hook has to be imported at the beginning, as well as the *ThemeContext* component.

We use then the hook to retrieve the theme Context and get the theme variable with the current theme information to be displayed in the header.

Additionally, we also render the *ThemeSwitcher* component that has the button definition along with the logic for switching between themes.

Notice however the use of another component *ThemeSwitcher*. This component has the button with the logic for switching themes. At this component it is only rendered.

So far so good, now we have to create a define another child component called Main for using the same *Context* and a *Layer* that will combine *Header* and *Main*

Here is the *Main* (src/components/Main.js) component:

```javascript
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import ThemeContext from '../contexts/ThemeContext'

export const Main = () => {
  const {theme} = useContext(ThemeContext)
 
  return (    
    <Container fluid className={theme} > 
      <h1>List of books</h1>
      <ul>
        <li>Sapiens</li>
        <li>Fear and loading of the campaign trail '72</li>
        <li>Range</li>
        <li>Chasing the scream</li>
        <li>Former People</li>
      </ul>
    </Container>
  )
}
```

The only relevant thing to mention here is that we use the *Context* hook (*useContext*) to retrieve the *theme* value and use it to determine the *CSS* class name for the Container. 

This value could be "dark" or "light" and this is the name of our CSS class (*/src/styles.scss*).

```scss
.dark {
  background-color: #404042;
  color: gray;
}
```

Now, the Layout is the component that combines Header and Main components. 

```javascript
import React, {useContext} from 'react'
import Header from './Header'
import {Helmet} from 'react-helmet'
import ThemeContext from '../contexts/ThemeContext'

const Layout = ({children}) => {
  const { theme } = useContext(ThemeContext)
  const bg = (theme == "dark") ? 'body {background-color: #404042; color: gray;}' : 'body {background-color: #fff; color: #000;}'
  return (
    <>
      <Helmet>
        <style>{bg}</style>
      </Helmet>
      <Header />
      {children}
    </>
  )
}

export default Layout

```

An important consideration here is that since we also want to change the text  and background color for the whole page, we need to style the *body* element. In order to do so, we use the *react-helmet* package that allows us to embed style into the *head*. 

Now, let's see where the magic happens, at the App.js component (*/src/App.js*)

```javascript
import React, {useState} from 'react';
import Layout from './components/Layout'
import {Main} from './components/Main'
import ThemeContext from './contexts/ThemeContext'

function App() {
  const [theme, setTheme] = useState("light");
  const value = { theme, setTheme};

  return (
    <div className="App">
      <ThemeContext.Provider value={value}>
        <Layout>
          <Main />
        </Layout>
      </ThemeContext.Provider>
    </div>
  );
}

export default App
```

Firstly, we use the useState hook to define an state object for modifiying the theme. So *theme* will hold the current theme value and *setTheme* allows us to change this theme value from the children.

In addition, let's see that we enclose the *Layout* component within our *ThemeContext.Provider*, passing the initial value as prop. 

By doing so, every child component can call *useContext* to retrieve the *ThemeContext* component.

Finally, there is one more step, we must add a button at the navbar that allows us to switch between both themes.

```javascript
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import ThemeContext from '../contexts/ThemeContext'
import Moon from '../images/moon.svg'
import Sun from '../images/sun.svg'

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <Button
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      className="button-theme"
    >
      <img src={theme == "dark" ? Sun : Moon} className="theme-icon" alt="theme" />
    </Button>  
  )
}

export default ThemeSwitcher


```

We use two image icons (sun and moon) to alternate between both themes. As you may recall, when we defined our objet for the ThemeContext, we also passed a *setTheme* function. So, from this ThemeSwitcher component, we call useContext to retrieve the theme and the function. 

Upon clicking the button, this *setTheme* function is called to modify the theme's value and the image icon is changed accordingly.

## Summary

In a nutshell, the *useContext* hook and Context management in React is not that difficult to use but it should not be overused. 

Context could be used to share data like themes, languages or current logged user along the site. 

 