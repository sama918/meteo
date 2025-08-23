import React from 'react';
import './App.module.scss';
import SearchBar from "./Components/SearchBar/SearchBar";
import Wallpaper from "./Components/Wallpaper/Wallpaper";
import Weather from "./Components/Weather/Weather";
import {Container} from "react-bootstrap";
import {store} from './app/store';
import {Provider} from "react-redux";
import {motion} from "framer-motion";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Container>
                <Wallpaper/>
                <motion.div
                    className={'container'}
                    initial={{
                        translateX: '100vw'
                }}
                    animate={{
                        translateX: 0
                }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',

                }}>
                    <SearchBar/>
                    <Weather/>
                </motion.div>

            </Container>
        </Provider>

    </div>
  );
}

export default App;
