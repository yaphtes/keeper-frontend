import React from 'react';

import Button from 'ui/Button';
import './style.scss';

export default function ChangeColor(props) {
    function handleChangeColor(event) {
        let target = event.target.closest('button');
        let color = getComputedStyle(target).backgroundColor;

        props.changeColor(color);
    }

    return (
        <div className="change-color" onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
            <div className="row">
                <Button className="change-color__variant white" onClick={handleChangeColor} />
                <Button className="change-color__variant yellow" onClick={handleChangeColor} />
                <Button className="change-color__variant red" onClick={handleChangeColor} />
                <Button className="change-color__variant pink" onClick={handleChangeColor} />
            </div>
            <div className="row">
                <Button className="change-color__variant grey" onClick={handleChangeColor} />
                <Button className="change-color__variant sky" onClick={handleChangeColor} />
                <Button className="change-color__variant green" onClick={handleChangeColor} />
                <Button className="change-color__variant blue" onClick={handleChangeColor} />
            </div>
        </div>
    );
}