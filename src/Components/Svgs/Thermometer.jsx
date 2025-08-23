import React from 'react';
import {SvgHoc} from "./SvgHoc";
import {motion} from "framer-motion";

const Thermometer = (props) => {
    return (<>
        <motion.svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
             fill={props.color}
             width={props.width}
             height={props.height}
             stroke={props.stroke}
             strokeWidth={props.strokeWidth}
             initial={props.initial}
             animate={props.animate}
        >
            <motion.path
                d="M9,4A1,1,0,0,1,8,5H4A1,1,0,0,1,4,3H8A1,1,0,0,1,9,4ZM9,8A1,1,0,0,0,8,7H6A1,1,0,0,0,6,9H8A1,1,0,0,0,9,8Zm12,8a6,6,0,1,1-9-5.191V5a3,3,0,0,1,6,0v5.809A5.992,5.992,0,0,1,21,16Zm-3,0a3,3,0,1,0-3,3A3,3,0,0,0,18,16Z"
                stroke="#ff8000 "
                strokeWidth="0.5"
                strokeLinejoin="round"
            />
        </motion.svg>

    </>);
};

export default SvgHoc(Thermometer);